using Microsoft.Extensions.Logging;
using Moq;
using WorkflowConfig.Api.Models;
using WorkflowConfig.Api.Services;
using Xunit;
using FluentAssertions;

namespace WorkflowConfig.Api.Tests;

public class PullRequestServiceTests
{
    private readonly Mock<ILogger<PullRequestService>> _loggerMock;
    private readonly string _testStoragePath;
    private readonly PullRequestService _service;

    public PullRequestServiceTests()
    {
        _loggerMock = new Mock<ILogger<PullRequestService>>();
        _testStoragePath = Path.Combine(Path.GetTempPath(), $"pr-tests-{Guid.NewGuid()}");
        Directory.CreateDirectory(_testStoragePath);
        _service = new PullRequestService(_testStoragePath, _loggerMock.Object);
    }

    [Fact]
    public void CreatePullRequest_ShouldStoreSourceAndTargetCommitShas()
    {
        // Arrange
        var request = new CreatePullRequestRequest
        {
            Title = "Test PR",
            Description = "Test Description",
            SourceBranch = "feature-branch",
            TargetBranch = "main"
        };
        var sourceCommitSha = "abc123def456";
        var targetCommitSha = "789xyz321uvw";

        // Act
        var result = _service.CreatePullRequest("testUser", request, sourceCommitSha, targetCommitSha);

        // Assert
        result.Should().NotBeNull();
        result.SourceCommitSha.Should().Be(sourceCommitSha);
        result.TargetCommitSha.Should().Be(targetCommitSha);
        result.Status.Should().Be("open");
        result.Author.Should().Be("testUser");
    }

    [Fact]
    public void CreatePullRequest_ShouldIncrementPullRequestNumber()
    {
        // Arrange
        var request1 = new CreatePullRequestRequest
        {
            Title = "First PR",
            SourceBranch = "branch1",
            TargetBranch = "main"
        };
        var request2 = new CreatePullRequestRequest
        {
            Title = "Second PR",
            SourceBranch = "branch2",
            TargetBranch = "main"
        };

        // Act
        var pr1 = _service.CreatePullRequest("user1", request1, "sha1", "sha2");
        var pr2 = _service.CreatePullRequest("user2", request2, "sha3", "sha4");

        // Assert
        pr1.Number.Should().Be(1);
        pr2.Number.Should().Be(2);
    }

    [Fact]
    public void MergePullRequest_ShouldUpdateStatusAndMergedDate()
    {
        // Arrange
        var request = new CreatePullRequestRequest
        {
            Title = "Test PR",
            SourceBranch = "feature",
            TargetBranch = "main"
        };
        var pr = _service.CreatePullRequest("user", request, "sha1", "sha2");
        var beforeMerge = DateTime.UtcNow;

        // Act
        var merged = _service.MergePullRequest("user", pr.Number);

        // Assert
        merged.Should().NotBeNull();
        merged!.Status.Should().Be("merged");
        merged.MergedDate.Should().NotBeNull();
        merged.MergedDate!.Value.Should().BeOnOrAfter(beforeMerge);
    }

    [Fact]
    public void MergePullRequest_ShouldPreserveCommitShas()
    {
        // Arrange
        var request = new CreatePullRequestRequest
        {
            Title = "Test PR",
            SourceBranch = "feature",
            TargetBranch = "main"
        };
        var sourceCommitSha = "original-source-sha";
        var targetCommitSha = "original-target-sha";
        var pr = _service.CreatePullRequest("user", request, sourceCommitSha, targetCommitSha);

        // Act
        var merged = _service.MergePullRequest("user", pr.Number);

        // Assert - Commit SHAs should remain unchanged after merge
        merged.Should().NotBeNull();
        merged!.SourceCommitSha.Should().Be(sourceCommitSha);
        merged.TargetCommitSha.Should().Be(targetCommitSha);
    }

    [Fact]
    public void GetAllPullRequests_ShouldReturnInDescendingOrderByNumber()
    {
        // Arrange
        var request = new CreatePullRequestRequest { Title = "PR", SourceBranch = "b", TargetBranch = "m" };
        _service.CreatePullRequest("user", request, "sha1", "sha2");
        _service.CreatePullRequest("user", request, "sha3", "sha4");
        _service.CreatePullRequest("user", request, "sha5", "sha6");

        // Act
        var prs = _service.GetAllPullRequests("user");

        // Assert
        prs.Should().HaveCount(3);
        prs[0].Number.Should().Be(3);
        prs[1].Number.Should().Be(2);
        prs[2].Number.Should().Be(1);
    }

    [Fact]
    public void GetAllPullRequests_WithStatusFilter_ShouldReturnOnlyMatchingStatus()
    {
        // Arrange
        var request = new CreatePullRequestRequest { Title = "PR", SourceBranch = "b", TargetBranch = "m" };
        var pr1 = _service.CreatePullRequest("user", request, "sha1", "sha2");
        var pr2 = _service.CreatePullRequest("user", request, "sha3", "sha4");
        var pr3 = _service.CreatePullRequest("user", request, "sha5", "sha6");
        
        _service.MergePullRequest("user", pr1.Number);
        _service.ClosePullRequest("user", pr2.Number);

        // Act
        var openPrs = _service.GetAllPullRequests("user", "open");
        var mergedPrs = _service.GetAllPullRequests("user", "merged");
        var closedPrs = _service.GetAllPullRequests("user", "closed");

        // Assert
        openPrs.Should().HaveCount(1);
        openPrs[0].Number.Should().Be(pr3.Number);
        
        mergedPrs.Should().HaveCount(1);
        mergedPrs[0].Number.Should().Be(pr1.Number);
        
        closedPrs.Should().HaveCount(1);
        closedPrs[0].Number.Should().Be(pr2.Number);
    }

    [Fact]
    public void GetAllPullRequests_ShouldBeVisibleToAllUsers()
    {
        // Arrange - Create PRs with different users
        var request = new CreatePullRequestRequest { Title = "PR", SourceBranch = "b", TargetBranch = "m" };
        _service.CreatePullRequest("userA", request, "sha1", "sha2");
        _service.CreatePullRequest("userB", request, "sha3", "sha4");

        // Act - Retrieve with different users
        var userAPrs = _service.GetAllPullRequests("userA");
        var userBPrs = _service.GetAllPullRequests("userB");
        var userCPrs = _service.GetAllPullRequests("userC");

        // Assert - All users see the same PRs (global storage)
        userAPrs.Should().HaveCount(2);
        userBPrs.Should().HaveCount(2);
        userCPrs.Should().HaveCount(2);
    }
}

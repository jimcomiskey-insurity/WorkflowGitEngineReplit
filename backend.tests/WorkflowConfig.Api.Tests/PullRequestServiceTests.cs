using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;
using WorkflowConfig.Api.Models;
using WorkflowConfig.Api.Services;
using Xunit;
using FluentAssertions;

namespace WorkflowConfig.Api.Tests;

public class PullRequestServiceTests : IDisposable
{
    private readonly Mock<IConfiguration> _configMock;
    private readonly Mock<IWebHostEnvironment> _envMock;
    private readonly Mock<ILogger<PullRequestService>> _loggerMock;
    private readonly string _testStoragePath;
    private readonly PullRequestService _service;

    public PullRequestServiceTests()
    {
        _testStoragePath = Path.Combine(Path.GetTempPath(), $"pr-tests-{Guid.NewGuid()}");
        Directory.CreateDirectory(_testStoragePath);
        
        _configMock = new Mock<IConfiguration>();
        _envMock = new Mock<IWebHostEnvironment>();
        _loggerMock = new Mock<ILogger<PullRequestService>>();
        
        _configMock.Setup(c => c["GitSettings:PullRequestsPath"]).Returns(_testStoragePath);
        _envMock.Setup(e => e.ContentRootPath).Returns(_testStoragePath);
        
        _service = new PullRequestService(_configMock.Object, _envMock.Object, _loggerMock.Object);
    }

    public void Dispose()
    {
        if (Directory.Exists(_testStoragePath))
        {
            Directory.Delete(_testStoragePath, true);
        }
    }

    [Fact]
    public void CreatePullRequest_ShouldStoreSourceAndTargetCommitShas()
    {
        var request = new CreatePullRequestRequest
        {
            Title = "Test PR",
            Description = "Test Description",
            SourceBranch = "feature-branch",
            TargetBranch = "main"
        };
        var sourceCommitSha = "abc123def456";
        var targetCommitSha = "789xyz321uvw";

        var result = _service.CreatePullRequest("testUser", request, sourceCommitSha, targetCommitSha);

        result.Should().NotBeNull();
        result.SourceCommitSha.Should().Be(sourceCommitSha);
        result.TargetCommitSha.Should().Be(targetCommitSha);
        result.Status.Should().Be("open");
        result.Author.Should().Be("testUser");
    }

    [Fact]
    public void CreatePullRequest_ShouldIncrementPullRequestNumber()
    {
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

        var pr1 = _service.CreatePullRequest("user1", request1, "abc123def456789", "xyz789uvw012345");
        var pr2 = _service.CreatePullRequest("user2", request2, "def456ghi789012", "uvw012abc345678");

        pr1.Number.Should().Be(1);
        pr2.Number.Should().Be(2);
    }

    [Fact]
    public void MergePullRequest_ShouldUpdateStatusAndMergedDate()
    {
        var request = new CreatePullRequestRequest
        {
            Title = "Test PR",
            SourceBranch = "feature",
            TargetBranch = "main"
        };
        var pr = _service.CreatePullRequest("user", request, "abc123def456789", "xyz789uvw012345");
        var beforeMerge = DateTime.UtcNow;

        var merged = _service.MergePullRequest("user", pr.Number);

        merged.Should().NotBeNull();
        merged!.Status.Should().Be("merged");
        merged.MergedDate.Should().NotBeNull();
        merged.MergedDate!.Value.Should().BeOnOrAfter(beforeMerge);
    }

    [Fact]
    public void MergePullRequest_ShouldPreserveCommitShas()
    {
        var request = new CreatePullRequestRequest
        {
            Title = "Test PR",
            SourceBranch = "feature",
            TargetBranch = "main"
        };
        var sourceCommitSha = "original-source-sha";
        var targetCommitSha = "original-target-sha";
        var pr = _service.CreatePullRequest("user", request, sourceCommitSha, targetCommitSha);

        var merged = _service.MergePullRequest("user", pr.Number);

        merged.Should().NotBeNull();
        merged!.SourceCommitSha.Should().Be(sourceCommitSha);
        merged.TargetCommitSha.Should().Be(targetCommitSha);
    }

    [Fact]
    public void GetAllPullRequests_ShouldReturnInDescendingOrderByNumber()
    {
        var request = new CreatePullRequestRequest { Title = "PR", SourceBranch = "b", TargetBranch = "m" };
        _service.CreatePullRequest("user", request, "abc123def456789", "xyz789uvw012345");
        _service.CreatePullRequest("user", request, "def456ghi789012", "uvw012abc345678");
        _service.CreatePullRequest("user", request, "ghi789jkl012345", "abc345def678901");

        var prs = _service.GetAllPullRequests("user");

        prs.Should().HaveCount(3);
        prs[0].Number.Should().Be(3);
        prs[1].Number.Should().Be(2);
        prs[2].Number.Should().Be(1);
    }

    [Fact]
    public void GetAllPullRequests_WithStatusFilter_ShouldReturnOnlyMatchingStatus()
    {
        var request = new CreatePullRequestRequest { Title = "PR", SourceBranch = "b", TargetBranch = "m" };
        var pr1 = _service.CreatePullRequest("user", request, "abc123def456789", "xyz789uvw012345");
        var pr2 = _service.CreatePullRequest("user", request, "def456ghi789012", "uvw012abc345678");
        var pr3 = _service.CreatePullRequest("user", request, "ghi789jkl012345", "abc345def678901");
        
        _service.MergePullRequest("user", pr1.Number);
        _service.ClosePullRequest("user", pr2.Number);

        var openPrs = _service.GetAllPullRequests("user", "open");
        var mergedPrs = _service.GetAllPullRequests("user", "merged");
        var closedPrs = _service.GetAllPullRequests("user", "closed");

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
        var request = new CreatePullRequestRequest { Title = "PR", SourceBranch = "b", TargetBranch = "m" };
        _service.CreatePullRequest("userA", request, "abc123def456789", "xyz789uvw012345");
        _service.CreatePullRequest("userB", request, "def456ghi789012", "uvw012abc345678");

        var userAPrs = _service.GetAllPullRequests("userA");
        var userBPrs = _service.GetAllPullRequests("userB");
        var userCPrs = _service.GetAllPullRequests("userC");

        userAPrs.Should().HaveCount(2);
        userBPrs.Should().HaveCount(2);
        userCPrs.Should().HaveCount(2);
    }
}

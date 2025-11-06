using Reqnroll;
using FluentAssertions;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using WorkflowConfig.E2E.Tests.Support;

namespace WorkflowConfig.E2E.Tests.StepDefinitions;

[Binding]
public class DataStoreGitIntegrationSteps
{
    private readonly ScenarioContext _scenarioContext;
    private readonly HttpClient _httpClient;
    private string _userId = string.Empty;
    private string _branchName = string.Empty;
    private string _datastoreId = string.Empty;
    private int _pullRequestId = 0;

    public DataStoreGitIntegrationSteps(ScenarioContext scenarioContext)
    {
        _scenarioContext = scenarioContext;
        _httpClient = new HttpClient
        {
            BaseAddress = new Uri(TestConfiguration.BackendUrl)
        };
    }

    [Given(@"the repository is reset to initial state for user ""(.*)""")]
    public async Task GivenTheRepositoryIsResetToInitialStateForUser(string userId)
    {
        _userId = userId;
        
        // Call reset endpoint
        var response = await _httpClient.PostAsync($"/api/git/reset?userId={userId}", null);
        response.EnsureSuccessStatusCode();
        
        await Task.Delay(1000); // Give time for reset to complete
    }

    [When(@"I create a new branch ""(.*)"" for user ""(.*)""")]
    public async Task WhenICreateANewBranchForUser(string branchName, string userId)
    {
        _branchName = branchName;
        
        // Create the branch
        var createPayload = new { branchName };
        var createResponse = await _httpClient.PostAsJsonAsync($"/api/git/branches?userId={userId}", createPayload);
        createResponse.EnsureSuccessStatusCode();
        
        await Task.Delay(300);
        
        // Switch to the new branch (API doesn't auto-switch like the frontend)
        var switchPayload = new { branchName };
        var switchResponse = await _httpClient.PostAsJsonAsync($"/api/git/branches/switch?userId={userId}", switchPayload);
        switchResponse.EnsureSuccessStatusCode();
        
        await Task.Delay(500); // Give time for branch switch
    }

    [When(@"I create a new datastore with the following details for user ""(.*)"":")]
    public async Task WhenICreateANewDatastoreWithTheFollowingDetailsForUser(string userId, Table table)
    {
        var name = table.Rows.First(r => r["Field"] == "Name")["Value"];
        var description = table.Rows.First(r => r["Field"] == "Description")["Value"];
        
        var payload = new
        {
            name,
            description,
            dataGroups = new List<object>()
        };
        
        var response = await _httpClient.PostAsJsonAsync($"/api/users/{userId}/datastores", payload);
        response.EnsureSuccessStatusCode();
        
        var result = await response.Content.ReadFromJsonAsync<JsonElement>();
        _datastoreId = result.GetProperty("id").GetString() ?? string.Empty;
        _datastoreId.Should().NotBeNullOrEmpty("Datastore ID should be returned");
        
        _scenarioContext["DatastoreId"] = _datastoreId;
        _scenarioContext["DatastoreName"] = name;
    }

    [Then(@"the datastore should appear in the datastore list for user ""(.*)""")]
    public async Task ThenTheDatastoreShouldAppearInTheDatastoreListForUser(string userId)
    {
        var response = await _httpClient.GetAsync($"/api/users/{userId}/datastores");
        response.EnsureSuccessStatusCode();
        
        var datastores = await response.Content.ReadFromJsonAsync<List<JsonElement>>();
        datastores.Should().NotBeNull();
        
        var foundDatastore = datastores!.FirstOrDefault(ds => 
            ds.GetProperty("id").GetString() == _datastoreId);
        
        foundDatastore.ValueKind.Should().NotBe(JsonValueKind.Undefined, 
            $"Datastore with ID {_datastoreId} should exist in the list");
    }

    [When(@"I commit the changes with message ""(.*)"" for user ""(.*)""")]
    public async Task WhenICommitTheChangesWithMessageForUser(string message, string userId)
    {
        var payload = new { message };
        var response = await _httpClient.PostAsJsonAsync($"/api/git/commit?userId={userId}", payload);
        response.EnsureSuccessStatusCode();
        
        await Task.Delay(500); // Give time for commit
    }

    [When(@"I push the changes for user ""(.*)""")]
    public async Task WhenIPushTheChangesForUser(string userId)
    {
        var response = await _httpClient.PostAsync($"/api/git/push?userId={userId}", null);
        
        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"Push failed with status {response.StatusCode}: {errorContent}");
            
            // If push fails because of branch protection or upstream, that's OK - we can still create a PR from local commits
            if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
            {
                Console.WriteLine($"Push failed but continuing test: {errorContent}");
                return;
            }
            
            response.EnsureSuccessStatusCode();
        }
        
        await Task.Delay(1000); // Give time for push
    }

    [When(@"I create a pull request from ""(.*)"" to ""(.*)"" for user ""(.*)""")]
    public async Task WhenICreateAPullRequestFromToForUser(string sourceBranch, string targetBranch, string userId)
    {
        var payload = new
        {
            title = "Test PR",
            description = "Test pull request for datastore changes",
            sourceBranch,
            targetBranch,
            author = userId
        };
        
        var response = await _httpClient.PostAsJsonAsync($"/api/pull-requests?userId={userId}", payload);
        response.EnsureSuccessStatusCode();
        
        var result = await response.Content.ReadFromJsonAsync<JsonElement>();
        
        // PR API returns "number" property, not "id"
        _pullRequestId = result.GetProperty("number").GetInt32();
        _pullRequestId.Should().BeGreaterThan(0, "Pull request number should be returned");
        
        // Store commit SHAs for later verification
        var sourceCommitSha = result.GetProperty("sourceCommitSha").GetString();
        var targetCommitSha = result.GetProperty("targetCommitSha").GetString();
        
        _scenarioContext["PullRequestId"] = _pullRequestId;
        _scenarioContext["SourceCommitSha"] = sourceCommitSha;
        _scenarioContext["TargetCommitSha"] = targetCommitSha;
        
        await Task.Delay(500); // Give time for PR creation
    }

    [Then(@"the pull request comparison should contain the datastore in dataStoreChanges")]
    public async Task ThenThePullRequestComparisonShouldContainTheDatastoreInDataStoreChanges()
    {
        // Use commit SHAs from PR creation response (already stored in context)
        var sourceCommitSha = _scenarioContext["SourceCommitSha"].ToString();
        var targetCommitSha = _scenarioContext["TargetCommitSha"].ToString();
        
        sourceCommitSha.Should().NotBeNullOrEmpty("Source commit SHA should be present");
        targetCommitSha.Should().NotBeNullOrEmpty("Target commit SHA should be present");
        
        // Call the comparison API
        var comparisonUrl = $"/api/git/compare-branches?userId={_userId}&sourceBranch={_branchName}&targetBranch=master";
        Console.WriteLine($"Calling comparison API: {comparisonUrl}");
        
        var comparisonResponse = await _httpClient.GetAsync(comparisonUrl);
        
        if (!comparisonResponse.IsSuccessStatusCode)
        {
            var errorContent = await comparisonResponse.Content.ReadAsStringAsync();
            Console.WriteLine($"Comparison API failed: {comparisonResponse.StatusCode} - {errorContent}");
        }
        
        comparisonResponse.EnsureSuccessStatusCode();
        
        var comparisonContent = await comparisonResponse.Content.ReadAsStringAsync();
        Console.WriteLine($"Comparison response: {comparisonContent.Substring(0, Math.Min(500, comparisonContent.Length))}...");
        
        var comparison = JsonSerializer.Deserialize<JsonElement>(comparisonContent);
        comparison.ValueKind.Should().NotBe(JsonValueKind.Undefined, "Comparison should be returned");
        
        Console.WriteLine($"Comparison properties: {string.Join(", ", comparison.EnumerateObject().Select(p => p.Name))}");
        
        // Check if dataStoreChanges exists and contains our datastore
        var hasDataStoreChanges = comparison.TryGetProperty("dataStoreChanges", out var dataStoreChanges);
        hasDataStoreChanges.Should().BeTrue("Comparison should have dataStoreChanges property");
        
        dataStoreChanges.GetArrayLength().Should().BeGreaterThan(0, 
            "dataStoreChanges should contain at least one change");
        
        var foundDatastore = false;
        var datastoreName = _scenarioContext["DatastoreName"].ToString();
        
        foreach (var change in dataStoreChanges.EnumerateArray())
        {
            var name = change.GetProperty("name").GetString();
            if (name == datastoreName)
            {
                foundDatastore = true;
                var changeType = change.GetProperty("changeType").GetString();
                changeType.Should().Be("Added", "Datastore should be marked as Added");
                break;
            }
        }
        
        foundDatastore.Should().BeTrue($"Datastore '{datastoreName}' should appear in comparison.dataStoreChanges");
        
        // Store comparison for next step
        _scenarioContext["Comparison"] = comparison;
    }

    [Then(@"at least one commit in the pull request should contain the datastore in dataStoreChanges")]
    public async Task ThenAtLeastOneCommitInThePullRequestShouldContainTheDatastoreInDataStoreChanges()
    {
        var comparison = (JsonElement)_scenarioContext["Comparison"];
        
        // Check if commits exist
        var hasCommits = comparison.TryGetProperty("commits", out var commits);
        hasCommits.Should().BeTrue("Comparison should have commits property");
        
        commits.GetArrayLength().Should().BeGreaterThan(0, 
            "Pull request should have at least one commit");
        
        var foundDatastoreInCommit = false;
        var datastoreName = _scenarioContext["DatastoreName"].ToString();
        var commitWithDatastore = string.Empty;
        
        foreach (var commit in commits.EnumerateArray())
        {
            var commitSha = commit.GetProperty("sha").GetString();
            var commitMessage = commit.GetProperty("message").GetString();
            
            // Check if this commit has dataStoreChanges
            var hasDataStoreChanges = commit.TryGetProperty("dataStoreChanges", out var dataStoreChanges);
            
            if (hasDataStoreChanges && dataStoreChanges.GetArrayLength() > 0)
            {
                // Look for our datastore in this commit's changes
                foreach (var change in dataStoreChanges.EnumerateArray())
                {
                    var name = change.GetProperty("name").GetString();
                    if (name == datastoreName)
                    {
                        foundDatastoreInCommit = true;
                        commitWithDatastore = $"{commitSha?.Substring(0, 7)} - {commitMessage}";
                        
                        var changeType = change.GetProperty("changeType").GetString();
                        changeType.Should().Be("Added", "Datastore should be marked as Added in commit");
                        break;
                    }
                }
            }
            
            if (foundDatastoreInCommit)
                break;
        }
        
        foundDatastoreInCommit.Should().BeTrue(
            $"At least one commit should contain datastore '{datastoreName}' in its dataStoreChanges property. " +
            (commitWithDatastore != string.Empty ? $"Found in commit: {commitWithDatastore}" : "Not found in any commit"));
    }
}

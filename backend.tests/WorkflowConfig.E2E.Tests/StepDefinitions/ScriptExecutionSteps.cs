using Reqnroll;
using FluentAssertions;
using WorkflowConfig.E2E.Tests.Support;
using WorkflowConfig.E2E.Tests.Generated;

namespace WorkflowConfig.E2E.Tests.StepDefinitions;

[Binding]
public class ScriptExecutionSteps
{
    private const string ProgramId = "default";
    private readonly ScenarioContext _scenarioContext;
    private readonly HttpClient _httpClient;
    private readonly IApiClient _apiClient;
    private string _userId = string.Empty;
    private List<CompletionInput> _scriptInputs = new List<CompletionInput>();
    private CompletionResponse? _completionResponse;
    private string _currentScript = string.Empty;
    private int _cursorPosition = 0;

    public ScriptExecutionSteps(ScenarioContext scenarioContext)
    {
        _scenarioContext = scenarioContext;
        _httpClient = new HttpClient
        {
            BaseAddress = new Uri(TestConfiguration.BackendUrl)
        };
        _apiClient = new ApiClient(TestConfiguration.BackendUrl, _httpClient);
    }

    [Given(@"I am testing script completions for user ""(.*)""")]
    public void GivenIAmTestingScriptCompletionsForUser(string userId)
    {
        _userId = userId;
        _scriptInputs.Clear();
        _completionResponse = null;
        _currentScript = string.Empty;
        _cursorPosition = 0;
    }

    [When(@"I request completions for a script with the following inputs:")]
    public void WhenIRequestCompletionsForAScriptWithTheFollowingInputs(Table table)
    {
        _scriptInputs = table.Rows.Select(row => new CompletionInput
        {
            Alias = row["Alias"],
            DataType = row["DataType"]
        }).ToList();
    }

    [When(@"I type ""(.*)"" at position (\d+) in an empty script")]
    public async Task WhenITypeAtPositionInAnEmptyScript(string text, int position)
    {
        _currentScript = text;
        _cursorPosition = position;

        var request = new CompletionRequest
        {
            Script = _currentScript,
            Position = _cursorPosition,
            Inputs = _scriptInputs
        };

        _completionResponse = await _apiClient.GetCompletionsAsync(_userId, ProgramId, request);
        _completionResponse.Should().NotBeNull("Completion response should be returned");
    }

    [When(@"I type ""(.*)"" at position (\d+) in a script")]
    public async Task WhenITypeAtPositionInAScript(string text, int position)
    {
        _currentScript = text;
        _cursorPosition = position;

        var request = new CompletionRequest
        {
            Script = _currentScript,
            Position = _cursorPosition,
            Inputs = _scriptInputs
        };

        _completionResponse = await _apiClient.GetCompletionsAsync(_userId, ProgramId, request);
        _completionResponse.Should().NotBeNull("Completion response should be returned");
    }

    [Then(@"the completion suggestions should include ""(.*)""")]
    public void ThenTheCompletionSuggestionsShouldInclude(string expectedLabel)
    {
        _completionResponse.Should().NotBeNull("Completion response should exist");
        _completionResponse!.Items.Should().NotBeNull("Completion items should exist");

        var matchingSuggestions = _completionResponse.Items
            .Where(item => item.Label.Equals(expectedLabel, StringComparison.Ordinal))
            .ToList();

        matchingSuggestions.Should().NotBeEmpty(
            $"Expected to find completion suggestion '{expectedLabel}' but found only: {string.Join(", ", _completionResponse.Items.Select(i => i.Label))}"
        );
    }

    [Then(@"the completion suggestions should not be empty")]
    public void ThenTheCompletionSuggestionsShouldNotBeEmpty()
    {
        _completionResponse.Should().NotBeNull("Completion response should exist");
        _completionResponse!.Items.Should().NotBeNull("Completion items should exist");
        _completionResponse.Items.Should().NotBeEmpty("At least one completion suggestion should be returned");
    }
}

using System.Net.Http;
using System.Text;
using System.Text.Json;
using FluentAssertions;
using Xunit;

namespace WorkflowConfig.Api.Tests;

public class ScriptCompletionTests : IDisposable
{
    private readonly HttpClient _httpClient;
    private const string BaseUrl = "http://localhost:8000";
    private const string TestUser = "testUser";

    public ScriptCompletionTests()
    {
        _httpClient = new HttpClient { BaseAddress = new Uri(BaseUrl) };
    }

    [Fact]
    public async Task GetCompletions_WithIntegerParameters_ShouldIncludeParametersInSuggestions()
    {
        // Arrange
        var request = new
        {
            Script = "in",
            Position = 2,
            Inputs = new[]
            {
                new { Alias = "inta", DataType = "Integer" },
                new { Alias = "intb", DataType = "Integer" }
            }
        };

        var content = new StringContent(
            JsonSerializer.Serialize(request),
            Encoding.UTF8,
            "application/json"
        );

        // Act
        var response = await _httpClient.PostAsync(
            $"/api/users/{TestUser}/script/completions",
            content
        );

        // Assert
        response.EnsureSuccessStatusCode();
        
        var jsonResponse = await response.Content.ReadAsStringAsync();
        var completionResponse = JsonSerializer.Deserialize<CompletionResponse>(jsonResponse, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        // This test demonstrates the bug: parameters are NOT in the suggestions
        var labels = completionResponse?.Items?.Select(i => i.Label).ToList() ?? new List<string>();
        
        // Print what we actually got for debugging
        Console.WriteLine($"Received {labels.Count} suggestions:");
        foreach (var label in labels.Take(20))
        {
            Console.WriteLine($"  - {label}");
        }

        // EXPECTED BEHAVIOR: These should pass but currently fail
        labels.Should().Contain("inta", "because 'inta' is a parameter and should be suggested");
        labels.Should().Contain("intb", "because 'intb' is a parameter and should be suggested");
    }

    [Fact]
    public async Task GetCompletions_WithMixedParameters_ShouldIncludeAllParametersInSuggestions()
    {
        // Arrange
        var request = new
        {
            Script = "p",
            Position = 1,
            Inputs = new[]
            {
                new { Alias = "premium", DataType = "Decimal" },
                new { Alias = "policyNum", DataType = "String" }
            }
        };

        var content = new StringContent(
            JsonSerializer.Serialize(request),
            Encoding.UTF8,
            "application/json"
        );

        // Act
        var response = await _httpClient.PostAsync(
            $"/api/users/{TestUser}/script/completions",
            content
        );

        // Assert
        response.EnsureSuccessStatusCode();
        
        var jsonResponse = await response.Content.ReadAsStringAsync();
        var completionResponse = JsonSerializer.Deserialize<CompletionResponse>(jsonResponse, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        var labels = completionResponse?.Items?.Select(i => i.Label).ToList() ?? new List<string>();

        // EXPECTED BEHAVIOR: Parameters should be suggested
        labels.Should().Contain("premium", "because 'premium' is a parameter");
        labels.Should().Contain("policyNum", "because 'policyNum' is a parameter");
    }

    public void Dispose()
    {
        _httpClient?.Dispose();
    }

    // Response DTOs
    private class CompletionResponse
    {
        public List<CompletionSuggestion> Items { get; set; } = new();
    }

    private class CompletionSuggestion
    {
        public string Label { get; set; } = string.Empty;
        public string Kind { get; set; } = string.Empty;
        public string InsertText { get; set; } = string.Empty;
        public string? Detail { get; set; }
        public string? Documentation { get; set; }
    }
}

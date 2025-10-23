using OpenQA.Selenium;
using Reqnroll;
using WorkflowConfig.E2E.Tests.PageObjects;
using FluentAssertions;

namespace WorkflowConfig.E2E.Tests.StepDefinitions;

[Binding]
public class PullRequestSteps
{
    private readonly ScenarioContext _scenarioContext;
    private IWebDriver Driver => (IWebDriver)_scenarioContext["WebDriver"];
    private PullRequestsPage PrPage => new PullRequestsPage(Driver);

    public PullRequestSteps(ScenarioContext scenarioContext)
    {
        _scenarioContext = scenarioContext;
    }

    [Given(@"a pull request exists with title ""(.*)""")]
    public void GivenAPullRequestExistsWithTitle(string title)
    {
        _scenarioContext["PrTitle"] = title;
    }

    [Given(@"the pull request status is ""(.*)""")]
    public void GivenThePullRequestStatusIs(string status)
    {
        _scenarioContext["ExpectedStatus"] = status;
    }

    [Given(@"multiple pull requests exist with different statuses")]
    public void GivenMultiplePullRequestsExistWithDifferentStatuses()
    {
        _scenarioContext["MultiplePRs"] = true;
    }

    [When(@"I navigate to the pull requests page")]
    public void WhenINavigateToThePullRequestsPage()
    {
        PrPage.Navigate();
    }

    [When(@"I click the ""Create Pull Request"" button")]
    public void WhenIClickTheCreatePullRequestButton()
    {
        var versionControlPage = new VersionControlPage(Driver);
        versionControlPage.ClickCreatePullRequest();
    }

    [When(@"I fill in the PR title as ""(.*)""")]
    public void WhenIFillInThePRTitleAs(string title)
    {
        _scenarioContext["PrTitle"] = title;
    }

    [When(@"I fill in the PR description as ""(.*)""")]
    public void WhenIFillInThePRDescriptionAs(string description)
    {
        _scenarioContext["PrDescription"] = description;
    }

    [When(@"I select target branch ""(.*)""")]
    public void WhenISelectTargetBranch(string targetBranch)
    {
        _scenarioContext["TargetBranch"] = targetBranch;
    }

    [When(@"I submit the pull request form")]
    public void WhenISubmitThePullRequestForm()
    {
        var title = _scenarioContext["PrTitle"].ToString();
        var description = _scenarioContext.ContainsKey("PrDescription") ? _scenarioContext["PrDescription"].ToString() : "";
        var targetBranch = _scenarioContext["TargetBranch"].ToString();
        
        PrPage.FillPullRequestForm(title, description, targetBranch);
        PrPage.SubmitPullRequest();
    }

    [When(@"I click on the pull request ""(.*)""")]
    public void WhenIClickOnThePullRequest(string title)
    {
        PrPage.ClickPullRequest(title);
    }

    [When(@"I click the ""Merge"" button")]
    public void WhenIClickTheMergeButton()
    {
        PrPage.ClickMerge();
    }

    [When(@"I select the ""(.*)"" filter")]
    public void WhenISelectTheFilter(string status)
    {
        PrPage.SelectStatusFilter(status);
    }

    [Then(@"the PR should appear in the pull requests list")]
    public void ThenThePRShouldAppearInThePullRequestsList()
    {
        var title = _scenarioContext["PrTitle"].ToString();
        PrPage.Navigate();
        PrPage.IsPullRequestVisible(title).Should().BeTrue($"PR '{title}' should be visible in the list");
    }

    [Then(@"I should see the PR details page")]
    public void ThenIShouldSeeThePRDetailsPage()
    {
        var detailsLocator = By.CssSelector(".pr-details, .pr-detail-container");
        PrPage.IsElementPresent(detailsLocator, timeoutSeconds: 5).Should().BeTrue("PR details page should be visible");
    }

    [Then(@"I should see the PR title ""(.*)""")]
    public void ThenIShouldSeeThePRTitle(string expectedTitle)
    {
        var actualTitle = PrPage.GetPrTitle();
        actualTitle.Should().Contain(expectedTitle);
    }

    [Then(@"I should see the source branch")]
    public void ThenIShouldSeeTheSourceBranch()
    {
        var sourceBranch = PrPage.GetSourceBranch();
        sourceBranch.Should().NotBeNullOrEmpty("Source branch should be displayed");
    }

    [Then(@"I should see the target branch")]
    public void ThenIShouldSeeTheTargetBranch()
    {
        var targetBranch = PrPage.GetTargetBranch();
        targetBranch.Should().NotBeNullOrEmpty("Target branch should be displayed");
    }

    [Then(@"I should see the commit count")]
    public void ThenIShouldSeeTheCommitCount()
    {
        var commitCount = PrPage.GetCommitCount();
        commitCount.Should().BeGreaterOrEqualTo(0, "Commit count should be displayed");
    }

    [Then(@"the PR status should be ""(.*)""")]
    public void ThenThePRStatusShouldBe(string expectedStatus)
    {
        var actualStatus = PrPage.GetPrStatus();
        actualStatus.Should().ContainEquivalentOf(expectedStatus);
    }

    [Then(@"I should only see (open|merged|closed) pull requests")]
    public void ThenIShouldOnlySeeFilteredPullRequests(string status)
    {
        var prCount = PrPage.GetPullRequestCount();
        prCount.Should().BeGreaterOrEqualTo(0, $"Should see {status} pull requests");
    }
}

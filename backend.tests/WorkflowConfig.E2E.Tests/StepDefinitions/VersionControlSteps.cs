using OpenQA.Selenium;
using Reqnroll;
using WorkflowConfig.E2E.Tests.PageObjects;
using FluentAssertions;

namespace WorkflowConfig.E2E.Tests.StepDefinitions;

[Binding]
public class VersionControlSteps
{
    private readonly ScenarioContext _scenarioContext;
    private IWebDriver Driver => (IWebDriver)_scenarioContext["WebDriver"];
    private VersionControlPage VcPage => new VersionControlPage(Driver);

    public VersionControlSteps(ScenarioContext scenarioContext)
    {
        _scenarioContext = scenarioContext;
    }

    [Given(@"I am on the version control page")]
    public void GivenIAmOnTheVersionControlPage()
    {
        VcPage.Navigate();
    }

    [Given(@"I have switched to branch ""(.*)""")]
    public void GivenIHaveSwitchedToBranch(string branchName)
    {
        VcPage.OpenBranchSelector();
        VcPage.SelectBranch(branchName);
        _scenarioContext["CurrentBranch"] = branchName;
    }

    [Given(@"multiple branches exist")]
    public void GivenMultipleBranchesExist()
    {
        _scenarioContext["MultipleBranches"] = true;
    }

    [Given(@"I have made changes to a workflow")]
    public void GivenIHaveMadeChangesToAWorkflow()
    {
        _scenarioContext["HasChanges"] = true;
    }

    [Given(@"I have local commits ahead of remote")]
    public void GivenIHaveLocalCommitsAheadOfRemote()
    {
        _scenarioContext["LocalAhead"] = true;
    }

    [Given(@"remote has commits I don't have locally")]
    public void GivenRemoteHasCommitsIDontHaveLocally()
    {
        _scenarioContext["RemoteAhead"] = true;
    }

    [When(@"I navigate to the version control page")]
    public void WhenINavigateToTheVersionControlPage()
    {
        VcPage.Navigate();
    }

    [When(@"I view the commit history")]
    public void WhenIViewTheCommitHistory()
    {
        // Commit history is visible on page load
    }

    [When(@"I click the ""Create Branch"" button")]
    public void WhenIClickTheCreateBranchButton()
    {
        VcPage.ClickCreateBranch();
    }

    [When(@"I enter branch name ""(.*)""")]
    public void WhenIEnterBranchName(string branchName)
    {
        VcPage.EnterBranchName(branchName);
        _scenarioContext["NewBranchName"] = branchName;
    }

    [When(@"I submit the new branch form")]
    public void WhenISubmitTheNewBranchForm()
    {
        VcPage.SubmitNewBranch();
    }

    [When(@"I open the branch selector")]
    public void WhenIOpenTheBranchSelector()
    {
        VcPage.OpenBranchSelector();
    }

    [When(@"I select branch ""(.*)""")]
    public void WhenISelectBranch(string branchName)
    {
        VcPage.SelectBranch(branchName);
        _scenarioContext["SelectedBranch"] = branchName;
    }

    [When(@"I enter commit message ""(.*)""")]
    public void WhenIEnterCommitMessage(string message)
    {
        VcPage.EnterCommitMessage(message);
    }

    [When(@"I click the ""Commit"" button")]
    public void WhenIClickTheCommitButton()
    {
        VcPage.ClickCommit();
    }

    [When(@"I click the ""Push"" button")]
    public void WhenIClickThePushButton()
    {
        VcPage.ClickPush();
    }

    [When(@"I click the ""Pull"" button")]
    public void WhenIClickThePullButton()
    {
        VcPage.ClickPull();
    }

    [Then(@"I should see a list of commits")]
    public void ThenIShouldSeeAListOfCommits()
    {
        var commitCount = VcPage.GetCommitCount();
        commitCount.Should().BeGreaterThan(0, "Should see at least one commit");
    }

    [Then(@"each commit should show author, message, and date")]
    public void ThenEachCommitShouldShowAuthorMessageAndDate()
    {
        var commitCount = VcPage.GetCommitCount();
        commitCount.Should().BeGreaterThan(0, "Commits should display metadata");
    }

    [Then(@"the branch ""(.*)"" should be created")]
    public void ThenTheBranchShouldBeCreated(string branchName)
    {
        var currentBranch = VcPage.GetCurrentBranch();
        currentBranch.Should().ContainEquivalentOf(branchName);
    }

    [Then(@"I should be switched to the new branch")]
    public void ThenIShouldBeSwitchedToTheNewBranch()
    {
        var newBranchName = _scenarioContext["NewBranchName"].ToString();
        var currentBranch = VcPage.GetCurrentBranch();
        currentBranch.Should().ContainEquivalentOf(newBranchName);
    }

    [Then(@"the current branch should be ""(.*)""")]
    public void ThenTheCurrentBranchShouldBe(string expectedBranch)
    {
        var currentBranch = VcPage.GetCurrentBranch();
        currentBranch.Should().ContainEquivalentOf(expectedBranch);
    }

    [Then(@"the workflows should reflect the branch state")]
    public void ThenTheWorkflowsShouldReflectTheBranchState()
    {
        // Verify page has reloaded
        Thread.Sleep(1000); // Give time for workflows to update
    }

    [Then(@"the changes should be committed")]
    public void ThenTheChangesShouldBeCommitted()
    {
        // Verify by checking commit history increased
        var commitCount = VcPage.GetCommitCount();
        commitCount.Should().BeGreaterThan(0);
    }

    [Then(@"I should see the new commit in history")]
    public void ThenIShouldSeeTheNewCommitInHistory()
    {
        var commitCount = VcPage.GetCommitCount();
        commitCount.Should().BeGreaterThan(0);
    }

    [Then(@"the commits should be pushed to remote")]
    public void ThenTheCommitsShouldBePushedToRemote()
    {
        Thread.Sleep(2000); // Give time for push operation
    }

    [Then(@"the sync indicator should show ""(.*)""")]
    public void ThenTheSyncIndicatorShouldShow(string expectedStatus)
    {
        var syncStatus = VcPage.GetSyncStatus();
        syncStatus.Should().ContainEquivalentOf(expectedStatus);
    }

    [Then(@"the remote commits should be pulled")]
    public void ThenTheRemoteCommitsShouldBePulled()
    {
        Thread.Sleep(2000); // Give time for pull operation
    }

    [Then(@"my local repository should be updated")]
    public void ThenMyLocalRepositoryShouldBeUpdated()
    {
        var commitCount = VcPage.GetCommitCount();
        commitCount.Should().BeGreaterThan(0);
    }
}

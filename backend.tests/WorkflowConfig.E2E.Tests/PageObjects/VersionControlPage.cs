using OpenQA.Selenium;

namespace WorkflowConfig.E2E.Tests.PageObjects;

public class VersionControlPage : BasePage
{
    public VersionControlPage(IWebDriver driver) : base(driver) { }

    private By CommitHistoryList => By.CssSelector(".commit-history");
    private By CommitItems => By.CssSelector(".commit-item");
    private By BranchSelector => By.CssSelector(".branch-selector");
    private By CurrentBranchDisplay => By.CssSelector(".current-branch");
    private By CreateBranchButton => By.CssSelector("button[aria-label='Create Branch']");
    private By BranchNameInput => By.CssSelector("input[name='branchName']");
    private By CommitMessageInput => By.CssSelector("textarea[name='commitMessage']");
    private By CommitButton => By.CssSelector("button.commit-btn");
    private By PushButton => By.CssSelector("button.push-btn");
    private By PullButton => By.CssSelector("button.pull-btn");
    private By SyncStatusIndicator => By.CssSelector(".sync-status");
    private By CreatePullRequestButton => By.CssSelector("button[aria-label='Create Pull Request']");

    public void Navigate()
    {
        NavigateTo("/version-control");
    }

    public int GetCommitCount()
    {
        WaitForElement(CommitHistoryList);
        var commits = Driver.FindElements(CommitItems);
        return commits.Count;
    }

    public string GetCurrentBranch()
    {
        return GetText(CurrentBranchDisplay);
    }

    public void ClickCreateBranch()
    {
        Click(CreateBranchButton);
    }

    public void EnterBranchName(string branchName)
    {
        TypeText(BranchNameInput, branchName);
    }

    public void SubmitNewBranch()
    {
        var submitButton = By.CssSelector("button[type='submit']");
        Click(submitButton);
    }

    public void OpenBranchSelector()
    {
        Click(BranchSelector);
    }

    public void SelectBranch(string branchName)
    {
        var branchOption = By.XPath($"//div[contains(@class, 'branch-option')]//span[contains(text(), '{branchName}')]");
        Click(branchOption);
    }

    public void EnterCommitMessage(string message)
    {
        TypeText(CommitMessageInput, message);
    }

    public void ClickCommit()
    {
        Click(CommitButton);
    }

    public void ClickPush()
    {
        Click(PushButton);
    }

    public void ClickPull()
    {
        Click(PullButton);
    }

    public string GetSyncStatus()
    {
        return GetText(SyncStatusIndicator);
    }

    public void ClickCreatePullRequest()
    {
        Click(CreatePullRequestButton);
    }
}

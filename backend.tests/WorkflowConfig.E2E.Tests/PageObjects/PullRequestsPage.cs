using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace WorkflowConfig.E2E.Tests.PageObjects;

public class PullRequestsPage : BasePage
{
    public IWebDriver Driver => base.Driver;
    public PullRequestsPage(IWebDriver driver) : base(driver) { }

    private By PullRequestList => By.CssSelector(".pr-list");
    private By PullRequestCards => By.CssSelector(".pr-card");
    private By StatusFilter => By.CssSelector(".status-filter");
    private By PrTitleInput => By.CssSelector("input[formControlName='title']");
    private By PrDescriptionInput => By.CssSelector("textarea[formControlName='description']");
    private By TargetBranchSelect => By.CssSelector("select[formControlName='targetBranch']");
    private By SubmitPrButton => By.CssSelector("button.submit-pr");
    private By MergeButton => By.CssSelector("button.merge-btn");
    private By ConfirmMergeButton => By.CssSelector("button.confirm-merge");
    private By PrStatus => By.CssSelector(".pr-status");
    private By SuccessMessage => By.CssSelector(".success-message");

    public void Navigate()
    {
        NavigateTo("/pull-requests");
    }

    public int GetPullRequestCount()
    {
        WaitForElement(PullRequestList);
        var prs = Driver.FindElements(PullRequestCards);
        return prs.Count;
    }

    public bool IsPullRequestVisible(string title)
    {
        var locator = By.XPath($"//div[contains(@class, 'pr-card')]//h3[contains(text(), '{title}')]");
        return IsElementPresent(locator);
    }

    public void ClickPullRequest(string title)
    {
        var prCard = By.XPath($"//div[contains(@class, 'pr-card')]//h3[contains(text(), '{title}')]");
        Click(prCard);
    }

    public void FillPullRequestForm(string title, string description, string targetBranch)
    {
        TypeText(PrTitleInput, title);
        TypeText(PrDescriptionInput, description);
        
        var targetSelect = WaitForElement(TargetBranchSelect);
        var selectElement = new SelectElement(targetSelect);
        selectElement.SelectByText(targetBranch);
    }

    public void SubmitPullRequest()
    {
        Click(SubmitPrButton);
    }

    public void SelectStatusFilter(string status)
    {
        Click(StatusFilter);
        var filterOption = By.XPath($"//button[contains(@class, 'filter-option')]//span[text()='{status}']");
        Click(filterOption);
    }

    public void ClickMerge()
    {
        Click(MergeButton);
    }

    public void ConfirmMerge()
    {
        Click(ConfirmMergeButton);
    }

    public string GetPrStatus()
    {
        return GetText(PrStatus);
    }

    public bool IsSuccessMessageVisible()
    {
        return IsElementPresent(SuccessMessage);
    }

    public string GetPrTitle()
    {
        var titleElement = By.CssSelector(".pr-detail-title");
        return GetText(titleElement);
    }

    public string GetSourceBranch()
    {
        var sourceBranchElement = By.CssSelector(".source-branch");
        return GetText(sourceBranchElement);
    }

    public string GetTargetBranch()
    {
        var targetBranchElement = By.CssSelector(".target-branch");
        return GetText(targetBranchElement);
    }

    public int GetCommitCount()
    {
        var commitCountElement = By.CssSelector(".commit-count");
        var countText = GetText(commitCountElement);
        return int.Parse(countText.Split(' ')[0]);
    }
}

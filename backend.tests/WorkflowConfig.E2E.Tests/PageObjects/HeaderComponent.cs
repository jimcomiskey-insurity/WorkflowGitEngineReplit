using OpenQA.Selenium;

namespace WorkflowConfig.E2E.Tests.PageObjects;

public class HeaderComponent : BasePage
{
    public HeaderComponent(IWebDriver driver) : base(driver) { }

    private By UserSelector => By.CssSelector(".user-selector");
    private By NavigationMenu => By.CssSelector(".nav-menu");

    public void SelectUser(string userId)
    {
        Click(UserSelector);
        var userOption = By.XPath($"//option[@value='{userId}']");
        var element = WaitForElement(userOption);
        element.Click();
    }

    public void NavigateToWorkflows()
    {
        var workflowsLink = By.XPath("//a[contains(text(), 'Workflows')]");
        Click(workflowsLink);
    }

    public void NavigateToVersionControl()
    {
        var versionControlLink = By.XPath("//a[contains(text(), 'Version Control')]");
        Click(versionControlLink);
    }

    public void NavigateToPullRequests()
    {
        var pullRequestsLink = By.XPath("//a[contains(text(), 'Pull Requests')]");
        Click(pullRequestsLink);
    }
}

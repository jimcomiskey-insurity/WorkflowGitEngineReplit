using OpenQA.Selenium;
using Reqnroll;
using WorkflowConfig.E2E.Tests.PageObjects;
using WorkflowConfig.E2E.Tests.Support;
using FluentAssertions;

namespace WorkflowConfig.E2E.Tests.StepDefinitions;

[Binding]
public class CommonSteps
{
    private readonly ScenarioContext _scenarioContext;
    private IWebDriver Driver => (IWebDriver)_scenarioContext["WebDriver"];

    public CommonSteps(ScenarioContext scenarioContext)
    {
        _scenarioContext = scenarioContext;
    }

    [Given(@"the application is running")]
    public void GivenTheApplicationIsRunning()
    {
        Driver.Navigate().GoToUrl(TestConfiguration.BaseUrl);
        
        var wait = new OpenQA.Selenium.Support.UI.WebDriverWait(Driver, TestConfiguration.DefaultTimeout);
        wait.Until(d => ((IJavaScriptExecutor)d)
            .ExecuteScript("return document.readyState").Equals("complete"));
    }

    [Given(@"I am logged in as ""(.*)""")]
    public void GivenIAmLoggedInAs(string userId)
    {
        var header = new HeaderComponent(Driver);
        header.SelectUser(userId);
        _scenarioContext["CurrentUser"] = userId;
    }

    [Then(@"I should see a success message")]
    public void ThenIShouldSeeASuccessMessage()
    {
        var basePage = new BasePage(Driver);
        var successMessageLocator = By.CssSelector(".success-message, .toast-success, [class*='success']");
        basePage.IsElementPresent(successMessageLocator, timeoutSeconds: 5).Should().BeTrue("Success message should be visible");
    }

    [When(@"I confirm the (.*)")]
    public void WhenIConfirmTheAction(string action)
    {
        var confirmButton = By.CssSelector($"button.confirm-{action.ToLower()}, button[aria-label='Confirm']");
        var basePage = new BasePage(Driver);
        basePage.Click(confirmButton);
    }

    private class BasePage : PageObjects.BasePage
    {
        public BasePage(IWebDriver driver) : base(driver) { }
        
        public new void Click(By locator) => base.Click(locator);
        public new bool IsElementPresent(By locator, int timeoutSeconds = 2) => base.IsElementPresent(locator, timeoutSeconds);
    }
}

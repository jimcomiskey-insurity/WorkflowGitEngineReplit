using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using WorkflowConfig.E2E.Tests.Support;

namespace WorkflowConfig.E2E.Tests.PageObjects;

public abstract class BasePage
{
    protected readonly IWebDriver Driver;
    protected readonly WebDriverWait Wait;

    protected BasePage(IWebDriver driver)
    {
        Driver = driver;
        Wait = new WebDriverWait(driver, TestConfiguration.DefaultTimeout);
    }

    protected void NavigateTo(string path)
    {
        var url = $"{TestConfiguration.BaseUrl}{path}";
        Driver.Navigate().GoToUrl(url);
    }

    protected IWebElement WaitForElement(By locator)
    {
        return Wait.Until(d => d.FindElement(locator));
    }

    protected void Click(By locator)
    {
        var element = WaitForElement(locator);
        element.Click();
    }

    protected void TypeText(By locator, string text)
    {
        var element = WaitForElement(locator);
        element.Clear();
        element.SendKeys(text);
    }

    protected string GetText(By locator)
    {
        var element = WaitForElement(locator);
        return element.Text;
    }

    protected bool IsElementPresent(By locator, int timeoutSeconds = 2)
    {
        try
        {
            var shortWait = new WebDriverWait(Driver, TimeSpan.FromSeconds(timeoutSeconds));
            shortWait.Until(d => d.FindElement(locator));
            return true;
        }
        catch (WebDriverTimeoutException)
        {
            return false;
        }
    }

    protected void WaitForPageLoad()
    {
        Wait.Until(d => ((IJavaScriptExecutor)d)
            .ExecuteScript("return document.readyState").Equals("complete"));
    }
}

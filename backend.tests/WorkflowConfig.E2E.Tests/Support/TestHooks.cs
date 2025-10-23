using OpenQA.Selenium;
using Reqnroll;

namespace WorkflowConfig.E2E.Tests.Support;

[Binding]
public class TestHooks
{
    private readonly ScenarioContext _scenarioContext;

    public TestHooks(ScenarioContext scenarioContext)
    {
        _scenarioContext = scenarioContext;
    }

    [BeforeScenario]
    public void BeforeScenario()
    {
        var driver = WebDriverFactory.CreateChromeDriver(headless: true);
        _scenarioContext["WebDriver"] = driver;
    }

    [AfterScenario]
    public void AfterScenario()
    {
        if (_scenarioContext.TryGetValue("WebDriver", out IWebDriver driver))
        {
            try
            {
                driver.Quit();
                driver.Dispose();
            }
            catch
            {
                // Ignore disposal errors
            }
        }
    }

    [AfterStep]
    public void AfterStep()
    {
        if (_scenarioContext.TestError != null && _scenarioContext.TryGetValue("WebDriver", out IWebDriver driver))
        {
            try
            {
                var screenshot = ((ITakesScreenshot)driver).GetScreenshot();
                var screenshotPath = Path.Combine(
                    Path.GetTempPath(), 
                    $"screenshot_{_scenarioContext.ScenarioInfo.Title}_{DateTime.Now:yyyyMMdd_HHmmss}.png"
                );
                screenshot.SaveAsFile(screenshotPath);
                Console.WriteLine($"Screenshot saved: {screenshotPath}");
            }
            catch
            {
                // Ignore screenshot errors
            }
        }
    }
}

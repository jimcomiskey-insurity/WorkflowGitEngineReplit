using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace WorkflowConfig.E2E.Tests.Support;

public static class WebDriverFactory
{
    public static IWebDriver CreateChromeDriver(bool headless = true)
    {
        var options = new ChromeOptions();
        
        if (headless)
        {
            options.AddArgument("--headless=new");
        }
        
        options.AddArgument("--no-sandbox");
        options.AddArgument("--disable-dev-shm-usage");
        options.AddArgument("--disable-gpu");
        options.AddArgument("--window-size=1920,1080");
        options.AddArgument("--disable-extensions");
        options.AddArgument("--disable-web-security");
        options.AddArgument("--allow-insecure-localhost");
        
        options.SetLoggingPreference(LogType.Browser, LogLevel.Severe);
        
        var driver = new ChromeDriver(options);
        driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
        driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(30);
        
        return driver;
    }
}

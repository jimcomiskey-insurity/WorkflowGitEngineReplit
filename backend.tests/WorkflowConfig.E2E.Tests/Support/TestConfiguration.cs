namespace WorkflowConfig.E2E.Tests.Support;

public static class TestConfiguration
{
    public static string FrontendUrl => Environment.GetEnvironmentVariable("TEST_FRONTEND_URL") ?? "http://localhost:4200";
    
    public static string BackendUrl => Environment.GetEnvironmentVariable("TEST_BACKEND_URL") ?? "http://localhost:5000";
    
    public static string BaseUrl => FrontendUrl;
    
    public static TimeSpan DefaultTimeout => TimeSpan.FromSeconds(30);
    
    public static TimeSpan ShortTimeout => TimeSpan.FromSeconds(5);
}

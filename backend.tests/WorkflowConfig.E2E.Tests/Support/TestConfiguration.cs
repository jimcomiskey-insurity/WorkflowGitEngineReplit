namespace WorkflowConfig.E2E.Tests.Support;

public static class TestConfiguration
{
    public static string BaseUrl => Environment.GetEnvironmentVariable("BASE_URL") ?? "http://localhost:5000";
    
    public static string BackendUrl => Environment.GetEnvironmentVariable("BACKEND_URL") ?? "http://localhost:5264";
    
    public static TimeSpan DefaultTimeout => TimeSpan.FromSeconds(30);
    
    public static TimeSpan ShortTimeout => TimeSpan.FromSeconds(5);
}

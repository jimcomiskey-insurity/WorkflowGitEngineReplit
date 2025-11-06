using System.Text.Json;
using WorkflowConfig.Api;
using WorkflowConfig.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.CustomOperationIds(apiDesc =>
    {
        // Use the controller action method name as the operation ID
        var actionDescriptor = apiDesc.ActionDescriptor as Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor;
        return actionDescriptor?.ActionName;
    });
});

builder.Services.AddSingleton<GitService>();
builder.Services.AddSingleton<PullRequestService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

var gitService = app.Services.GetRequiredService<GitService>();
gitService.InitializeCentralRepository();

var centralRepoPath = app.Configuration["GitSettings:CentralRepoPath"] ?? "data/central-repo";
var sampleDataPath = Path.Combine(Directory.GetCurrentDirectory(), "sampledata.json");
DataInitializer.InitializeSampleData(centralRepoPath, sampleDataPath);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.MapControllers();

app.Run();

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

builder.Services.AddSingleton<ProgramService>();
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

var programService = app.Services.GetRequiredService<ProgramService>();
var gitService = app.Services.GetRequiredService<GitService>();

var defaultProgramId = programService.GetDefaultProgramId();
var programs = programService.GetAllPrograms();

if (!programs.Any())
{
    var defaultProgram = new WorkflowConfig.Api.Models.Program
    {
        Id = defaultProgramId,
        Name = "Auto Insurance",
        Description = "Default insurance program with workflows, assets, and data stores",
        CreatedDate = DateTime.UtcNow
    };
    programService.CreateProgram(defaultProgram);
    
    gitService.InitializeCentralRepository(defaultProgramId);
    
    var centralRepoPath = programService.GetCentralRepoPath(defaultProgramId);
    var sampleDataPath = Path.Combine(Directory.GetCurrentDirectory(), "sampledata.json");
    DataInitializer.InitializeSampleData(centralRepoPath, sampleDataPath);
    
    app.Logger.LogInformation("Created default program '{ProgramName}' with sample data", defaultProgram.Name);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.MapControllers();

app.Run();

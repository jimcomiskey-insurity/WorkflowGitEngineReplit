using WorkflowConfig.Api;
using WorkflowConfig.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

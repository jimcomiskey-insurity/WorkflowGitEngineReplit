using LibGit2Sharp;
using System.Text.Json;
using WorkflowConfig.Api.Models;

namespace WorkflowConfig.Api;

public static class DataInitializer
{
    public static void InitializeSampleData(string centralRepoPath, string sampleDataPath)
    {
        if (!File.Exists(sampleDataPath))
        {
            Console.WriteLine($"Sample data file not found: {sampleDataPath}");
            return;
        }

        var tempRepoPath = Path.Combine(Path.GetTempPath(), "workflow-init-" + Guid.NewGuid().ToString());
        
        try
        {
            Repository.Clone(centralRepoPath, tempRepoPath);
            
            using (var repo = new Repository(tempRepoPath))
            {
                var workflowFilePath = Path.Combine(tempRepoPath, "workflows.json");
                
                if (File.Exists(workflowFilePath))
                {
                    Console.WriteLine("Sample data already initialized in repository.");
                    return;
                }

                File.Copy(sampleDataPath, workflowFilePath);

                Commands.Stage(repo, "*");

                var signature = new Signature("System", "system@workflow.com", DateTimeOffset.Now);
                repo.Commit("Initial commit: Add sample workflow data", signature, signature);

                var remote = repo.Network.Remotes["origin"];
                var options = new PushOptions();
                
                repo.Network.Push(remote, @"refs/heads/master", options);
                
                Console.WriteLine("Sample data initialized successfully.");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error initializing sample data: {ex.Message}");
        }
        finally
        {
            if (Directory.Exists(tempRepoPath))
            {
                Directory.Delete(tempRepoPath, true);
            }
        }
    }
}

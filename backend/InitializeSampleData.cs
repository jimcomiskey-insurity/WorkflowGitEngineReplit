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
                var workflowListPath = Path.Combine(tempRepoPath, "workflow-list.json");
                
                // Check if already initialized (either new or legacy format)
                if (File.Exists(workflowListPath) || File.Exists(Path.Combine(tempRepoPath, "workflows.json")))
                {
                    Console.WriteLine("Sample data already initialized in repository.");
                    return;
                }

                // Read sample data
                var sampleJson = File.ReadAllText(sampleDataPath);
                var sampleData = JsonSerializer.Deserialize<ProgramWorkflows>(sampleJson);
                
                if (sampleData == null || !sampleData.Workflows.Any())
                {
                    Console.WriteLine("No workflows found in sample data.");
                    return;
                }

                // Ensure all workflows have IDs
                foreach (var workflow in sampleData.Workflows)
                {
                    if (workflow.Id == Guid.Empty)
                    {
                        workflow.Id = Guid.NewGuid();
                    }
                }

                // Write workflow list
                var workflowList = new WorkflowList 
                { 
                    WorkflowIds = sampleData.Workflows.Select(w => w.Id).ToList() 
                };
                var listJson = JsonSerializer.Serialize(workflowList, new JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(workflowListPath, listJson);

                // Create workflows directory and write individual workflow files
                var workflowsDir = Path.Combine(tempRepoPath, "workflows");
                Directory.CreateDirectory(workflowsDir);
                
                foreach (var workflow in sampleData.Workflows)
                {
                    var workflowPath = Path.Combine(workflowsDir, $"{workflow.Id}.json");
                    var workflowJson = JsonSerializer.Serialize(workflow, new JsonSerializerOptions { WriteIndented = true });
                    File.WriteAllText(workflowPath, workflowJson);
                }

                Commands.Stage(repo, "*");

                var signature = new Signature("System", "system@workflow.com", DateTimeOffset.Now);
                repo.Commit("Initial commit: Add sample workflow data", signature, signature);

                var remote = repo.Network.Remotes["origin"];
                var options = new PushOptions();
                
                repo.Network.Push(remote, @"refs/heads/master", options);
                
                Console.WriteLine($"Sample data initialized successfully: {sampleData.Workflows.Count} workflows in split-file format.");
            }
            
            ForceGarbageCollection();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error initializing sample data: {ex.Message}");
        }
        finally
        {
            if (Directory.Exists(tempRepoPath))
            {
                DeleteDirectoryWithRetry(tempRepoPath);
            }
        }
    }

    private static void ForceGarbageCollection()
    {
        GC.Collect();
        GC.WaitForPendingFinalizers();
        GC.Collect();
    }

    private static void DeleteDirectoryWithRetry(string path, int maxRetries = 3, int delayMs = 500)
    {
        for (int attempt = 0; attempt < maxRetries; attempt++)
        {
            try
            {
                if (Directory.Exists(path))
                {
                    RemoveReadOnlyAttributes(path);
                    Directory.Delete(path, true);
                    return;
                }
            }
            catch (UnauthorizedAccessException ex) when (attempt < maxRetries - 1)
            {
                Console.WriteLine($"Directory deletion attempt {attempt + 1} failed (file locked). Retrying in {delayMs}ms...");
                Thread.Sleep(delayMs);
                ForceGarbageCollection();
            }
            catch (IOException ex) when (attempt < maxRetries - 1)
            {
                Console.WriteLine($"Directory deletion attempt {attempt + 1} failed (I/O error). Retrying in {delayMs}ms...");
                Thread.Sleep(delayMs);
                ForceGarbageCollection();
            }
            catch (Exception ex) when (attempt == maxRetries - 1)
            {
                Console.WriteLine($"Warning: Could not delete temporary directory after {maxRetries} attempts: {path}");
                Console.WriteLine($"Error: {ex.Message}");
                return;
            }
        }
    }

    private static void RemoveReadOnlyAttributes(string path)
    {
        var directory = new DirectoryInfo(path);
        
        foreach (var file in directory.GetFiles("*", SearchOption.AllDirectories))
        {
            if (file.IsReadOnly)
            {
                file.IsReadOnly = false;
            }
        }
        
        foreach (var dir in directory.GetDirectories("*", SearchOption.AllDirectories))
        {
            if ((dir.Attributes & FileAttributes.ReadOnly) == FileAttributes.ReadOnly)
            {
                dir.Attributes &= ~FileAttributes.ReadOnly;
            }
        }
    }
}

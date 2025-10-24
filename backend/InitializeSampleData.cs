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

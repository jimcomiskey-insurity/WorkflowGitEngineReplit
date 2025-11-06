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
                var assetListPath = Path.Combine(tempRepoPath, "asset-list.json");
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

                // Ensure all workflows have IDs (use existing from JSON or generate deterministic ones)
                foreach (var workflow in sampleData.Workflows)
                {
                    if (workflow.Id == Guid.Empty)
                    {
                        // Generate deterministic ID based on WorkflowKey only if not already set in JSON
                        using var sha256 = System.Security.Cryptography.SHA256.Create();
                        var hashBytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(workflow.WorkflowKey));
                        workflow.Id = new Guid(hashBytes.Take(16).ToArray());
                        Console.WriteLine($"Generated ID {workflow.Id} for workflow {workflow.WorkflowKey}");
                    }
                    else
                    {
                        Console.WriteLine($"Using existing ID {workflow.Id} for workflow {workflow.WorkflowKey}");
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

                // Create sample assets
                CreateSampleAssets(tempRepoPath);

                // Initialize empty datastore structure
                InitializeDataStores(tempRepoPath);

                Commands.Stage(repo, "*");

                var signature = new Signature("System", "system@workflow.com", DateTimeOffset.Now);
                repo.Commit("Initial commit: Add sample workflow, asset, and datastore data", signature, signature);

                var remote = repo.Network.Remotes["origin"];
                var options = new PushOptions();
                
                repo.Network.Push(remote, @"refs/heads/master", options);
                
                Console.WriteLine($"Sample data initialized successfully: {sampleData.Workflows.Count} workflows and 4 sample assets.");
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

    private static void CreateSampleAssets(string repoPath)
    {
        var assetsDir = Path.Combine(repoPath, "assets");
        var assetFilesDir = Path.Combine(repoPath, "asset-files");
        Directory.CreateDirectory(assetsDir);
        Directory.CreateDirectory(assetFilesDir);

        var assets = new List<Asset>();

        // Asset 1: No file
        var asset1 = new Asset
        {
            Id = Guid.NewGuid(),
            Name = "Policy Rules Documentation",
            Description = "Documentation for insurance policy underwriting rules",
            Tags = new List<string> { "documentation", "rules", "underwriting" }
        };
        assets.Add(asset1);

        // Asset 2: JSON file
        var asset2Id = Guid.NewGuid();
        var asset2 = new Asset
        {
            Id = asset2Id,
            Name = "Product Configuration",
            Description = "JSON configuration for insurance products",
            Tags = new List<string> { "config", "products", "json" },
            FileName = "product-config.json",
            FileType = "json",
            FileSizeBytes = 0,
            FileUploadedDate = DateTime.UtcNow
        };
        
        var jsonContent = @"{
  ""products"": [
    {
      ""id"": ""AUTO-001"",
      ""name"": ""Auto Insurance Standard"",
      ""basePremium"": 500.00,
      ""coverageTypes"": [""liability"", ""collision"", ""comprehensive""],
      ""deductibles"": [250, 500, 1000]
    },
    {
      ""id"": ""HOME-001"",
      ""name"": ""Homeowner Insurance Basic"",
      ""basePremium"": 1200.00,
      ""coverageTypes"": [""dwelling"", ""personal-property"", ""liability""],
      ""deductibles"": [500, 1000, 2500]
    }
  ],
  ""ratingFactors"": {
    ""age"": { ""young"": 1.3, ""middle"": 1.0, ""senior"": 1.1 },
    ""location"": { ""urban"": 1.2, ""suburban"": 1.0, ""rural"": 0.9 }
  }
}";
        var asset2Dir = Path.Combine(assetFilesDir, asset2Id.ToString());
        Directory.CreateDirectory(asset2Dir);
        var jsonFilePath = Path.Combine(asset2Dir, "product-config.json");
        File.WriteAllText(jsonFilePath, jsonContent);
        asset2.FileSizeBytes = new FileInfo(jsonFilePath).Length;
        assets.Add(asset2);

        // Asset 3: XML file
        var asset3Id = Guid.NewGuid();
        var asset3 = new Asset
        {
            Id = asset3Id,
            Name = "Coverage Transform",
            Description = "XSLT transformation for coverage data",
            Tags = new List<string> { "transform", "xslt", "coverage" },
            FileName = "coverage-transform.xml",
            FileType = "xml",
            FileSizeBytes = 0,
            FileUploadedDate = DateTime.UtcNow
        };
        
        var xmlContent = @"<?xml version=""1.0"" encoding=""UTF-8""?>
<policy xmlns=""http://insurance.example.com/schema"">
  <policyNumber>POL-2024-001</policyNumber>
  <effectiveDate>2024-01-01</effectiveDate>
  <expirationDate>2025-01-01</expirationDate>
  <insured>
    <name>John Doe</name>
    <address>
      <street>123 Main Street</street>
      <city>Springfield</city>
      <state>IL</state>
      <zip>62701</zip>
    </address>
  </insured>
  <coverages>
    <coverage type=""liability"">
      <limit>100000</limit>
      <deductible>500</deductible>
      <premium>450.00</premium>
    </coverage>
    <coverage type=""collision"">
      <limit>50000</limit>
      <deductible>1000</deductible>
      <premium>320.00</premium>
    </coverage>
  </coverages>
  <totalPremium>770.00</totalPremium>
</policy>";
        var asset3Dir = Path.Combine(assetFilesDir, asset3Id.ToString());
        Directory.CreateDirectory(asset3Dir);
        var xmlFilePath = Path.Combine(asset3Dir, "coverage-transform.xml");
        File.WriteAllText(xmlFilePath, xmlContent);
        asset3.FileSizeBytes = new FileInfo(xmlFilePath).Length;
        assets.Add(asset3);

        // Asset 4: Binary file (PDF - simulated with binary data)
        var asset4Id = Guid.NewGuid();
        var asset4 = new Asset
        {
            Id = asset4Id,
            Name = "Policy Template",
            Description = "PDF template for insurance policy documents",
            Tags = new List<string> { "template", "pdf", "policy" },
            FileName = "policy-template.pdf",
            FileType = "pdf",
            FileSizeBytes = 0,
            FileUploadedDate = DateTime.UtcNow
        };
        
        // Create a minimal PDF file (simple binary content)
        var pdfContent = new byte[] {
            0x25, 0x50, 0x44, 0x46, 0x2D, 0x31, 0x2E, 0x34, 0x0A, // %PDF-1.4\n
            0x25, 0xC4, 0xE5, 0xF2, 0xE5, 0xEB, 0xA7, 0xF3, 0xA0, 0xD0, 0xC4, 0xC6, 0x0A // binary comment
        };
        var asset4Dir = Path.Combine(assetFilesDir, asset4Id.ToString());
        Directory.CreateDirectory(asset4Dir);
        var pdfFilePath = Path.Combine(asset4Dir, "policy-template.pdf");
        File.WriteAllBytes(pdfFilePath, pdfContent);
        asset4.FileSizeBytes = new FileInfo(pdfFilePath).Length;
        assets.Add(asset4);

        // Write asset list
        var assetList = new AssetList
        {
            AssetIds = assets.Select(a => a.Id!.Value).ToList()
        };
        var assetListPath = Path.Combine(repoPath, "asset-list.json");
        var listJson = JsonSerializer.Serialize(assetList, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(assetListPath, listJson);

        // Write individual asset files
        foreach (var asset in assets)
        {
            var assetPath = Path.Combine(assetsDir, $"{asset.Id}.json");
            var assetJson = JsonSerializer.Serialize(asset, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(assetPath, assetJson);
        }

        Console.WriteLine("Created 4 sample assets: 1 without file, 1 JSON, 1 XML, 1 PDF");
    }

    private static void InitializeDataStores(string repoPath)
    {
        var dataStoresDir = Path.Combine(repoPath, "datastores");
        Directory.CreateDirectory(dataStoresDir);

        // Create empty datastore list to track datastores in Git (as an array, not object)
        var dataStoreList = new List<DataStoreListItem>();
        var dataStoreListPath = Path.Combine(repoPath, "datastore-list.json");
        var listJson = JsonSerializer.Serialize(dataStoreList, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(dataStoreListPath, listJson);

        Console.WriteLine("Initialized empty datastore structure");
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

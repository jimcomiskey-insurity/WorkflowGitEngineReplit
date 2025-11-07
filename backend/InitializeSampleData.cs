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

        // Create Auto Insurance DataStore
        var dataStoreId = "ds-auto-insurance-001";
        var dataStore = CreateAutoInsuranceDataStore(dataStoreId);

        // Write individual datastore file
        var dataStorePath = Path.Combine(dataStoresDir, $"{dataStoreId}.json");
        var dataStoreJson = JsonSerializer.Serialize(dataStore, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(dataStorePath, dataStoreJson);

        // Create datastore list
        var dataStoreList = new List<DataStoreListItem>
        {
            new DataStoreListItem
            {
                Id = dataStoreId,
                Name = dataStore.Name,
                Description = dataStore.Description,
                NoOfTimesUsed = dataStore.NoOfTimesUsed
            }
        };
        var dataStoreListPath = Path.Combine(repoPath, "datastore-list.json");
        var listJson = JsonSerializer.Serialize(dataStoreList, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(dataStoreListPath, listJson);

        Console.WriteLine($"Created sample auto insurance datastore with {dataStore.DataGroups.Count} top-level groups");
    }

    private static DataStore CreateAutoInsuranceDataStore(string id)
    {
        var dataStore = new DataStore
        {
            Id = id,
            Name = "Auto Insurance Starter",
            Description = "Sample DataStore for auto insurance policies with calculated fields",
            NoOfTimesUsed = 0,
            Aliases = new List<string> { "AutoPolicy", "VehicleInsurance" },
            DataGroups = new List<DataGroup>()
        };

        // 1. Account Group
        var accountGroup = new DataGroup
        {
            Id = "dg-account",
            Name = "Account",
            Description = "Policyholder account information",
            OrderIndex = 0,
            IsRepeatable = false,
            DataPoints = new List<DataPoint>
            {
                new DataPoint
                {
                    Id = "dp-account-firstname",
                    Name = "First Name",
                    DataType = "String",
                    OrderIndex = 0,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Basic",
                        MaxLength = 50
                    }
                },
                new DataPoint
                {
                    Id = "dp-account-lastname",
                    Name = "Last Name",
                    DataType = "String",
                    OrderIndex = 1,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Basic",
                        MaxLength = 50
                    }
                },
                new DataPoint
                {
                    Id = "dp-account-fullname",
                    Name = "Full Name",
                    Description = "Calculated: Combines First Name and Last Name",
                    DataType = "String",
                    OrderIndex = 2,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Calculated"
                    },
                    Calculation = new DataPointCalculation
                    {
                        Inputs = new List<ScriptInput>
                        {
                            new ScriptInput
                            {
                                DataPointId = "dp-account-firstname",
                                DataPointName = "First Name",
                                DataType = "String",
                                Alias = "firstName"
                            },
                            new ScriptInput
                            {
                                DataPointId = "dp-account-lastname",
                                DataPointName = "Last Name",
                                DataType = "String",
                                Alias = "lastName"
                            }
                        },
                        Script = "  // Combine first and last name with null handling\n  var first = firstName ?? \"\";\n  var last = lastName ?? \"\";\n  return (first + \" \" + last).Trim();"
                    }
                },
                new DataPoint
                {
                    Id = "dp-account-email",
                    Name = "Email",
                    DataType = "Email",
                    OrderIndex = 3,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Basic"
                    }
                },
                new DataPoint
                {
                    Id = "dp-account-phone",
                    Name = "Phone",
                    DataType = "Phone",
                    OrderIndex = 4,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Basic"
                    }
                },
                new DataPoint
                {
                    Id = "dp-account-zipcode",
                    Name = "Zip Code",
                    DataType = "Zipcode",
                    OrderIndex = 5,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Basic"
                    }
                }
            }
        };

        // 2. Producer Group
        var producerGroup = new DataGroup
        {
            Id = "dg-producer",
            Name = "Producer",
            Description = "Insurance agent/broker information",
            OrderIndex = 1,
            IsRepeatable = false,
            DataPoints = new List<DataPoint>
            {
                new DataPoint
                {
                    Id = "dp-producer-name",
                    Name = "Agent Name",
                    DataType = "String",
                    OrderIndex = 0,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Basic"
                    }
                },
                new DataPoint
                {
                    Id = "dp-producer-code",
                    Name = "Producer Code",
                    DataType = "String",
                    OrderIndex = 1,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Basic",
                        MaxLength = 10
                    }
                },
                new DataPoint
                {
                    Id = "dp-producer-email",
                    Name = "Producer Email",
                    DataType = "Email",
                    OrderIndex = 2,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Basic"
                    }
                }
            }
        };

        // 3. Business Group
        var businessGroup = new DataGroup
        {
            Id = "dg-business",
            Name = "Business",
            Description = "Business and underwriting information",
            OrderIndex = 2,
            IsRepeatable = false,
            DataPoints = new List<DataPoint>
            {
                new DataPoint
                {
                    Id = "dp-business-state",
                    Name = "State",
                    DataType = "String",
                    OrderIndex = 0,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Basic",
                        MaxLength = 2
                    }
                },
                new DataPoint
                {
                    Id = "dp-business-effectivedate",
                    Name = "Effective Date",
                    DataType = "Date",
                    OrderIndex = 1,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Basic"
                    }
                },
                new DataPoint
                {
                    Id = "dp-business-expirationdate",
                    Name = "Expiration Date",
                    DataType = "Date",
                    OrderIndex = 2,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Basic"
                    }
                },
                new DataPoint
                {
                    Id = "dp-business-termdays",
                    Name = "Term Days",
                    Description = "Calculated: Days between effective and expiration dates",
                    DataType = "Integer",
                    OrderIndex = 3,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Calculated"
                    },
                    Calculation = new DataPointCalculation
                    {
                        Inputs = new List<ScriptInput>
                        {
                            new ScriptInput
                            {
                                DataPointId = "dp-business-effectivedate",
                                DataPointName = "Effective Date",
                                DataType = "Date",
                                Alias = "effectiveDate"
                            },
                            new ScriptInput
                            {
                                DataPointId = "dp-business-expirationdate",
                                DataPointName = "Expiration Date",
                                DataType = "Date",
                                Alias = "expirationDate"
                            }
                        },
                        Script = "  // Calculate days between dates with null handling\n  if (effectiveDate == null || expirationDate == null)\n  {\n    return 0;\n  }\n  \n  var days = (expirationDate.Value - effectiveDate.Value).Days;\n  return Math.Max(0, days);"
                    }
                }
            }
        };

        // 4. Policy Set Group
        var policySetGroup = new DataGroup
        {
            Id = "dg-policyset",
            Name = "Policy Set",
            Description = "Policy details and premium calculations",
            OrderIndex = 3,
            IsRepeatable = false,
            DataPoints = new List<DataPoint>
            {
                new DataPoint
                {
                    Id = "dp-policy-prefix",
                    Name = "Policy Prefix",
                    DataType = "String",
                    OrderIndex = 0,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Basic",
                        DefaultValue = "AUTO",
                        MaxLength = 10
                    }
                },
                new DataPoint
                {
                    Id = "dp-policy-sequence",
                    Name = "Policy Sequence",
                    DataType = "Integer",
                    OrderIndex = 1,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Basic",
                        MinValue = 1
                    }
                },
                new DataPoint
                {
                    Id = "dp-policy-number",
                    Name = "Policy Number",
                    Description = "Calculated: Formatted policy number with prefix and padded sequence",
                    DataType = "String",
                    OrderIndex = 2,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Calculated"
                    },
                    Calculation = new DataPointCalculation
                    {
                        Inputs = new List<ScriptInput>
                        {
                            new ScriptInput
                            {
                                DataPointId = "dp-policy-prefix",
                                DataPointName = "Policy Prefix",
                                DataType = "String",
                                Alias = "prefix"
                            },
                            new ScriptInput
                            {
                                DataPointId = "dp-policy-sequence",
                                DataPointName = "Policy Sequence",
                                DataType = "Integer",
                                Alias = "sequence"
                            }
                        },
                        Script = "  // Format policy number: PREFIX-NNNNNN\n  var prefixValue = prefix ?? \"AUTO\";\n  var sequenceValue = sequence ?? 0;\n  \n  // Pad sequence to 6 digits\n  var paddedSequence = sequenceValue.ToString().PadLeft(6, '0');\n  return $\"{prefixValue}-{paddedSequence}\";"
                    }
                },
                new DataPoint
                {
                    Id = "dp-policy-premium",
                    Name = "Base Premium",
                    DataType = "Money",
                    OrderIndex = 3,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Basic",
                        DecimalPlaces = 2
                    }
                },
                new DataPoint
                {
                    Id = "dp-policy-taxes",
                    Name = "Taxes & Fees",
                    DataType = "Money",
                    OrderIndex = 4,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Basic",
                        DecimalPlaces = 2
                    }
                },
                new DataPoint
                {
                    Id = "dp-policy-total",
                    Name = "Total Premium",
                    Description = "Calculated: Sum of Base Premium and Taxes & Fees",
                    DataType = "Money",
                    OrderIndex = 5,
                    Configuration = new DataPointConfiguration
                    {
                        Mode = "Calculated",
                        DecimalPlaces = 2
                    },
                    Calculation = new DataPointCalculation
                    {
                        Inputs = new List<ScriptInput>
                        {
                            new ScriptInput
                            {
                                DataPointId = "dp-policy-premium",
                                DataPointName = "Base Premium",
                                DataType = "Money",
                                Alias = "basePremium"
                            },
                            new ScriptInput
                            {
                                DataPointId = "dp-policy-taxes",
                                DataPointName = "Taxes & Fees",
                                DataType = "Money",
                                Alias = "taxes"
                            }
                        },
                        Script = "  // Calculate total premium with null handling\n  var premium = basePremium ?? 0m;\n  var taxAmount = taxes ?? 0m;\n  return premium + taxAmount;"
                    }
                }
            }
        };

        dataStore.DataGroups.Add(accountGroup);
        dataStore.DataGroups.Add(producerGroup);
        dataStore.DataGroups.Add(businessGroup);
        dataStore.DataGroups.Add(policySetGroup);

        return dataStore;
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

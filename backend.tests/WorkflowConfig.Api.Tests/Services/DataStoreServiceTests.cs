using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using Xunit;
using FluentAssertions;
using WorkflowConfig.Api.Models;
using WorkflowConfig.Api.Services;

namespace WorkflowConfig.Api.Tests.Services
{
    public class DataStoreServiceTests : IDisposable
    {
        private readonly string _testPath;
        private readonly DataStoreService _service;

        public DataStoreServiceTests()
        {
            _testPath = Path.Combine(Path.GetTempPath(), $"test-datastore-{Guid.NewGuid()}");
            Directory.CreateDirectory(_testPath);
            _service = new DataStoreService(_testPath);
        }

        public void Dispose()
        {
            if (Directory.Exists(_testPath))
            {
                Directory.Delete(_testPath, true);
            }
        }

        [Fact]
        public void GetAllDataStores_WhenEmpty_ReturnsEmptyList()
        {
            // Act
            var result = _service.GetAllDataStores();

            // Assert
            result.Should().NotBeNull();
            result.Should().BeEmpty();
        }

        [Fact]
        public void CreateDataStore_CreatesNewDataStore()
        {
            // Arrange
            var dataStore = new DataStore
            {
                Name = "Test Store",
                Description = "Test Description",
                NoOfTimesUsed = 0,
                DataGroups = new List<DataGroup>()
            };

            // Act
            var result = _service.CreateDataStore(dataStore);

            // Assert
            result.Should().NotBeNull();
            result.Id.Should().NotBeNullOrEmpty();
            result.Name.Should().Be("Test Store");
            result.Description.Should().Be("Test Description");
            result.NoOfTimesUsed.Should().Be(0);
        }

        [Fact]
        public void CreateDataStore_PersistsToFile()
        {
            // Arrange
            var dataStore = new DataStore
            {
                Name = "Persistent Store",
                Description = "Should persist",
                NoOfTimesUsed = 0,
                DataGroups = new List<DataGroup>()
            };

            // Act
            var created = _service.CreateDataStore(dataStore);
            var retrieved = _service.GetDataStoreById(created.Id);

            // Assert
            retrieved.Should().NotBeNull();
            retrieved!.Name.Should().Be("Persistent Store");
            retrieved.Description.Should().Be("Should persist");
        }

        [Fact]
        public void GetDataStoreById_ReturnsCorrectDataStore()
        {
            // Arrange
            var dataStore = new DataStore
            {
                Name = "Findable Store",
                Description = "Can be found",
                NoOfTimesUsed = 5,
                DataGroups = new List<DataGroup>()
            };
            var created = _service.CreateDataStore(dataStore);

            // Act
            var result = _service.GetDataStoreById(created.Id);

            // Assert
            result.Should().NotBeNull();
            result!.Id.Should().Be(created.Id);
            result.Name.Should().Be("Findable Store");
            result.NoOfTimesUsed.Should().Be(5);
        }

        [Fact]
        public void GetDataStoreById_WhenNotFound_ReturnsNull()
        {
            // Act
            var result = _service.GetDataStoreById("nonexistent-id");

            // Assert
            result.Should().BeNull();
        }

        [Fact]
        public void UpdateDataStore_UpdatesExistingDataStore()
        {
            // Arrange
            var dataStore = new DataStore
            {
                Name = "Original Name",
                Description = "Original Description",
                NoOfTimesUsed = 0,
                DataGroups = new List<DataGroup>()
            };
            var created = _service.CreateDataStore(dataStore);

            var updated = new DataStore
            {
                Id = created.Id,
                Name = "Updated Name",
                Description = "Updated Description",
                NoOfTimesUsed = 10,
                DataGroups = new List<DataGroup>()
            };

            // Act
            var result = _service.UpdateDataStore(created.Id, updated);

            // Assert
            result.Should().NotBeNull();
            result!.Name.Should().Be("Updated Name");
            result.Description.Should().Be("Updated Description");
            result.NoOfTimesUsed.Should().Be(10);

            var retrieved = _service.GetDataStoreById(created.Id);
            retrieved!.Name.Should().Be("Updated Name");
        }

        [Fact]
        public void UpdateDataStore_WhenNotFound_ReturnsNull()
        {
            // Arrange
            var dataStore = new DataStore
            {
                Name = "Test",
                Description = "Test",
                NoOfTimesUsed = 0,
                DataGroups = new List<DataGroup>()
            };

            // Act
            var result = _service.UpdateDataStore("nonexistent-id", dataStore);

            // Assert
            result.Should().BeNull();
        }

        [Fact]
        public void DeleteDataStore_RemovesDataStore()
        {
            // Arrange
            var dataStore = new DataStore
            {
                Name = "To Delete",
                Description = "Will be deleted",
                NoOfTimesUsed = 0,
                DataGroups = new List<DataGroup>()
            };
            var created = _service.CreateDataStore(dataStore);

            // Act
            var deleteResult = _service.DeleteDataStore(created.Id);
            var retrieved = _service.GetDataStoreById(created.Id);

            // Assert
            deleteResult.Should().BeTrue();
            retrieved.Should().BeNull();
        }

        [Fact]
        public void DeleteDataStore_WhenNotFound_ReturnsFalse()
        {
            // Act
            var result = _service.DeleteDataStore("nonexistent-id");

            // Assert
            result.Should().BeFalse();
        }

        [Fact]
        public void AddDataGroup_AddsTopLevelGroup()
        {
            // Arrange
            var dataStore = new DataStore
            {
                Name = "Test Store",
                Description = "Test",
                NoOfTimesUsed = 0,
                DataGroups = new List<DataGroup>()
            };
            var created = _service.CreateDataStore(dataStore);

            var dataGroup = new DataGroup
            {
                Name = "New Group",
                Description = "Test Group",
                DataPoints = new List<DataPoint>(),
                ChildGroups = new List<DataGroup>()
            };

            // Act
            var result = _service.AddDataGroup(created.Id, dataGroup);

            // Assert
            result.Should().NotBeNull();
            result!.Id.Should().NotBeNullOrEmpty();
            result.Name.Should().Be("New Group");
            result.OrderIndex.Should().Be(0);
            result.ParentId.Should().BeNull();

            var retrieved = _service.GetDataStoreById(created.Id);
            retrieved!.DataGroups.Should().HaveCount(1);
            retrieved.DataGroups[0].Name.Should().Be("New Group");
        }

        [Fact]
        public void AddDataGroup_AddsNestedGroup()
        {
            // Arrange
            var dataStore = new DataStore
            {
                Name = "Test Store",
                Description = "Test",
                NoOfTimesUsed = 0,
                DataGroups = new List<DataGroup>()
            };
            var created = _service.CreateDataStore(dataStore);

            var parentGroup = new DataGroup
            {
                Name = "Parent Group",
                Description = "Parent",
                DataPoints = new List<DataPoint>(),
                ChildGroups = new List<DataGroup>()
            };
            var addedParent = _service.AddDataGroup(created.Id, parentGroup);

            var childGroup = new DataGroup
            {
                Name = "Child Group",
                Description = "Child",
                DataPoints = new List<DataPoint>(),
                ChildGroups = new List<DataGroup>()
            };

            // Act
            var result = _service.AddDataGroup(created.Id, childGroup, addedParent!.Id);

            // Assert
            result.Should().NotBeNull();
            result!.Name.Should().Be("Child Group");
            result.ParentId.Should().Be(addedParent.Id);

            var retrieved = _service.GetDataStoreById(created.Id);
            retrieved!.DataGroups[0].ChildGroups.Should().HaveCount(1);
            retrieved.DataGroups[0].ChildGroups[0].Name.Should().Be("Child Group");
        }

        [Fact]
        public void AddDataPoint_AddsPointToGroup()
        {
            // Arrange
            var dataStore = new DataStore
            {
                Name = "Test Store",
                Description = "Test",
                NoOfTimesUsed = 0,
                DataGroups = new List<DataGroup>()
            };
            var created = _service.CreateDataStore(dataStore);

            var dataGroup = new DataGroup
            {
                Name = "Test Group",
                Description = "Test",
                DataPoints = new List<DataPoint>(),
                ChildGroups = new List<DataGroup>()
            };
            var addedGroup = _service.AddDataGroup(created.Id, dataGroup);

            var dataPoint = new DataPoint
            {
                Name = "Test Point",
                Description = "Test Point Description",
                DataType = "String",
                Configuration = new DataPointConfiguration
                {
                    Mode = "Basic",
                    AllowMultiLine = false
                }
            };

            // Act
            var result = _service.AddDataPoint(created.Id, addedGroup!.Id, dataPoint);

            // Assert
            result.Should().NotBeNull();
            result!.Id.Should().NotBeNullOrEmpty();
            result.Name.Should().Be("Test Point");
            result.DataType.Should().Be("String");
            result.OrderIndex.Should().Be(0);

            var retrieved = _service.GetDataStoreById(created.Id);
            retrieved!.DataGroups[0].DataPoints.Should().HaveCount(1);
            retrieved.DataGroups[0].DataPoints[0].Name.Should().Be("Test Point");
        }

        [Fact]
        public void UpdateDataGroup_UpdatesGroupProperties()
        {
            // Arrange
            var dataStore = new DataStore
            {
                Name = "Test Store",
                Description = "Test",
                NoOfTimesUsed = 0,
                DataGroups = new List<DataGroup>()
            };
            var created = _service.CreateDataStore(dataStore);

            var dataGroup = new DataGroup
            {
                Name = "Original Name",
                Description = "Original Description",
                Tag = "original-tag",
                DataPoints = new List<DataPoint>(),
                ChildGroups = new List<DataGroup>()
            };
            var addedGroup = _service.AddDataGroup(created.Id, dataGroup);

            var updatedGroup = new DataGroup
            {
                Name = "Updated Name",
                Description = "Updated Description",
                Tag = "updated-tag",
                DataPoints = new List<DataPoint>(),
                ChildGroups = new List<DataGroup>()
            };

            // Act
            var result = _service.UpdateDataGroup(created.Id, addedGroup!.Id, updatedGroup);

            // Assert
            result.Should().BeTrue();

            var retrieved = _service.GetDataStoreById(created.Id);
            retrieved!.DataGroups[0].Name.Should().Be("Updated Name");
            retrieved.DataGroups[0].Description.Should().Be("Updated Description");
            retrieved.DataGroups[0].Tag.Should().Be("updated-tag");
        }

        [Fact]
        public void UpdateDataPoint_UpdatesPointProperties()
        {
            // Arrange
            var dataStore = new DataStore
            {
                Name = "Test Store",
                Description = "Test",
                NoOfTimesUsed = 0,
                DataGroups = new List<DataGroup>()
            };
            var created = _service.CreateDataStore(dataStore);

            var dataGroup = new DataGroup
            {
                Name = "Test Group",
                Description = "Test",
                DataPoints = new List<DataPoint>(),
                ChildGroups = new List<DataGroup>()
            };
            var addedGroup = _service.AddDataGroup(created.Id, dataGroup);

            var dataPoint = new DataPoint
            {
                Name = "Original Point",
                Description = "Original",
                DataType = "String",
                Configuration = new DataPointConfiguration { Mode = "Basic", AllowMultiLine = false }
            };
            var addedPoint = _service.AddDataPoint(created.Id, addedGroup!.Id, dataPoint);

            var updatedPoint = new DataPoint
            {
                Name = "Updated Point",
                Description = "Updated",
                DataType = "Integer",
                Configuration = new DataPointConfiguration { Mode = "Advanced", AllowMultiLine = true }
            };

            // Act
            var result = _service.UpdateDataPoint(created.Id, addedPoint!.Id, updatedPoint);

            // Assert
            result.Should().BeTrue();

            var retrieved = _service.GetDataStoreById(created.Id);
            var retrievedPoint = retrieved!.DataGroups[0].DataPoints[0];
            retrievedPoint.Name.Should().Be("Updated Point");
            retrievedPoint.Description.Should().Be("Updated");
            retrievedPoint.DataType.Should().Be("Integer");
            retrievedPoint.Configuration.Mode.Should().Be("Advanced");
        }

        [Fact]
        public void DeleteDataGroup_RemovesGroup()
        {
            // Arrange
            var dataStore = new DataStore
            {
                Name = "Test Store",
                Description = "Test",
                NoOfTimesUsed = 0,
                DataGroups = new List<DataGroup>()
            };
            var created = _service.CreateDataStore(dataStore);

            var dataGroup = new DataGroup
            {
                Name = "To Delete",
                Description = "Test",
                DataPoints = new List<DataPoint>(),
                ChildGroups = new List<DataGroup>()
            };
            var addedGroup = _service.AddDataGroup(created.Id, dataGroup);

            // Act
            var result = _service.DeleteDataGroup(created.Id, addedGroup!.Id);

            // Assert
            result.Should().BeTrue();

            var retrieved = _service.GetDataStoreById(created.Id);
            retrieved!.DataGroups.Should().BeEmpty();
        }

        [Fact]
        public void DeleteDataPoint_RemovesPoint()
        {
            // Arrange
            var dataStore = new DataStore
            {
                Name = "Test Store",
                Description = "Test",
                NoOfTimesUsed = 0,
                DataGroups = new List<DataGroup>()
            };
            var created = _service.CreateDataStore(dataStore);

            var dataGroup = new DataGroup
            {
                Name = "Test Group",
                Description = "Test",
                DataPoints = new List<DataPoint>(),
                ChildGroups = new List<DataGroup>()
            };
            var addedGroup = _service.AddDataGroup(created.Id, dataGroup);

            var dataPoint = new DataPoint
            {
                Name = "To Delete",
                Description = "Test",
                DataType = "String",
                Configuration = new DataPointConfiguration { Mode = "Basic", AllowMultiLine = false }
            };
            var addedPoint = _service.AddDataPoint(created.Id, addedGroup!.Id, dataPoint);

            // Act
            var result = _service.DeleteDataPoint(created.Id, addedPoint!.Id);

            // Assert
            result.Should().BeTrue();

            var retrieved = _service.GetDataStoreById(created.Id);
            retrieved!.DataGroups[0].DataPoints.Should().BeEmpty();
        }

        [Fact]
        public void GetAllDataStores_ReturnsMultipleDataStores()
        {
            // Arrange
            var dataStore1 = new DataStore
            {
                Name = "Store 1",
                Description = "First store",
                NoOfTimesUsed = 0,
                DataGroups = new List<DataGroup>()
            };
            var dataStore2 = new DataStore
            {
                Name = "Store 2",
                Description = "Second store",
                NoOfTimesUsed = 5,
                DataGroups = new List<DataGroup>()
            };

            _service.CreateDataStore(dataStore1);
            _service.CreateDataStore(dataStore2);

            // Act
            var result = _service.GetAllDataStores();

            // Assert
            result.Should().HaveCount(2);
            result.Should().Contain(ds => ds.Name == "Store 1");
            result.Should().Contain(ds => ds.Name == "Store 2");
        }

        [Fact]
        public void CalculationWithZeroInputs_SavesAndLoadsCorrectly()
        {
            // Arrange
            var dataStore = new DataStore
            {
                Name = "Test Store",
                Description = "Test",
                NoOfTimesUsed = 0,
                DataGroups = new List<DataGroup>()
            };
            var created = _service.CreateDataStore(dataStore);

            var dataGroup = new DataGroup
            {
                Name = "Constants",
                Description = "Constant values",
                DataPoints = new List<DataPoint>(),
                ChildGroups = new List<DataGroup>()
            };
            var addedGroup = _service.AddDataGroup(created.Id, dataGroup);

            var constantPoint = new DataPoint
            {
                Name = "Pi Constant",
                Description = "Mathematical constant",
                DataType = "Decimal",
                Configuration = new DataPointConfiguration
                {
                    Mode = "Calculated",
                    DecimalPlaces = 5
                },
                Calculation = new DataPointCalculation
                {
                    Inputs = new List<ScriptInput>(),
                    Script = "return 3.14159m;"
                }
            };

            // Act
            var addedPoint = _service.AddDataPoint(created.Id, addedGroup!.Id, constantPoint);
            
            // Update to trigger .cs file generation
            var updatedDataStore = _service.GetDataStoreById(created.Id);
            _service.UpdateDataStore(created.Id, updatedDataStore!);
            
            // Retrieve to verify script is loaded from .cs file
            var retrieved = _service.GetDataStoreById(created.Id);

            // Assert
            retrieved.Should().NotBeNull();
            var retrievedPoint = retrieved!.DataGroups[0].DataPoints[0];
            retrievedPoint.Calculation.Should().NotBeNull();
            retrievedPoint.Calculation!.Inputs.Should().BeEmpty();
            retrievedPoint.Calculation.Script.Should().Be("return 3.14159m;");

            // Verify .cs file exists
            var csFilePath = Path.Combine(_testPath, "datastores", created.Id, "calculations", addedPoint!.Id + ".cs");
            File.Exists(csFilePath).Should().BeTrue();
            
            var csContent = File.ReadAllText(csFilePath);
            csContent.Should().Contain("return 3.14159m;");
            csContent.Should().Contain("public decimal Calculate()");
        }
    }
}

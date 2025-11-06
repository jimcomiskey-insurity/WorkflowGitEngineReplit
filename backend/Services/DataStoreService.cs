using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using WorkflowConfig.Api.Models;

namespace WorkflowConfig.Api.Services
{
    public class DataStoreService
    {
        private readonly string _dataPath;
        private readonly string _dataStoreListPath;
        private readonly string _dataStoresDirectory;

        public DataStoreService(string basePath)
        {
            _dataPath = basePath;
            _dataStoreListPath = Path.Combine(_dataPath, "datastore-list.json");
            _dataStoresDirectory = Path.Combine(_dataPath, "datastores");
            
            Directory.CreateDirectory(_dataStoresDirectory);
        }

        public List<DataStore> GetAllDataStores()
        {
            if (!File.Exists(_dataStoreListPath))
            {
                return new List<DataStore>();
            }

            var listJson = File.ReadAllText(_dataStoreListPath);
            var dataStoreList = JsonSerializer.Deserialize<List<DataStoreListItem>>(listJson) ?? new List<DataStoreListItem>();

            var dataStores = new List<DataStore>();
            foreach (var item in dataStoreList)
            {
                var dataStore = GetDataStoreById(item.Id);
                if (dataStore != null)
                {
                    dataStores.Add(dataStore);
                }
            }

            return dataStores;
        }

        public DataStore? GetDataStoreById(string id)
        {
            var dataStorePath = Path.Combine(_dataStoresDirectory, $"{id}.json");
            if (!File.Exists(dataStorePath))
            {
                return null;
            }

            var json = File.ReadAllText(dataStorePath);
            return JsonSerializer.Deserialize<DataStore>(json);
        }

        public DataStore CreateDataStore(DataStore dataStore)
        {
            if (string.IsNullOrEmpty(dataStore.Id))
            {
                dataStore.Id = Guid.NewGuid().ToString();
            }

            var dataStorePath = Path.Combine(_dataStoresDirectory, $"{dataStore.Id}.json");
            var json = JsonSerializer.Serialize(dataStore, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(dataStorePath, json);

            UpdateDataStoreList(dataStore);
            return dataStore;
        }

        public DataStore? UpdateDataStore(string id, DataStore updatedDataStore)
        {
            var existingDataStore = GetDataStoreById(id);
            if (existingDataStore == null)
            {
                return null;
            }

            updatedDataStore.Id = id;
            var dataStorePath = Path.Combine(_dataStoresDirectory, $"{id}.json");
            var json = JsonSerializer.Serialize(updatedDataStore, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(dataStorePath, json);

            UpdateDataStoreList(updatedDataStore);
            return updatedDataStore;
        }

        public bool DeleteDataStore(string id)
        {
            var dataStorePath = Path.Combine(_dataStoresDirectory, $"{id}.json");
            if (!File.Exists(dataStorePath))
            {
                return false;
            }

            File.Delete(dataStorePath);
            RemoveFromDataStoreList(id);
            return true;
        }

        public DataGroup? AddDataGroup(string dataStoreId, DataGroup dataGroup, string? parentGroupId = null)
        {
            var dataStore = GetDataStoreById(dataStoreId);
            if (dataStore == null)
            {
                return null;
            }

            if (string.IsNullOrEmpty(dataGroup.Id))
            {
                dataGroup.Id = Guid.NewGuid().ToString();
            }

            dataGroup.ParentId = parentGroupId;

            if (string.IsNullOrEmpty(parentGroupId))
            {
                dataGroup.OrderIndex = dataStore.DataGroups.Count;
                dataStore.DataGroups.Add(dataGroup);
            }
            else
            {
                var parentGroup = FindDataGroup(dataStore.DataGroups, parentGroupId);
                if (parentGroup == null)
                {
                    return null;
                }
                dataGroup.OrderIndex = parentGroup.ChildGroups.Count;
                parentGroup.ChildGroups.Add(dataGroup);
            }

            UpdateDataStore(dataStoreId, dataStore);
            return dataGroup;
        }

        public DataPoint? AddDataPoint(string dataStoreId, string dataGroupId, DataPoint dataPoint)
        {
            var dataStore = GetDataStoreById(dataStoreId);
            if (dataStore == null)
            {
                return null;
            }

            if (string.IsNullOrEmpty(dataPoint.Id))
            {
                dataPoint.Id = Guid.NewGuid().ToString();
            }

            var dataGroup = FindDataGroup(dataStore.DataGroups, dataGroupId);
            if (dataGroup == null)
            {
                return null;
            }

            dataPoint.OrderIndex = dataGroup.DataPoints.Count;
            dataGroup.DataPoints.Add(dataPoint);

            UpdateDataStore(dataStoreId, dataStore);
            return dataPoint;
        }

        public bool UpdateDataGroup(string dataStoreId, string dataGroupId, DataGroup updatedDataGroup)
        {
            var dataStore = GetDataStoreById(dataStoreId);
            if (dataStore == null)
            {
                return false;
            }

            var dataGroup = FindDataGroup(dataStore.DataGroups, dataGroupId);
            if (dataGroup == null)
            {
                return false;
            }

            dataGroup.Name = updatedDataGroup.Name;
            dataGroup.Description = updatedDataGroup.Description;
            dataGroup.Tag = updatedDataGroup.Tag;

            UpdateDataStore(dataStoreId, dataStore);
            return true;
        }

        public bool UpdateDataPoint(string dataStoreId, string dataPointId, DataPoint updatedDataPoint)
        {
            var dataStore = GetDataStoreById(dataStoreId);
            if (dataStore == null)
            {
                return false;
            }

            var dataPoint = FindDataPoint(dataStore.DataGroups, dataPointId);
            if (dataPoint == null)
            {
                return false;
            }

            dataPoint.Name = updatedDataPoint.Name;
            dataPoint.Description = updatedDataPoint.Description;
            dataPoint.Tag = updatedDataPoint.Tag;
            dataPoint.DataType = updatedDataPoint.DataType;
            dataPoint.Configuration = updatedDataPoint.Configuration;

            UpdateDataStore(dataStoreId, dataStore);
            return true;
        }

        public bool DeleteDataGroup(string dataStoreId, string dataGroupId)
        {
            var dataStore = GetDataStoreById(dataStoreId);
            if (dataStore == null)
            {
                return false;
            }

            if (RemoveDataGroup(dataStore.DataGroups, dataGroupId))
            {
                UpdateDataStore(dataStoreId, dataStore);
                return true;
            }

            return false;
        }

        public bool DeleteDataPoint(string dataStoreId, string dataPointId)
        {
            var dataStore = GetDataStoreById(dataStoreId);
            if (dataStore == null)
            {
                return false;
            }

            if (RemoveDataPoint(dataStore.DataGroups, dataPointId))
            {
                UpdateDataStore(dataStoreId, dataStore);
                return true;
            }

            return false;
        }

        private void UpdateDataStoreList(DataStore dataStore)
        {
            var dataStoreList = new List<DataStoreListItem>();
            
            if (File.Exists(_dataStoreListPath))
            {
                var listJson = File.ReadAllText(_dataStoreListPath);
                dataStoreList = JsonSerializer.Deserialize<List<DataStoreListItem>>(listJson) ?? new List<DataStoreListItem>();
            }

            var existingItem = dataStoreList.FirstOrDefault(ds => ds.Id == dataStore.Id);
            if (existingItem != null)
            {
                existingItem.Name = dataStore.Name;
                existingItem.Description = dataStore.Description;
                existingItem.NoOfTimesUsed = dataStore.NoOfTimesUsed;
            }
            else
            {
                dataStoreList.Add(new DataStoreListItem
                {
                    Id = dataStore.Id,
                    Name = dataStore.Name,
                    Description = dataStore.Description,
                    NoOfTimesUsed = dataStore.NoOfTimesUsed
                });
            }

            var json = JsonSerializer.Serialize(dataStoreList, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_dataStoreListPath, json);
        }

        private void RemoveFromDataStoreList(string id)
        {
            if (!File.Exists(_dataStoreListPath))
            {
                return;
            }

            var listJson = File.ReadAllText(_dataStoreListPath);
            var dataStoreList = JsonSerializer.Deserialize<List<DataStoreListItem>>(listJson) ?? new List<DataStoreListItem>();
            
            dataStoreList.RemoveAll(ds => ds.Id == id);

            var json = JsonSerializer.Serialize(dataStoreList, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_dataStoreListPath, json);
        }

        private DataGroup? FindDataGroup(List<DataGroup> dataGroups, string id)
        {
            foreach (var group in dataGroups)
            {
                if (group.Id == id)
                {
                    return group;
                }

                var found = FindDataGroup(group.ChildGroups, id);
                if (found != null)
                {
                    return found;
                }
            }

            return null;
        }

        private DataPoint? FindDataPoint(List<DataGroup> dataGroups, string id)
        {
            foreach (var group in dataGroups)
            {
                var dataPoint = group.DataPoints.FirstOrDefault(dp => dp.Id == id);
                if (dataPoint != null)
                {
                    return dataPoint;
                }

                var found = FindDataPoint(group.ChildGroups, id);
                if (found != null)
                {
                    return found;
                }
            }

            return null;
        }

        private bool RemoveDataGroup(List<DataGroup> dataGroups, string id)
        {
            for (int i = 0; i < dataGroups.Count; i++)
            {
                if (dataGroups[i].Id == id)
                {
                    dataGroups.RemoveAt(i);
                    return true;
                }

                if (RemoveDataGroup(dataGroups[i].ChildGroups, id))
                {
                    return true;
                }
            }

            return false;
        }

        private bool RemoveDataPoint(List<DataGroup> dataGroups, string id)
        {
            foreach (var group in dataGroups)
            {
                var dataPoint = group.DataPoints.FirstOrDefault(dp => dp.Id == id);
                if (dataPoint != null)
                {
                    group.DataPoints.Remove(dataPoint);
                    return true;
                }

                if (RemoveDataPoint(group.ChildGroups, id))
                {
                    return true;
                }
            }

            return false;
        }

        private class DataStoreListItem
        {
            public string Id { get; set; } = string.Empty;
            public string Name { get; set; } = string.Empty;
            public string? Description { get; set; }
            public int NoOfTimesUsed { get; set; }
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using WorkflowConfig.Api.Models;
using WorkflowConfig.Api.Services;
using System.Collections.Generic;
using NSwag.Annotations;

namespace WorkflowConfig.Api.Controllers
{
    [ApiController]
    [Route("api/users/{userId}/programs/{programId}/[controller]")]
    public class DataStoresController : ControllerBase
    {
        private readonly string _basePath;
        private readonly GitService _gitService;

        public DataStoresController(GitService gitService)
        {
            _basePath = "/home/runner/workflow-data";
            _gitService = gitService;
        }

        private DataStoreService GetUserService(string userId)
        {
            var userRepoPath = System.IO.Path.Combine(_basePath, "user-repos", userId);
            return new DataStoreService(userRepoPath);
        }

        [HttpGet]
        [OpenApiOperation("GetAllDataStores")]
        public ActionResult<List<DataStore>> GetAllDataStores(string userId, string programId)
        {
            var dataStores = _gitService.ReadDataStoresWithGitStatus(programId, userId);
            return Ok(dataStores);
        }

        [HttpGet("{id}")]
        [OpenApiOperation("GetDataStoreById")]
        public ActionResult<DataStore> GetDataStoreById(string userId, string programId, string id)
        {
            var service = GetUserService(userId);
            var dataStore = service.GetDataStoreById(id);
            
            if (dataStore == null)
            {
                return NotFound();
            }

            return Ok(dataStore);
        }

        [HttpPost]
        [OpenApiOperation("CreateDataStore")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(DataStore))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<DataStore> CreateDataStore(string userId, string programId, [FromBody] DataStore dataStore)
        {
            if (string.IsNullOrEmpty(dataStore.Id))
            {
                dataStore.Id = System.Guid.NewGuid().ToString();
            }
            
            var dataStores = _gitService.ReadDataStoresWithGitStatus(programId, userId);
            dataStores.Add(dataStore);
            _gitService.WriteDataStores(programId, userId, dataStores);
            
            // Reload with Git status
            var refreshedDataStores = _gitService.ReadDataStoresWithGitStatus(programId, userId);
            var createdDataStore = refreshedDataStores.FirstOrDefault(ds => ds.Id == dataStore.Id);
            
            return CreatedAtAction(nameof(GetDataStoreById), new { userId, programId, id = dataStore.Id }, createdDataStore);
        }

        [HttpPut("{id}")]
        [OpenApiOperation("UpdateDataStore")]
        public ActionResult<DataStore> UpdateDataStore(string userId, string programId, string id, [FromBody] DataStore dataStore)
        {
            var dataStores = _gitService.ReadDataStoresWithGitStatus(programId, userId);
            var existingIndex = dataStores.FindIndex(ds => ds.Id == id);
            
            if (existingIndex == -1)
            {
                return NotFound();
            }

            dataStore.Id = id;
            dataStores[existingIndex] = dataStore;
            _gitService.WriteDataStores(programId, userId, dataStores);

            // Reload with Git status
            var refreshedDataStores = _gitService.ReadDataStoresWithGitStatus(programId, userId);
            var updatedDataStore = refreshedDataStores.FirstOrDefault(ds => ds.Id == id);

            return Ok(updatedDataStore);
        }

        [HttpDelete("{id}")]
        [OpenApiOperation("DeleteDataStore")]
        public ActionResult DeleteDataStore(string userId, string programId, string id)
        {
            var dataStores = _gitService.ReadDataStoresWithGitStatus(programId, userId);
            var existingDataStore = dataStores.FirstOrDefault(ds => ds.Id == id);
            
            if (existingDataStore == null)
            {
                return NotFound();
            }

            dataStores.Remove(existingDataStore);
            _gitService.WriteDataStores(programId, userId, dataStores);

            return NoContent();
        }

        [HttpPost("{dataStoreId}/datagroups")]
        [OpenApiOperation("AddDataGroup")]
        public ActionResult<DataGroup> AddDataGroup(
            string userId, 
            string programId,
            string dataStoreId, 
            [FromBody] DataGroup dataGroup,
            [FromQuery] string? parentGroupId = null)
        {
            var dataStores = _gitService.ReadDataStoresWithGitStatus(programId, userId);
            var dataStore = dataStores.FirstOrDefault(ds => ds.Id == dataStoreId);
            
            if (dataStore == null)
            {
                return NotFound();
            }

            if (string.IsNullOrEmpty(dataGroup.Id))
            {
                dataGroup.Id = System.Guid.NewGuid().ToString();
            }

            if (string.IsNullOrEmpty(parentGroupId))
            {
                dataStore.DataGroups.Add(dataGroup);
            }
            else
            {
                var parentGroup = FindDataGroup(dataStore.DataGroups, parentGroupId);
                if (parentGroup == null)
                {
                    return NotFound("Parent group not found");
                }
                parentGroup.ChildGroups.Add(dataGroup);
            }

            _gitService.WriteDataStores(programId, userId, dataStores);
            return Ok(dataGroup);
        }

        private DataGroup? FindDataGroup(List<DataGroup> groups, string groupId)
        {
            foreach (var group in groups)
            {
                if (group.Id == groupId) return group;
                var found = FindDataGroup(group.ChildGroups, groupId);
                if (found != null) return found;
            }
            return null;
        }

        [HttpPost("{dataStoreId}/datagroups/{dataGroupId}/datapoints")]
        [OpenApiOperation("AddDataPoint")]
        public ActionResult<DataPoint> AddDataPoint(
            string userId, 
            string programId,
            string dataStoreId, 
            string dataGroupId, 
            [FromBody] DataPoint dataPoint)
        {
            var dataStores = _gitService.ReadDataStoresWithGitStatus(programId, userId);
            var dataStore = dataStores.FirstOrDefault(ds => ds.Id == dataStoreId);
            
            if (dataStore == null)
            {
                return NotFound("DataStore not found");
            }

            var dataGroup = FindDataGroup(dataStore.DataGroups, dataGroupId);
            if (dataGroup == null)
            {
                return NotFound("DataGroup not found");
            }

            if (string.IsNullOrEmpty(dataPoint.Id))
            {
                dataPoint.Id = System.Guid.NewGuid().ToString();
            }

            dataGroup.DataPoints.Add(dataPoint);
            _gitService.WriteDataStores(programId, userId, dataStores);

            return Ok(dataPoint);
        }

        [HttpPut("{dataStoreId}/datagroups/{dataGroupId}")]
        [OpenApiOperation("UpdateDataGroup")]
        public ActionResult UpdateDataGroup(
            string userId, 
            string programId,
            string dataStoreId, 
            string dataGroupId, 
            [FromBody] DataGroup dataGroup)
        {
            var dataStores = _gitService.ReadDataStoresWithGitStatus(programId, userId);
            var dataStore = dataStores.FirstOrDefault(ds => ds.Id == dataStoreId);
            
            if (dataStore == null)
            {
                return NotFound("DataStore not found");
            }

            var existingGroup = FindDataGroup(dataStore.DataGroups, dataGroupId);
            if (existingGroup == null)
            {
                return NotFound("DataGroup not found");
            }

            existingGroup.Name = dataGroup.Name;
            existingGroup.Description = dataGroup.Description;
            existingGroup.Tag = dataGroup.Tag;
            existingGroup.OrderIndex = dataGroup.OrderIndex;

            _gitService.WriteDataStores(programId, userId, dataStores);
            return NoContent();
        }

        [HttpPut("{dataStoreId}/datapoints/{dataPointId}")]
        [OpenApiOperation("UpdateDataPoint")]
        public ActionResult UpdateDataPoint(
            string userId, 
            string programId,
            string dataStoreId, 
            string dataPointId, 
            [FromBody] DataPoint dataPoint)
        {
            var dataStores = _gitService.ReadDataStoresWithGitStatus(programId, userId);
            var dataStore = dataStores.FirstOrDefault(ds => ds.Id == dataStoreId);
            
            if (dataStore == null)
            {
                return NotFound("DataStore not found");
            }

            var existingPoint = FindDataPoint(dataStore.DataGroups, dataPointId);
            if (existingPoint == null)
            {
                return NotFound("DataPoint not found");
            }

            existingPoint.Name = dataPoint.Name;
            existingPoint.Description = dataPoint.Description;
            existingPoint.Tag = dataPoint.Tag;
            existingPoint.DataType = dataPoint.DataType;
            existingPoint.OrderIndex = dataPoint.OrderIndex;
            existingPoint.Configuration = dataPoint.Configuration;
            existingPoint.Calculation = dataPoint.Calculation;

            _gitService.WriteDataStores(programId, userId, dataStores);
            return NoContent();
        }

        private DataPoint? FindDataPoint(List<DataGroup> groups, string dataPointId)
        {
            foreach (var group in groups)
            {
                var point = group.DataPoints.FirstOrDefault(dp => dp.Id == dataPointId);
                if (point != null) return point;
                
                var foundInChild = FindDataPoint(group.ChildGroups, dataPointId);
                if (foundInChild != null) return foundInChild;
            }
            return null;
        }

        [HttpDelete("{dataStoreId}/datagroups/{dataGroupId}")]
        [OpenApiOperation("DeleteDataGroup")]
        public ActionResult DeleteDataGroup(string userId, string programId, string dataStoreId, string dataGroupId)
        {
            var dataStores = _gitService.ReadDataStoresWithGitStatus(programId, userId);
            var dataStore = dataStores.FirstOrDefault(ds => ds.Id == dataStoreId);
            
            if (dataStore == null)
            {
                return NotFound("DataStore not found");
            }

            if (!RemoveDataGroup(dataStore.DataGroups, dataGroupId))
            {
                return NotFound("DataGroup not found");
            }

            _gitService.WriteDataStores(programId, userId, dataStores);
            return NoContent();
        }

        private bool RemoveDataGroup(List<DataGroup> groups, string groupId)
        {
            for (int i = 0; i < groups.Count; i++)
            {
                if (groups[i].Id == groupId)
                {
                    groups.RemoveAt(i);
                    return true;
                }
                
                if (RemoveDataGroup(groups[i].ChildGroups, groupId))
                {
                    return true;
                }
            }
            return false;
        }

        [HttpDelete("{dataStoreId}/datapoints/{dataPointId}")]
        [OpenApiOperation("DeleteDataPoint")]
        public ActionResult DeleteDataPoint(string userId, string programId, string dataStoreId, string dataPointId)
        {
            var dataStores = _gitService.ReadDataStoresWithGitStatus(programId, userId);
            var dataStore = dataStores.FirstOrDefault(ds => ds.Id == dataStoreId);
            
            if (dataStore == null)
            {
                return NotFound("DataStore not found");
            }

            if (!RemoveDataPoint(dataStore.DataGroups, dataPointId))
            {
                return NotFound("DataPoint not found");
            }

            _gitService.WriteDataStores(programId, userId, dataStores);
            return NoContent();
        }

        private bool RemoveDataPoint(List<DataGroup> groups, string dataPointId)
        {
            foreach (var group in groups)
            {
                var point = group.DataPoints.FirstOrDefault(dp => dp.Id == dataPointId);
                if (point != null)
                {
                    group.DataPoints.Remove(point);
                    return true;
                }
                
                if (RemoveDataPoint(group.ChildGroups, dataPointId))
                {
                    return true;
                }
            }
            return false;
        }
    }
}

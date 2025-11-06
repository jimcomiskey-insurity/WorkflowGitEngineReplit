using Microsoft.AspNetCore.Mvc;
using WorkflowConfig.Api.Models;
using WorkflowConfig.Api.Services;
using System.Collections.Generic;

namespace WorkflowConfig.Api.Controllers
{
    [ApiController]
    [Route("api/users/{userId}/[controller]")]
    public class DataStoresController : ControllerBase
    {
        private readonly string _basePath;

        public DataStoresController()
        {
            _basePath = "/home/runner/workflow-data";
        }

        private DataStoreService GetUserService(string userId)
        {
            var userRepoPath = System.IO.Path.Combine(_basePath, "repositories", userId);
            return new DataStoreService(userRepoPath);
        }

        [HttpGet]
        public ActionResult<List<DataStore>> GetAllDataStores(string userId)
        {
            var service = GetUserService(userId);
            var dataStores = service.GetAllDataStores();
            return Ok(dataStores);
        }

        [HttpGet("{id}")]
        public ActionResult<DataStore> GetDataStoreById(string userId, string id)
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
        public ActionResult<DataStore> CreateDataStore(string userId, [FromBody] DataStore dataStore)
        {
            var service = GetUserService(userId);
            var createdDataStore = service.CreateDataStore(dataStore);
            return CreatedAtAction(nameof(GetDataStoreById), new { userId, id = createdDataStore.Id }, createdDataStore);
        }

        [HttpPut("{id}")]
        public ActionResult<DataStore> UpdateDataStore(string userId, string id, [FromBody] DataStore dataStore)
        {
            var service = GetUserService(userId);
            var updatedDataStore = service.UpdateDataStore(id, dataStore);
            
            if (updatedDataStore == null)
            {
                return NotFound();
            }

            return Ok(updatedDataStore);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteDataStore(string userId, string id)
        {
            var service = GetUserService(userId);
            var result = service.DeleteDataStore(id);
            
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost("{dataStoreId}/datagroups")]
        public ActionResult<DataGroup> AddDataGroup(
            string userId, 
            string dataStoreId, 
            [FromBody] DataGroup dataGroup,
            [FromQuery] string? parentGroupId = null)
        {
            var service = GetUserService(userId);
            var createdDataGroup = service.AddDataGroup(dataStoreId, dataGroup, parentGroupId);
            
            if (createdDataGroup == null)
            {
                return NotFound();
            }

            return Ok(createdDataGroup);
        }

        [HttpPost("{dataStoreId}/datagroups/{dataGroupId}/datapoints")]
        public ActionResult<DataPoint> AddDataPoint(
            string userId, 
            string dataStoreId, 
            string dataGroupId, 
            [FromBody] DataPoint dataPoint)
        {
            var service = GetUserService(userId);
            var createdDataPoint = service.AddDataPoint(dataStoreId, dataGroupId, dataPoint);
            
            if (createdDataPoint == null)
            {
                return NotFound();
            }

            return Ok(createdDataPoint);
        }

        [HttpPut("{dataStoreId}/datagroups/{dataGroupId}")]
        public ActionResult UpdateDataGroup(
            string userId, 
            string dataStoreId, 
            string dataGroupId, 
            [FromBody] DataGroup dataGroup)
        {
            var service = GetUserService(userId);
            var result = service.UpdateDataGroup(dataStoreId, dataGroupId, dataGroup);
            
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPut("{dataStoreId}/datapoints/{dataPointId}")]
        public ActionResult UpdateDataPoint(
            string userId, 
            string dataStoreId, 
            string dataPointId, 
            [FromBody] DataPoint dataPoint)
        {
            var service = GetUserService(userId);
            var result = service.UpdateDataPoint(dataStoreId, dataPointId, dataPoint);
            
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{dataStoreId}/datagroups/{dataGroupId}")]
        public ActionResult DeleteDataGroup(string userId, string dataStoreId, string dataGroupId)
        {
            var service = GetUserService(userId);
            var result = service.DeleteDataGroup(dataStoreId, dataGroupId);
            
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{dataStoreId}/datapoints/{dataPointId}")]
        public ActionResult DeleteDataPoint(string userId, string dataStoreId, string dataPointId)
        {
            var service = GetUserService(userId);
            var result = service.DeleteDataPoint(dataStoreId, dataPointId);
            
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}

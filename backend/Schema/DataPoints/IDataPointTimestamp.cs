using System;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    public interface IDataPointTimestamp : IDataPoint
    {
        DateTime? MinDate { get; set; }
        DateTime? MaxDate { get; set; }
    }
}

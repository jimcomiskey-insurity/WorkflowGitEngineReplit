using System;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    public interface IDataPointDate : IDataPoint
    {
        DateTime? MinDate { get; set; }
        DateTime? MaxDate { get; set; }
    }
}

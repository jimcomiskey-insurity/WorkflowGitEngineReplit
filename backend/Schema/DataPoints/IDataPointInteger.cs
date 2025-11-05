using System.Collections.Generic;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    public interface IDataPointInteger : IDataPoint
    {
        int? MinValue { get; set; }
        int? MaxValue { get; set; }
        IList<int>? ValuesRequiringExplanation { get; set; }
    }
}

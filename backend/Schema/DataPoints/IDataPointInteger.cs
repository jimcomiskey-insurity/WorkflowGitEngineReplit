using System.Collections.Generic;
using Instec.StrawberryMoon.Abstractions.Attributes;
using Instec.StrawberryMoon.Schema;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    [DomainOwnership(AvailableDomains.Programs)]
    [SchemaClass(concern: DomainConcern.Programs.DataStores,
        partitionStrategy: PartitionStrategies.Configuration.ProgramId)]
    public interface IDataPointInteger : IDataPoint
    {
        [SchemaProperty(Nullable = true)]
        int? MinValue { get; set; }

        [SchemaProperty(Nullable = true)]
        int? MaxValue { get; set; }

        [SchemaProperty(Nullable = true)]
        IList<int> ValuesRequiringExplanation { get; set; }
    }
}

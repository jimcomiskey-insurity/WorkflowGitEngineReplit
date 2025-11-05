using System;
using Instec.StrawberryMoon.Abstractions.Attributes;
using Instec.StrawberryMoon.Schema;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    [DomainOwnership(AvailableDomains.Programs)]
    [SchemaClass(concern: DomainConcern.Programs.DataStores,
        partitionStrategy: PartitionStrategies.Configuration.ProgramId)]
    public interface IDataPointTimestamp : IDataPoint
    {
        [SchemaProperty(Nullable = true)]
        DateTime? MinDate { get; set; }

        [SchemaProperty(Nullable = true)]
        DateTime? MaxDate { get; set; }
    }
}

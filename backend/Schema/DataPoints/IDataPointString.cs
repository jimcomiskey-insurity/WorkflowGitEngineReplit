using Instec.StrawberryMoon.Abstractions.Attributes;
using Instec.StrawberryMoon.Schema;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    [DomainOwnership(AvailableDomains.Programs)]
    [SchemaClass(concern: DomainConcern.Programs.DataStores,
        partitionStrategy: PartitionStrategies.Configuration.ProgramId)]
    public interface IDataPointString : IDataPoint
    {
        [SchemaProperty(Nullable = true)]
        int? MinLength { get; set; }

        [SchemaProperty(Nullable = true)]
        int? MaxLength { get; set; }

        [SchemaProperty(Nullable = true)]
        bool? MultiLineEntry { get; set; }
    }
}
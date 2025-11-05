using Instec.StrawberryMoon.Abstractions.Attributes;
using Instec.StrawberryMoon.Schema;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    [DomainOwnership(AvailableDomains.Programs)]
    [SchemaClass(concern: DomainConcern.Programs.DataStores,
        partitionStrategy: PartitionStrategies.Configuration.ProgramId)]
    public interface IDataPointDecimal : IDataPoint
    {
        [SchemaProperty(Nullable = true)]
        decimal? MinValue { get; set; }

        [SchemaProperty(Nullable = true)]
        decimal? MaxValue { get; set; }

        [SchemaProperty(Nullable = true)]
        int? Places { get; set; }
    }
}

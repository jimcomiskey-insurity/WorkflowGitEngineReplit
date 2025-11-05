using Instec.StrawberryMoon.Abstractions.Attributes;
using Instec.StrawberryMoon.Schema;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    [DomainOwnership(AvailableDomains.Programs)]
    [SchemaClass(concern: DomainConcern.Programs.DataStores,
        partitionStrategy: PartitionStrategies.Configuration.ProgramId)]
    public interface IDataPointDate : IDataPoint
    {
        [SchemaProperty(Nullable = true)]
        ContractDate? MinDate { get; set; }

        [SchemaProperty(Nullable = true)]
        ContractDate? MaxDate { get; set; }
    }
}

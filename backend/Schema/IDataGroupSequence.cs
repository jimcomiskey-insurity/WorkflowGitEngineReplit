using Instec.StrawberryMoon.Abstractions.Attributes;
using Instec.StrawberryMoon.Abstractions.Schema;
using Instec.StrawberryMoon.Schema;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    [DeprecatedData(errorMessage: "This should not be used anymore. The Sequence resides on the DataGroup now.")]
    [DomainOwnership(AvailableDomains.Programs)]
    [SchemaClass(concern: DomainConcern.Programs.DataStores,
        partitionStrategy: PartitionStrategies.Configuration.ProgramId)]
    public interface IDataGroupSequence : IVertex, ISequence
    {
    }
}

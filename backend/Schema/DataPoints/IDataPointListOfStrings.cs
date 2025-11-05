using Instec.StrawberryMoon.Abstractions.Attributes;
using Instec.StrawberryMoon.Schema;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    [DomainOwnership(AvailableDomains.Programs)]
    [SchemaClass(concern: DomainConcern.Programs.DataStores,
        partitionStrategy: PartitionStrategies.Configuration.ProgramId)]
    public interface IDataPointListOfStrings : IDataPoint
    {
        [SchemaProperty(Nullable = true, Default = false)]
        bool? AllowSpaces { get; set; }
    }
}

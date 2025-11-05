using Instec.StrawberryMoon.Abstractions.Attributes;
using Instec.StrawberryMoon.Abstractions.Schema;
using Instec.StrawberryMoon.Schema;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    /// <summary>
    /// The DataGroupContainsDataPoint edge class links DataGroup objects
    /// to DataPoint objects.
    /// This class may be extended in the future.
    /// </summary>
    [DomainOwnership(AvailableDomains.Programs)]
    [SchemaClass(concern: DomainConcern.Programs.DataStores,
        partitionStrategy: PartitionStrategies.Configuration.ProgramId)]
    [CodeGenRelationship(OutAlias = "Contains", InAlias = "IsContainedBy")]
    public interface IDataGroupContainsDataPoint : IEdge, IRevisionableEdge, IOrders
    {
        [SchemaProperty]
        IDataGroup Out { get; set; }

        [SchemaProperty]
        IDataPoint In { get; set; }
    }
}

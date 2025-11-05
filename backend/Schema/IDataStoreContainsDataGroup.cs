using Instec.StrawberryMoon.Abstractions.Attributes;
using Instec.StrawberryMoon.Abstractions.Schema;
using Instec.StrawberryMoon.Schema;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    /// <summary>
    /// This edge class links DataStore objects to DataGroup objects.
    /// This class may be extended in the future.
    /// </summary>
    [DomainOwnership(AvailableDomains.Programs)]
    [SchemaClass(concern: DomainConcern.Programs.DataStores,
        partitionStrategy: PartitionStrategies.Configuration.ProgramId)]
    [CodeGenRelationship(OutAlias = "Contains", InAlias = "IsContainedBy")]
    public interface IDataStoreContainsDataGroup : IEdge, IRevisionableEdge, IOrders
    {
        [SchemaProperty]
        IDataStore Out { get; set; }

        [SchemaProperty]
        IDataGroup In { get; set; }
    }
}

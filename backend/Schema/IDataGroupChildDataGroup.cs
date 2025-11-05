using Instec.StrawberryMoon.Abstractions.Attributes;
using Instec.StrawberryMoon.Abstractions.Schema;
using Instec.StrawberryMoon.Schema;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    /// <summary>
    /// This links DataGroup objects to other DataGroup objects.
    /// This class may be extended in the future.
    /// </summary>
    [DomainOwnership(AvailableDomains.Programs)]
    [SchemaClass(concern: DomainConcern.Programs.DataStores,
        partitionStrategy: PartitionStrategies.Configuration.ProgramId)]
    [CodeGenRelationship(InAlias = "ChildOf", OutAlias = "ParentOf")]
    public interface IDataGroupChildDataGroup : IEdge, IRevisionableEdge, IOrders
    {
        [SchemaProperty]
        IDataGroup Out { get; set; }

        [SchemaProperty]
        IDataGroup In { get; set; }
    }
}

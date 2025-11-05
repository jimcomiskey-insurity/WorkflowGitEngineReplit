using Instec.StrawberryMoon.Abstractions.Attributes;
using Instec.StrawberryMoon.Abstractions.Schema;
using Instec.StrawberryMoon.Schema;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    [DeprecatedData(errorMessage: "This should not be used anymore. The Sequence resides on the DataStore now.")]
    [DomainOwnership(AvailableDomains.Programs)]
    [SchemaClass(concern: DomainConcern.Programs.DataStores,
        partitionStrategy: PartitionStrategies.Configuration.ProgramId)]
    [CodeGenRelationship(InAlias = "Sequences", OutAlias = "IsSequencedBy")]
    public interface IDataStoreIsSequencedByDataStoreSequence : IEdge, IRevisionableEdge
    {
        /// <summary>
        /// The Out property is used to set what type and instance of an object/class
        /// the edge will leave from.
        /// </summary>
        [SchemaProperty]
        IDataStore Out { get; set; }

        /// <summary>
        /// The In property is used to set what type and instance of an object/class
        /// the edge will go into.
        /// </summary>
        [SchemaProperty]
        IDataStoreSequence In { get; set; }
    }
}

using System.Collections.Generic;
using Instec.StrawberryMoon.Abstractions.Attributes;
using Instec.StrawberryMoon.Abstractions.Schema;
using Instec.StrawberryMoon.Schema;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    /// <summary>
    /// The IDataStore interface inherits from both IRevisionable and IVertex,
    /// allowing it to keep records of all of the changes and releases it has been
    /// a part of.  Ontology Instances must have an DataStore object to
    /// define the DataGroup and DataPoint vertices as well as
    /// the edges connecting them to be used as the templates for the vertices and
    /// edges in the Ontology instance.
    /// </summary>
    [DomainOwnership(AvailableDomains.Programs)]
    [SchemaClass(concern: DomainConcern.Programs.DataStores,
        partitionStrategy: PartitionStrategies.Configuration.ProgramId)]
    public interface IDataStore : IProgramRevisioned, ISequence, IValidatable
    {
        /// <summary>
        /// The Name property is the readable identifier and is required to be filled in
        /// before an instance of the object can be created.
        /// </summary>
        [SchemaProperty(Nullable = false, RegExp = "[A-Za-z][A-Za-z0-9 ]{0,18}[A-Za-z0-9]",
            ValidationMessage = "Names for data elements are case-sensitive strings of letters, numbers and spaces that must start with a letter and are limited to 20 characters in length")]
        string Name { get; set; }

        /// <summary>
        /// The Description Property is an optional property to describe the Vertex
        /// object that is being created.
        /// </summary>
        [SchemaProperty]
        string Description { get; set; }

        /// <summary>
        /// This is the number of times the Data Store has been used to create a Data Store Instance
        /// </summary>
        [SchemaProperty(Nullable = false, Default = 0)]
        [ApiProperty(ApiPropertyType.ReadOnly)]
        int NoOfTimesUsed { get; set; }

        /// <summary>
        /// The Aliases property is a list of other names the vertex could be called,
        /// and every time the name of the vertex is changed, the previous name is
        /// added to the list of Aliases.
        /// </summary>
        [SchemaProperty]
        IList<string> Aliases { get; set; }
    }
}

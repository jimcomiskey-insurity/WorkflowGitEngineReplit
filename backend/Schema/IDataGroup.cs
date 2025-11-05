using System;
using System.Collections.Generic;
using Instec.StrawberryMoon.Abstractions.Attributes;
using Instec.StrawberryMoon.Abstractions.Schema;
using Instec.StrawberryMoon.Schema;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    /// <summary>
    /// IDataGroup's purpose is to record which DataPoint
    /// vertices are needed for the DataStore to meet its requirements.
    /// DataGroups can be connected backwards to either the DataStore
    /// object or to other DataGroup objects.
    /// </summary>
    [DomainOwnership(AvailableDomains.Programs)]
    [SchemaClass(concern: DomainConcern.Programs.DataStores,
        partitionStrategy: PartitionStrategies.Configuration.ProgramId)]
    public interface IDataGroup : IVertex, IRevisionableVertex, ISequence, IOrderable
    {
        /// <summary>
        /// The Name property is the readable identifier and is required to be filled in
        /// before an instance of the object can be created.
        /// </summary>
        [SchemaProperty(Nullable = false, RegExp = "[A-Za-z][A-Za-z0-9 ]{0,28}[A-Za-z0-9]",
            ValidationMessage = "Names for data elements are case-sensitive strings of letters, numbers and spaces that must start with a letter and are limited to 30 characters in length")]
        string Name { get; set; }

        /// <summary>
        /// The Description Property is an optional property to describe the Vertex
        /// object that is being created.
        /// </summary>
        [SchemaProperty]
        string Description { get; set; }

        [SchemaProperty(Nullable = false, Default = false)]
        bool Repeatable { get; set; }

        /// <summary>
        /// This is the name of the type of domain object to synchronize with
        /// </summary>
        [SchemaProperty(Nullable = true)]
        string ReferenceObject { get; set; }

        /// <summary>
        /// Used by Policy DataGroups to indicate to which product the datagroup belongs.
        /// </summary>
        [SchemaProperty(Nullable = true)]
        [ForeignKey]
        Guid? ProductId { get; set; }

        /// <summary>
        /// This indicates that the data group is pre-defined according to a parent data group structure
        /// and has limitations on editing after created.
        /// </summary>
        /// <remarks>
        /// A "Typed" datagroup may come with a child datagroup that is part of its Predefined structure.  This child datagroup is just a generic datagroup... but it is also Predefined.
        /// Thus, a datagroup with a DataGroupType is always Predefined but a Predefined datagroup may not have a DataGroupType.
        /// </remarks>
        [SchemaProperty(Nullable = false, Default = false)]
        [ApiProperty(ApiPropertyType.ReadOnly)]
        bool IsPredefined { get; set; }

        [SchemaProperty(Nullable = true, Immutable = true,
            RegExp = "Policy Set|Policy|Company|Contact|Address|Currency",
            ValidationMessage = "Invalid Data Group Type")]
        string DataGroupType { get; set; }

        /// <summary>
        /// Identification used to further classify the data group for query purposes.
        /// </summary>
        /// <example>
        /// for instance a Company could be "Insured" or "Producer"
        /// </example>
        [SchemaProperty(Nullable = true)]
        string Tag { get; set; }

        /// <summary>
        /// Indicates that a DataGroup can be imported using Desired State
        /// </summary>
        [SchemaProperty(Nullable = false, Default = false)]
        bool IsDesiredStateAllowed { get; set; }

        /// <summary>
        /// Set of sources that are allowed to populate this DataGroup.
        /// </summary>
        [SchemaProperty(Nullable = true)]
        ISet<string> PopulatedBy { get; set; } // enum is InjectionSourceType
    }
}

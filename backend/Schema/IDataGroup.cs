using System;
using System.Collections.Generic;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    /// <summary>
    /// IDataGroup's purpose is to record which DataPoint
    /// vertices are needed for the DataStore to meet its requirements.
    /// DataGroups can be connected backwards to either the DataStore
    /// object or to other DataGroup objects.
    /// </summary>
    public interface IDataGroup
    {
        /// <summary>
        /// The Name property is the readable identifier and is required to be filled in
        /// before an instance of the object can be created.
        /// </summary>
        string Name { get; set; }

        /// <summary>
        /// The Description Property is an optional property to describe the Vertex
        /// object that is being created.
        /// </summary>
        string? Description { get; set; }

        bool Repeatable { get; set; }

        /// <summary>
        /// This is the name of the type of domain object to synchronize with
        /// </summary>
        string? ReferenceObject { get; set; }

        /// <summary>
        /// Used by Policy DataGroups to indicate to which product the datagroup belongs.
        /// </summary>
        Guid? ProductId { get; set; }

        /// <summary>
        /// This indicates that the data group is pre-defined according to a parent data group structure
        /// and has limitations on editing after created.
        /// </summary>
        /// <remarks>
        /// A "Typed" datagroup may come with a child datagroup that is part of its Predefined structure.  This child datagroup is just a generic datagroup... but it is also Predefined.
        /// Thus, a datagroup with a DataGroupType is always Predefined but a Predefined datagroup may not have a DataGroupType.
        /// </remarks>
        bool IsPredefined { get; set; }

        string? DataGroupType { get; set; }

        /// <summary>
        /// Identification used to further classify the data group for query purposes.
        /// </summary>
        /// <example>
        /// for instance a Company could be "Insured" or "Producer"
        /// </example>
        string? Tag { get; set; }

        /// <summary>
        /// Indicates that a DataGroup can be imported using Desired State
        /// </summary>
        bool IsDesiredStateAllowed { get; set; }

        /// <summary>
        /// Set of sources that are allowed to populate this DataGroup.
        /// </summary>
        ISet<string>? PopulatedBy { get; set; }
    }
}

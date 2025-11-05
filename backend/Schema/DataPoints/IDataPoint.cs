using System.Collections.Generic;
using Instec.StrawberryMoon.Abstractions.Attributes;
using Instec.StrawberryMoon.Abstractions.Schema;
using Instec.StrawberryMoon.Schema;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    /// <summary>
    /// The IDataPoint's purpose is to define the type of data
    /// needed to fulfill the requirements of the DataStore.
    /// There will always be one or more DataPoint vertices
    /// per DataGroup.  Inheriting from IDataVertex
    /// gives it the properties of IRevisionable as well as marking it as
    /// a vertex.
    /// </summary>
    [DomainOwnership(AvailableDomains.Programs)]
    [SchemaClass(concern: DomainConcern.Programs.DataStores,
        alternateConcerns: new string[0],
        isAbstract: true,
        partitionStrategy: PartitionStrategies.Abstract)]
    public interface IDataPoint : IVertex, IRevisionableVertex, IMappable, IOrderable, IValidatable
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

        /// <summary>
        /// The Optional property is used to denote whether the DataPoint object
        /// is an optional field, with the base assumption being that all DataPoint
        /// objects are required.  An Example of an optional DataPoint would be
        /// Address 2.
        /// </summary>
        [SchemaProperty(Nullable = false, Default = false)]
        [ApiProperty(ApiPropertyType.ReadOnly)]
        bool Optional { get; set; }

        /// <summary>
        /// List of options to use for Multi-Select or Radio-Buttons.
        /// </summary>
        [SchemaProperty]
        IList<string> Options { get; set; }

        /// <summary>
        /// The Content property holds any fixed or defaulted data determined during
        /// DataStore creation.  If there is no default or fixed data,
        /// leave blank.
        /// </summary>
        [SchemaProperty]
        EmbeddedContent DefaultContent { get; set; }

        /// <summary>
        /// The RegExPattern property is a validation regex pattern, if set
        /// The Content property must fit this pattern.
        /// </summary>
        [SchemaProperty]
        string RegExPattern { get; set; }

        /// <summary>
        /// The ValidationType property tells us what type of validation the data point will use,
        /// List means it will only accept an input that is part of the list, Advanced is
        /// a javascript validation, and Basic will be parameter validation
        /// </summary>
        [SchemaProperty(Nullable = false, RegExp = "List|Basic|Advanced", ValidationMessage = "ValidationType must be one of List, Basic, or Advanced",
            Default = "Basic")]
        string ValidationType { get; set; } // enum is ValidationType

        /// <summary>
        /// ValidationScript is the JavaScript code that any input will be validated against
        /// </summary>
        [SchemaProperty]
        string ValidationScript { get; set; }

        /// <summary>
        /// This indicates that the data point is pre-defined according to a parent data group structure
        /// and has limitations on editing after creation.
        /// </summary>
        [SchemaProperty(Nullable = false, Default = false)]
        [ApiProperty(ApiPropertyType.ReadOnly)]
        bool IsPredefined { get; set; }

        /// <summary>
        /// Identification used to further classify the data point for query purposes.
        /// </summary>
        [SchemaProperty(Nullable = true)]
        string Tag { get; set; }

        /// <summary>
        /// This indicates that a Datapoint gets its data by calculating the data from other Data Points
        /// </summary>
        [SchemaProperty(Nullable = false, Default = false)]
        bool IsCalculated { get; set; }

        /// <summary>
        /// True indicates that a DataPoint is involved in an extract format to a RatingService.
        /// </summary>
        [SchemaProperty(Nullable = false, Default = false)]
        bool RateAffecting { get; set; }

        /// <summary>
        /// Indicates that the DataPoint will be used as a defined data key for import APIs
        /// </summary>
        [SchemaProperty(Nullable = false, Default = false)]
        bool IsRepeatableKey { get; set; }

        /// <summary>
        /// The name of the domain object type to synchronize with when present
        /// </summary>
        [SchemaProperty(Nullable = true)]
        string ReferenceObject { get; set; }

        /// <summary>
        /// The property name of the Reference Objects whos value should be synchronized with this data point
        /// </summary>
        [SchemaProperty(Nullable = true)]
        string ReferenceProperty { get; set; }

        /// <summary>
        /// Set of sources that are allowed to populate this DataPoint.
        /// </summary>
        [SchemaProperty(Nullable = true)]
        ISet<string> PopulatedBy { get; set; } // enum is InjectionSourceType

        [SchemaProperty(Nullable = false, Default = false)]
        bool ResetDataForNewEdition { get; set; }

        [SchemaProperty]
        [SanitizeHtml(skipSanitation: true)]
        string ScriptFunction { get; set; }

        [ForeignKey]
        [SchemaProperty]
        IList<InputSource> InputSources { get; set; }
    }
}

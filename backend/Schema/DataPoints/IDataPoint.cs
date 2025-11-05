using System.Collections.Generic;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    /// <summary>
    /// The IDataPoint's purpose is to define the type of data
    /// needed to fulfill the requirements of the DataStore.
    /// There will always be one or more DataPoint vertices
    /// per DataGroup.
    /// </summary>
    public interface IDataPoint
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
        string Description { get; set; }

        /// <summary>
        /// The Optional property is used to denote whether the DataPoint object
        /// is an optional field, with the base assumption being that all DataPoint
        /// objects are required.  An Example of an optional DataPoint would be
        /// Address 2.
        /// </summary>
        bool Optional { get; set; }

        /// <summary>
        /// List of options to use for Multi-Select or Radio-Buttons.
        /// </summary>
        IList<string>? Options { get; set; }

        /// <summary>
        /// The Content property holds any fixed or defaulted data determined during
        /// DataStore creation.  If there is no default or fixed data,
        /// leave blank.
        /// </summary>
        string? DefaultContent { get; set; }

        /// <summary>
        /// The RegExPattern property is a validation regex pattern, if set
        /// The Content property must fit this pattern.
        /// </summary>
        string? RegExPattern { get; set; }

        /// <summary>
        /// The ValidationType property tells us what type of validation the data point will use,
        /// List means it will only accept an input that is part of the list, Advanced is
        /// a javascript validation, and Basic will be parameter validation
        /// </summary>
        string ValidationType { get; set; }

        /// <summary>
        /// ValidationScript is the JavaScript code that any input will be validated against
        /// </summary>
        string? ValidationScript { get; set; }

        /// <summary>
        /// This indicates that the data point is pre-defined according to a parent data group structure
        /// and has limitations on editing after creation.
        /// </summary>
        bool IsPredefined { get; set; }

        /// <summary>
        /// Identification used to further classify the data point for query purposes.
        /// </summary>
        string? Tag { get; set; }

        /// <summary>
        /// This indicates that a Datapoint gets its data by calculating the data from other Data Points
        /// </summary>
        bool IsCalculated { get; set; }

        /// <summary>
        /// True indicates that a DataPoint is involved in an extract format to a RatingService.
        /// </summary>
        bool RateAffecting { get; set; }

        /// <summary>
        /// Indicates that the DataPoint will be used as a defined data key for import APIs
        /// </summary>
        bool IsRepeatableKey { get; set; }

        /// <summary>
        /// The name of the domain object type to synchronize with when present
        /// </summary>
        string? ReferenceObject { get; set; }

        /// <summary>
        /// The property name of the Reference Objects whos value should be synchronized with this data point
        /// </summary>
        string? ReferenceProperty { get; set; }

        /// <summary>
        /// Set of sources that are allowed to populate this DataPoint.
        /// </summary>
        ISet<string>? PopulatedBy { get; set; }

        bool ResetDataForNewEdition { get; set; }

        string? ScriptFunction { get; set; }

        IList<string>? InputSources { get; set; }
    }
}

using System.Collections.Generic;

namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    /// <summary>
    /// The IDataStore interface allows it to keep records of all of the changes and releases it has been
    /// a part of.  Ontology Instances must have an DataStore object to
    /// define the DataGroup and DataPoint vertices as well as
    /// the edges connecting them to be used as the templates for the vertices and
    /// edges in the Ontology instance.
    /// </summary>
    public interface IDataStore
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

        /// <summary>
        /// This is the number of times the Data Store has been used to create a Data Store Instance
        /// </summary>
        int NoOfTimesUsed { get; set; }

        /// <summary>
        /// The Aliases property is a list of other names the vertex could be called,
        /// and every time the name of the vertex is changed, the previous name is
        /// added to the list of Aliases.
        /// </summary>
        IList<string>? Aliases { get; set; }
    }
}

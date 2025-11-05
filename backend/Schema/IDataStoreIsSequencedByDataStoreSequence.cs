namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    [Obsolete("This should not be used anymore. The Sequence resides on the DataStore now.")]
    public interface IDataStoreIsSequencedByDataStoreSequence
    {
        /// <summary>
        /// The Out property is used to set what type and instance of an object/class
        /// the edge will leave from.
        /// </summary>
        IDataStore? Out { get; set; }

        /// <summary>
        /// The In property is used to set what type and instance of an object/class
        /// the edge will go into.
        /// </summary>
        IDataStoreSequence? In { get; set; }
    }
}

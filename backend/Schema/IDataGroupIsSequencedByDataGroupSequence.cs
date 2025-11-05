namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    [Obsolete("This should not be used anymore. The Sequence resides on the DataGroup now.")]
    public interface IDataGroupIsSequencedByDataGroupSequence
    {
        /// <summary>
        /// The Out property is used to set what type and instance of an object/class
        /// the edge will leave from.
        /// </summary>
        IDataGroup? Out { get; set; }

        /// <summary>
        /// The In property is used to set what type and instance of an object/class
        /// the edge will go into.
        /// </summary>
        IDataGroupSequence? In { get; set; }
    }
}

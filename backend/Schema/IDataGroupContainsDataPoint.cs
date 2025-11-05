namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    /// <summary>
    /// The DataGroupContainsDataPoint edge class links DataGroup objects
    /// to DataPoint objects.
    /// This class may be extended in the future.
    /// </summary>
    public interface IDataGroupContainsDataPoint
    {
        IDataGroup? Out { get; set; }
        IDataPoint? In { get; set; }
    }
}

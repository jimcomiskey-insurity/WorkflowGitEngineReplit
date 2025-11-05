namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    /// <summary>
    /// This links DataGroup objects to other DataGroup objects.
    /// This class may be extended in the future.
    /// </summary>
    public interface IDataGroupChildDataGroup
    {
        IDataGroup? Out { get; set; }
        IDataGroup? In { get; set; }
    }
}

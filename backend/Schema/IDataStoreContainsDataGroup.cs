namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    /// <summary>
    /// This edge class links DataStore objects to DataGroup objects.
    /// This class may be extended in the future.
    /// </summary>
    public interface IDataStoreContainsDataGroup
    {
        IDataStore? Out { get; set; }
        IDataGroup? In { get; set; }
    }
}

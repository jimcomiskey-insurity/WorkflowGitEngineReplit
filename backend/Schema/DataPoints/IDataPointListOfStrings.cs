namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    public interface IDataPointListOfStrings : IDataPoint
    {
        bool? AllowSpaces { get; set; }
    }
}

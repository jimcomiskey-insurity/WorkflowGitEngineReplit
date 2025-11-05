namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    public interface IDataPointString : IDataPoint
    {
        int? MinLength { get; set; }
        int? MaxLength { get; set; }
        bool? MultiLineEntry { get; set; }
    }
}
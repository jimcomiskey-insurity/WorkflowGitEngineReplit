namespace Instec.StrawberryMoon.Infrastructure.SchemaGenerator.SchemaDefinition.Configuration
{
    public interface IDataPointDecimal : IDataPoint
    {
        decimal? MinValue { get; set; }
        decimal? MaxValue { get; set; }
        int? Places { get; set; }
    }
}

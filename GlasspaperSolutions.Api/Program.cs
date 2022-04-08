using GlasspaperSolutions.DataAccess;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connection = @"Server=(localdb)\MSSQLLocalDB;Database=GlasspaperBooking;Trusted_Connection=True;ConnectRetryCount=0";
builder.Services.AddDbContext<BookingContext>(options => options.UseSqlServer(connection));
builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddCors(options => {
    options.AddPolicy(name: MyAllowSpecificOrigins, builder => {
        builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod(); ;
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

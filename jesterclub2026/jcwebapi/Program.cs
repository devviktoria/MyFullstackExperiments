using jcdatabase.DataAccess;
using jcdataservice.DataServiceRegistration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

const string JesterClubSpecificOrigins = "_JesterClubSpecificOrigins";
string connString = builder.Configuration.GetConnectionString("jcwebapi") ?? "";
builder.Services.AddSqlServerServices(connString);
builder.Services.AddDataServices();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: JesterClubSpecificOrigins,
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(JesterClubSpecificOrigins);

app.UseHttpsRedirection();

app.MapControllers();

app.Run();


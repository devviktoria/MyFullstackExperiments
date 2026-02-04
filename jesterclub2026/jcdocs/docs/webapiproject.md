# ASP.NET Web API Project

This project represents the **RESTful service layer** of the backend.

Key points:
- Implemented using **ASP.NET Core 10 Web API**
- Exposes the application functionality via **REST endpoints**
- Responsibilities include:
  - Handling incoming HTTP requests
  - Generating HTTP responses
  - Configuring dependency injection for required services
- Does **not** contain any database-specific logic
## Location

This project can be found in the **jcwebapi** folder.
## Project Structure

- **Controllers** folder: Contains a controller class, the `JokeController`, which define the REST endpoints.
- **Program.cs**: Configures DI for database providers with configuration settings and registers data service classes.

# Database Access Project

This project is responsible for **all database access** in the system.

Key characteristics:
- Uses **Microsoft SQL Server**
- Implemented with **Entity Framework Core (Code First)**
- Contains:
    - EF Core entity classes
    - DbContext
    - Database-specific query providers
- It is intentionally independent from:
    - Web API concepts
    - DTOs
    - Presentation layer concerns

## Location

This project can be found in the **jcdatabase** folder.

## Project Structure

- **DataAccess** folder: Contains the DbContext creation logic and the registration of database repository services.
- **DataProviderInterfaces** folder: Contains the data provider interfaces. These interfaces allow other projects to use dependency injection easily.
- **DataProviders** folder: Contains the implementation of the data provider interfaces.
- **Migrations** folder: Contains all database migrations created with EF Core.
- **Models** folder: Contains all the EF Core entity classes that map to the database tables.
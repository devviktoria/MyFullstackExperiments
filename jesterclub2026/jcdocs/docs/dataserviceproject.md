# Data Service Project

This project acts as the **application/service layer** of the system.

It communicates with the Database Access Layer and is responsible for:
- Business logic
- Data aggregation
- Mapping database entities to DTOs

It provides clean, API-ready data structures for the Web API layer.

## Location

This project can be found in the **jcdataservice** folder.

## Project Structure

- **DataServiceInterfaces** folder: Contains the data service interface. This interface allow other projects to use dependency injection easily.
- **DataServiceRegistration** folder: Contains the class responsible for registering the data service services.
- **DataServices** folder: Contains the implementation of the data service interface.
- **Dto** folder: Contains the DTO records used in RESTful communications.
# Jester Club 2026 Web Site

Jester Club 2026 is a **multilayered social web application** focused on sharing and managing jokes.

This project is a **modern rewrite and architectural refresh** of my earlier *Jester Club* application, rebuilt using **.NET 10** and contemporary backend design principles.

⚠️ **Note:**  
This is **not a finished product**. The primary goal of this repository is to **demonstrate the planned architecture, layering, and design decisions** behind the application.

---

## Technical Overview

The application follows a **layered (enterprise-style) architecture** with a clear separation of concerns.

### Backend Architecture

The backend consists of **three distinct layers**:

1. **Database Access Layer**
2. **Data Service Layer**
3. **RESTful Service Layer**

In addition, there is a **separate frontend layer** implemented as a web client.

---

## Backend Layers

### Database Access Layer

- Responsible for **all database access**
- Uses **Microsoft SQL Server**
- Implemented with **Entity Framework Core (Code First)**
- Contains:
  - EF Core entities
  - DbContext
  - Database-specific query providers / repositories
- Has **no dependency** on DTOs or Web API concepts

---

### Data Service Layer

- Acts as an **application/service layer**
- Communicates with the Database Access Layer
- Responsible for:
  - Business logic
  - Data aggregation
  - Mapping database entities to DTOs
- Provides clean, API-ready data structures for the Web API layer

---

### RESTful Service Layer

- Implemented using **ASP.NET Core 10 Web API**
- Exposes the application functionality via **REST endpoints**
- Responsibilities:
  - Request handling
  - Input validation
  - HTTP response generation
  - Dependency injection configuration
- Does **not** contain database-specific logic

---

## Frontend Layer

### Web Client

- Planned to be rewritten using the **latest Angular version**
- Communicates exclusively through the RESTful API
- The architecture allows additional clients (e.g. React) to be added later without backend changes

---

## Project Status

- Architecture and layering: ✅ implemented
- Core API endpoints: 🚧 in progress
- Frontend rewrite: ⏳ planned

---

## Goals of This Project

- Demonstrate a **clean, maintainable, enterprise-style architecture**
- Apply modern **.NET, EF Core, and Web API best practices**
- Serve as a **learning and reference project** rather than a production-ready system



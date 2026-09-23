# Employee Management System

A full-stack Employee Management System built for fresher placement projects.

## Tech Stack
- Backend: C#, ASP.NET Core Web API (.NET 8)
- Database: Microsoft SQL Server
- ORM: Entity Framework Core
- Authentication: JWT
- API Documentation: Swagger
- Frontend: Angular
- Version Control: Git/GitHub

## Features
- Admin login with JWT authentication
- Employee CRUD
- Department CRUD
- Search employees
- Filter employees by department/status
- Employee details
- Angular form validation
- REST APIs
- SQL Server database
- Swagger API documentation
- Global error handling
- Password hashing with BCrypt

## Project Structure

EmployeeManagementSystem/
  backend/EmployeeManagement.API/
  frontend/employee-management/
  database/

## Backend Setup

1. Open `backend/EmployeeManagement.API` in Visual Studio.
2. Make sure SQL Server is installed/running.
3. Update the connection string in `appsettings.json`.
4. Open Package Manager Console and run:
   `Update-Database`
5. Run the API.
6. Open Swagger, normally:
   `https://localhost:7001/swagger`

Default demo login:
- Email: admin@gmail.com
- Password: Admin@123

The application seeds this account automatically on startup.

## Frontend Setup

Install Node.js and Angular CLI.

From `frontend/employee-management`:

```bash
npm install
ng serve
```

Open:
`http://localhost:4200`

If your backend uses a different HTTPS port, change `apiUrl` in:
`src/app/services/api.service.ts`

## Important
Do not upload real database passwords, JWT secrets, or personal information to GitHub.

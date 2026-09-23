# Database

The application uses Entity Framework Core migrations.

After configuring SQL Server:

```powershell
cd backend/EmployeeManagement.API
dotnet ef database update
```

Or use Visual Studio Package Manager Console:

```powershell
Update-Database
```

A seed admin account is created automatically:
Email: admin@gmail.com
Password: Admin@123

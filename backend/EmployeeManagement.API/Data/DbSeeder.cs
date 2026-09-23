using BCrypt.Net;
using EmployeeManagement.API.Models;

namespace EmployeeManagement.API.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext db)
    {
        if (!db.Departments.Any())
        {
            db.Departments.AddRange(
                new Department { Name = "IT" },
                new Department { Name = "HR" },
                new Department { Name = "Finance" },
                new Department { Name = "Sales" }
            );
            db.SaveChanges();
        }

        if (!db.Users.Any())
        {
            db.Users.Add(new AppUser
            {
                Name = "Administrator",
                Email = "admin@gmail.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                Role = "Admin"
            });
            db.SaveChanges();
        }

        if (!db.Employees.Any())
        {
            var it = db.Departments.First(d => d.Name == "IT");
            var hr = db.Departments.First(d => d.Name == "HR");

            db.Employees.AddRange(
                new Employee
                {
                    FirstName = "Rahul",
                    LastName = "Sharma",
                    Email = "rahul@example.com",
                    Phone = "9876543210",
                    Designation = "Software Developer",
                    Salary = 50000,
                    JoiningDate = new DateTime(2025, 7, 10),
                    Status = "Active",
                    DepartmentId = it.Id
                },
                new Employee
                {
                    FirstName = "Priya",
                    LastName = "Patil",
                    Email = "priya@example.com",
                    Phone = "9876501234",
                    Designation = "HR Executive",
                    Salary = 40000,
                    JoiningDate = new DateTime(2025, 8, 15),
                    Status = "Active",
                    DepartmentId = hr.Id
                }
            );
            db.SaveChanges();
        }
    }
}

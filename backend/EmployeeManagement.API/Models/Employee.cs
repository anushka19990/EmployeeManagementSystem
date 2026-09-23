using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.API.Models;

public class Employee
{
    public int Id { get; set; }

    [Required, MaxLength(50)]
    public string FirstName { get; set; } = string.Empty;

    [Required, MaxLength(50)]
    public string LastName { get; set; } = string.Empty;

    [Required, EmailAddress, MaxLength(100)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(15)]
    public string Phone { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string Designation { get; set; } = string.Empty;

    public decimal Salary { get; set; }

    public DateTime JoiningDate { get; set; }

    [Required, MaxLength(20)]
    public string Status { get; set; } = "Active";

    public int DepartmentId { get; set; }
    public Department? Department { get; set; }
}

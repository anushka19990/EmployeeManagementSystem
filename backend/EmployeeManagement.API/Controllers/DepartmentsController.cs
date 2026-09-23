using EmployeeManagement.API.Data;
using EmployeeManagement.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DepartmentsController : ControllerBase
{
    private readonly AppDbContext _db;

    public DepartmentsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
    {
        return Ok(await _db.Departments.OrderBy(d => d.Name).ToListAsync());
    }

    [HttpPost]
    public async Task<ActionResult<Department>> CreateDepartment(Department department)
    {
        if (await _db.Departments.AnyAsync(d => d.Name == department.Name))
            return Conflict(new { message = "Department already exists." });

        _db.Departments.Add(department);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetDepartments), new { id = department.Id }, department);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteDepartment(int id)
    {
        var department = await _db.Departments
            .Include(d => d.Employees)
            .FirstOrDefaultAsync(d => d.Id == id);

        if (department == null)
            return NotFound();

        if (department.Employees.Any())
            return BadRequest(new { message = "Cannot delete a department that has employees." });

        _db.Departments.Remove(department);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Department, Employee } from '../models';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
  <div class="layout">
    <header class="topbar">
      <div>
        <h2>Employee Management</h2>
        <span>Employee List</span>
      </div>
      <div class="header-actions">
        <a routerLink="/dashboard">Dashboard</a>
        <button class="logout" (click)="logout()">Logout</button>
      </div>
    </header>

    <main class="container">
      <div class="toolbar">
        <input [(ngModel)]="search" (input)="loadEmployees()" placeholder="Search employee...">

        <select [(ngModel)]="departmentId" (change)="loadEmployees()">
          <option value="">All Departments</option>
          <option *ngFor="let d of departments" [value]="d.id">{{ d.name }}</option>
        </select>

        <select [(ngModel)]="status" (change)="loadEmployees()">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button class="primary" (click)="startAdd()">+ Add Employee</button>
      </div>

      <div class="form-card" *ngIf="showForm">
        <h3>{{ editingId ? 'Edit Employee' : 'Add Employee' }}</h3>

        <div class="form-grid">
          <input [(ngModel)]="form.firstName" placeholder="First Name">
          <input [(ngModel)]="form.lastName" placeholder="Last Name">
          <input [(ngModel)]="form.email" placeholder="Email" type="email">
          <input [(ngModel)]="form.phone" placeholder="Phone">
          <input [(ngModel)]="form.designation" placeholder="Designation">
          <input [(ngModel)]="form.salary" placeholder="Salary" type="number">
          <input [(ngModel)]="form.joiningDate" type="date">

          <select [(ngModel)]="form.departmentId">
            <option [ngValue]="0">Select Department</option>
            <option *ngFor="let d of departments" [ngValue]="d.id">{{ d.name }}</option>
          </select>

          <select [(ngModel)]="form.status">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div class="form-actions">
          <button class="primary" (click)="save()">Save</button>
          <button (click)="cancel()">Cancel</button>
        </div>

        <p class="error" *ngIf="error">{{ error }}</p>
      </div>

      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let e of employees">
              <td>{{ e.id }}</td>
              <td>{{ e.firstName }} {{ e.lastName }}</td>
              <td>{{ e.email }}</td>
              <td>{{ e.department?.name }}</td>
              <td>{{ e.designation }}</td>
              <td>₹{{ e.salary | number }}</td>
              <td><span [class.active]="e.status === 'Active'" [class.inactive]="e.status !== 'Active'">{{ e.status }}</span></td>
              <td>
                <button class="small" (click)="startEdit(e)">Edit</button>
                <button class="small danger" (click)="remove(e.id!)">Delete</button>
              </td>
            </tr>
            <tr *ngIf="employees.length === 0">
              <td colspan="8" class="empty">No employees found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
  `
})
export class EmployeesComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);

  employees: Employee[] = [];
  departments: Department[] = [];

  search = '';
  departmentId = '';
  status = '';
  showForm = false;
  editingId?: number;
  error = '';

  form: Employee = this.emptyForm();

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      return;
    }
    this.api.getDepartments().subscribe(d => this.departments = d);
    this.loadEmployees();
  }

  loadEmployees() {
    this.api.getEmployees(this.search, this.departmentId, this.status)
      .subscribe({
        next: data => this.employees = data,
        error: () => this.error = 'Could not load employees.'
      });
  }

  startAdd() {
    this.editingId = undefined;
    this.form = this.emptyForm();
    this.error = '';
    this.showForm = true;
  }

  startEdit(employee: Employee) {
    this.editingId = employee.id;
    this.form = { ...employee };
    this.form.joiningDate = employee.joiningDate.substring(0, 10);
    this.error = '';
    this.showForm = true;
  }

  save() {
    if (!this.form.firstName || !this.form.lastName || !this.form.email ||
        !this.form.designation || !this.form.departmentId) {
      this.error = 'Please fill all required fields.';
      return;
    }

    if (this.editingId) {
      this.api.updateEmployee({ ...this.form, id: this.editingId }).subscribe({
        next: () => {
          this.cancel();
          this.loadEmployees();
        },
        error: err => this.error = err?.error?.message ?? 'Update failed.'
      });
    } else {
      this.api.addEmployee(this.form).subscribe({
        next: () => {
          this.cancel();
          this.loadEmployees();
        },
        error: err => this.error = err?.error?.message ?? 'Create failed.'
      });
    }
  }

  remove(id: number) {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    this.api.deleteEmployee(id).subscribe({
      next: () => this.loadEmployees(),
      error: err => alert(err?.error?.message ?? 'Delete failed.')
    });
  }

  cancel() {
    this.showForm = false;
    this.editingId = undefined;
    this.form = this.emptyForm();
    this.error = '';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  private emptyForm(): Employee {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      designation: '',
      salary: 0,
      joiningDate: new Date().toISOString().substring(0, 10),
      status: 'Active',
      departmentId: 0
    };
  }
}

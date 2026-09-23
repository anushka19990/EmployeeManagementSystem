import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="layout">
    <header class="topbar">
      <div>
        <h2>Employee Management System</h2>
        <span>Welcome, {{ name }}</span>
      </div>
      <button class="logout" (click)="logout()">Logout</button>
    </header>

    <main class="container">
      <div class="cards">
        <div class="card">
          <h3>Total Employees</h3>
          <strong>{{ employeeCount }}</strong>
        </div>
        <div class="card">
          <h3>Active Employees</h3>
          <strong>{{ activeCount }}</strong>
        </div>
        <div class="card">
          <h3>Departments</h3>
          <strong>{{ departmentCount }}</strong>
        </div>
      </div>

      <div class="actions">
        <a routerLink="/employees">Manage Employees</a>
      </div>
    </main>
  </div>
  `
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);

  name = localStorage.getItem('name') ?? 'Admin';
  employeeCount = 0;
  activeCount = 0;
  departmentCount = 0;

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      return;
    }

    this.api.getEmployees().subscribe(employees => {
      this.employeeCount = employees.length;
      this.activeCount = employees.filter(e => e.status === 'Active').length;
    });

    this.api.getDepartments().subscribe(departments => {
      this.departmentCount = departments.length;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

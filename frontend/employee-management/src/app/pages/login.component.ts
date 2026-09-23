import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="login-page">
    <div class="login-card">
      <h1>Employee Management</h1>
      <p class="subtitle">Admin Login</p>

      <form (ngSubmit)="login()">
        <label>Email</label>
        <input type="email" [(ngModel)]="email" name="email" required>

        <label>Password</label>
        <input type="password" [(ngModel)]="password" name="password" required>

        <button type="submit" [disabled]="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

        <p class="error" *ngIf="error">{{ error }}</p>
      </form>

      <div class="demo">
        Demo: admin@gmail.com / Admin@123
      </div>
    </div>
  </div>
  `
})
export class LoginComponent {
  private api = inject(ApiService);
  private router = inject(Router);

  email = 'admin@gmail.com';
  password = 'Admin@123';
  loading = false;
  error = '';

  login() {
    this.loading = true;
    this.error = '';

    this.api.login(this.email, this.password).subscribe({
      next: response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('name', response.name);
        localStorage.setItem('role', response.role);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.error = err?.error?.message ?? 'Login failed.';
        this.loading = false;
      }
    });
  }
}

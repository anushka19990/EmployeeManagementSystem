import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Department, Employee, LoginResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  // Change this if your ASP.NET Core port is different.
  private apiUrl = 'https://localhost:7084/api';

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') ?? '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, {
      email,
      password
    });
  }

  getEmployees(search = '', departmentId = '', status = '') {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (departmentId) params = params.set('departmentId', departmentId);
    if (status) params = params.set('status', status);

    return this.http.get<Employee[]>(`${this.apiUrl}/employees`, {
      headers: this.authHeaders(),
      params
    });
  }

  getDepartments() {
    return this.http.get<Department[]>(`${this.apiUrl}/departments`, {
      headers: this.authHeaders()
    });
  }

  addEmployee(employee: Employee) {
    return this.http.post<Employee>(`${this.apiUrl}/employees`, employee, {
      headers: this.authHeaders()
    });
  }

  updateEmployee(employee: Employee) {
    return this.http.put(`${this.apiUrl}/employees/${employee.id}`, employee, {
      headers: this.authHeaders()
    });
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/employees/${id}`, {
      headers: this.authHeaders()
    });
  }
}

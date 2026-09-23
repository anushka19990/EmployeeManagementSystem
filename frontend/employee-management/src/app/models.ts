export interface Department {
  id: number;
  name: string;
}

export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  salary: number;
  joiningDate: string;
  status: string;
  departmentId: number;
  department?: Department;
}

export interface LoginResponse {
  token: string;
  name: string;
  role: string;
}

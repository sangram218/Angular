import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl ='http://localhost:8080/api/v1/employees'

  constructor(private httpClient:HttpClient) { }

  // this function returns observable to the component(i.e get returns observable)
  getEmployeesList():Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseUrl}`)
  }

  // any or Object
  createEmployee(employee:Employee):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}`,employee)
  }

  getEmployeeById(id:any):Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`)
  }

  updateEmployee(id:any,employee:Employee):Observable<any>{
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`,employee)
  }

  deleteEmployee(id:any):Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`)
  }
}

import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees:Employee[]=[]

  constructor(private employeeService:EmployeeService,
    private router:Router
    ) { }

  ngOnInit(): void {
    // this.employees = [
    //   {
    //     id:1,
    //     firstName:"Sangram",
    //     lastName:"Jagtap",
    //     emailId:"Sangram@gmail.com"
    //   }
    // ]
      this.employeeService.getEmployeesList()
        .subscribe(data=>{
          this.employees=data
        })
    
  }

  onUpdate(empId:any){
    this.router.navigate(['/update-employee',empId])
  }

  onDelete(empId:any){
    this.employeeService.deleteEmployee(empId)
      .subscribe(data=>{
        this.employeeService.getEmployeesList()
        .subscribe(data1=>{
          this.employees=data1
        })
      },
      error=>console.log(error))
  }
}

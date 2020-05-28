import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
loginuser : any;
  constructor(private router :Router,private service: EmployeeService) { }

  ngOnInit() {
    this.loginuser =  this.service.getLoginUser();
    if(!(this.loginuser && this.loginuser.isLoggedIn == true && this.loginuser.loginUserRole == 'admin'))
    {
      this.router.navigateByUrl('/login');
    }

  }
  viewProfile(path)
  {
    if(path === 'user')
    {
      this.router.navigateByUrl('/user');
    }
     if(path === 'employees')
    {
      this.router.navigateByUrl('/employees');
    }
    if(path === 'email')
    {
      this.router.navigateByUrl('/email');
    }
  }

}

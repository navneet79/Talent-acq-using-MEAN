import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userName: any;
  password: any;
  role: any;
  loginUser: any = {};

  constructor(public formBuilder: FormBuilder,
    public router: Router, private userportalservice: EmployeeService) {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: ['']
    });
  }

  ngOnInit() {
    this.loginUser = this.userportalservice.getLoginUser();
    if (this.loginUser && this.loginUser.isLoggedIn) {
      if (this.loginUser.loginUserRole === 'admin') {
        this.router.navigateByUrl('/admin');
      }
      if (this.loginUser.loginUserRole === 'user') {
        this.router.navigateByUrl('/employees');
      }
    }

  }

  login() {
    this.userName = this.loginForm.value.userName;
    this.password = this.loginForm.value.password;
    this.userportalservice.getUser(this.userName).subscribe((res) => {
      if (res) {
        if (this.password == res['password']) {
          this.loginUser = {
            isLoggedIn: true,
            loginUserName: res['userName'],
            loginUserRole: res['userRole'],
            project: res['project'],
            employeeId: res['employeeId']
          };
          this.userportalservice.setLoginUser(this.loginUser);

          this.role = res['userRole'];
          if (this.role === 'admin') {
            this.router.navigateByUrl('/admin');
          }
          if (this.role === 'user') {
            this.router.navigateByUrl('/employees');
          }
        }

      }
    });


  }

}

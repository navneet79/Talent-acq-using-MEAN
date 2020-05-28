import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';

import { DatePipe } from '@angular/common';
import {Router} from '@angular/router';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, private datePipe: DatePipe,private router :Router) { }
  loginUser: any = {};
  employeeList: any;

  baseUrl = 'http://localhost:4041';

  setLoginUser(loginUser) {
    this.loginUser = loginUser;
    localStorage.clear();
    localStorage.setItem('loginUser',JSON.stringify(loginUser));
  }

  getLoginUser() {
   return (JSON.parse(localStorage.getItem('loginUser')));
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  getAllProfile() {
    return this.http.get(this.baseUrl + '/profileDetails');
  }

  getAllUsers() {
    return this.http.get(this.baseUrl + '/userDetails');
  }

  getEmails() {
    return this.http.get(this.baseUrl + '/userDetails/email');
  }

  updateEmail(email, id) {
    return this.http.put<any>(this.baseUrl + '/userDetails/email/' + id, email);
  }

  insertEmployee(employee) {
    return this.http.post<any>(this.baseUrl + '/profileDetails', employee);
  }

  updateEmployee(employee, id) {
    return this.http.put<any>(this.baseUrl + '/profileDetails/' + id, employee);
  }

  deleteEmployee(id)
  {
    return this.http.delete(this.baseUrl + '/profileDetails/' + id);
  }

  insertUser(user) {
    return this.http.post(this.baseUrl + '/userDetails', user);
  }
  updateUser(user, id) {
    return this.http.put<any>(this.baseUrl + '/userDetails/' + id, user);
  }
  deleteUser(id)
  {
    return this.http.delete(this.baseUrl + '/userDetails/' + id);
     
  }
  getUser(userName) {
    return this.http.get(this.baseUrl + '/userDetails/' + userName);
  }

  sendEmail(emailData ,to){
    emailData.to = to
    return this.http.post<any>(this.baseUrl + '/userdetails/saveemail', emailData);

  }

  // tslint:disable-next-line:member-ordering
  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    fullName: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    city: new FormControl(''),
    title: new FormControl(''),
    experience: new FormControl(''),
    skills: new FormControl([]),
  });

  // tslint:disable-next-line:member-ordering
  userform: FormGroup = new FormGroup({
    _id: new FormControl(null),
    userName: new FormControl(''),
    password: new FormControl(''),
    userRole: new FormControl(''),
    project :new FormControl(''),
    employeeId : new FormControl('')
  });

  // tslint:disable-next-line:member-ordering
    emailForm: FormGroup = new FormGroup({
    _id: new FormControl(null),
    subject: new FormControl(''),
    body: new FormControl('')

  });

  initializeFormGroup() {
    this.form.setValue({
      _id: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      title: ' ',
      experience: ' ',
      skills: [],
    });
  }

  initializeUserFormGroup() {
    this.userform.setValue({
      _id: null,
      userName: '',
      password: '',
      userRole: '',
      project: '',
      employeeId:'',
    });
  }

  initializaEmailFormGroup() {
    this.emailForm.setValue({
      _id: null,
      subject: '',
      body: ''
    });
  }

  // deleteEmployee(_id: string) {
  //   this.employeeList.remove(_id);
  // }

  populateForm(employee) {
    this.form.patchValue({
      _id: employee._id,
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      title: employee.title,
      experience: employee.experience,
      skills: employee.skills,
    });
  }

  populateUserForm(user) {
    this.userform.patchValue({
      _id: user._id,
      userName: user.userName,
      password: user.password,
      userRole: user.userRole,
      employeeId: user.employeeId,
      project :user.project
    });
  }

  populateEmailForm(email) {
    this.emailForm.patchValue({
      subject: email.subject,
      body: email.body
    });
  }
}

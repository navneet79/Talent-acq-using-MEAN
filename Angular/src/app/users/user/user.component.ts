import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { EmployeeService } from '../../shared/employee.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private service: EmployeeService,
    public dialogRef: MatDialogRef<UserComponent>) { }

  ngOnInit() {
    this.service.getAllUsers();
  }

  onClear() {
    this.service.userform.reset();
    this.service.initializeUserFormGroup();
  }

  onSubmit() {
    if (this.service.userform.valid) {
      if (!this.service.userform.get('_id').value) {
        this.service.insertUser(this.service.userform.value).subscribe();
      }
      else {
        this.service.updateUser(this.service.userform.value , this.service.userform.get('_id').value).subscribe();
        this.service.userform.reset();
      }
      this.service.initializeUserFormGroup();
      // this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }

  onClose() {
    this.service.userform.reset();
    this.service.initializeUserFormGroup();
    this.dialogRef.close();
  }

}

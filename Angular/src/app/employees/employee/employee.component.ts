import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { EmployeeService } from '../../shared/employee.service';
// import { DepartmentService } from '../../shared/department.service';
// import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skills: any = [];

  constructor(private service: EmployeeService,
    //private departmentService: DepartmentService,
    //private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EmployeeComponent>) { }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.skills.push(value.trim());
      this.service.form.patchValue(
        {
          skills: this.skills
        })
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(skill): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
      this.service.form.patchValue(
        {
          skills: this.skills
        })
    }
  }

  ngOnInit() {
    this.service.getAllProfile();
    if (this.service.form.value.skills) {
      this.skills = this.service.form.value.skills;
    }
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    //this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('_id').value) {
        this.service.insertEmployee(this.service.form.value).subscribe();
      }
      else {
        this.service.updateEmployee(this.service.form.value, this.service.form.get('_id').value).subscribe();
      }
      this.service.initializeFormGroup();
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();

    this.dialogRef.close();
  }

}

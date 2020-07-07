import { Router } from '@angular/router';
import { EmployeeService } from './../shared/employee.service';
import { Component, OnInit } from '@angular/core';
// import { Router}
// import { EmployeeService } from
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  constructor(private service: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.service.getEmails().subscribe((email) => {
      this.service.emailForm.patchValue({
        _id: email['_id'],
        subject: email['subject'],
        body: email['body']
      });
      console.log(email);
    });

  }
  back() {
    this.router.navigateByUrl('/admin');
  }

  onSearchClear() {
    this.router.navigateByUrl('/admin');
  }

  onSubmit() {

    this.service.updateEmail(this.service.emailForm.value, this.service.emailForm.value._id).subscribe((result) => {
      console.log(result);
    });
    this.router.navigateByUrl('/admin');

  }

  onCancel() {
    this.service.emailForm.reset();
    this.service.initializaEmailFormGroup();
    this.router.navigateByUrl('/admin');
  }

}

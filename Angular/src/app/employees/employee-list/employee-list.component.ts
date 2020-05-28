import { EmployeeComponent } from './../employee/employee.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { EmployeeService } from '../../shared/employee.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
// import { DepartmentService } from '../../shared/department.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
// import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: EmployeeService,
    private dialog: MatDialog,
    private router :Router
  ) { }
  isAdmin: any;
  loginUser: any;
  EmailTo: string;
  EmailBody: string;
  EmailSubject: string;
  tempList: any = [];
  listData: any = [];
  Data: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  searchCity: string;
  searchSkill: string;
  isAdvancedSearch: any;
  emailData: any = {};


  ngOnInit() {
    
    this.isAdvancedSearch = false;
    this.loginUser = this.service.getLoginUser();
    this.service.getEmails().subscribe((email) => {
      this.EmailBody = email['body'];
      this.EmailSubject = email['subject'];
    });
    if ((this.loginUser && this.loginUser.isLoggedIn == true)) {
      if (this.loginUser.loginUserRole == 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }
    this.refresh(); 

  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listData.length;
    return numSelected === numRows;
  }
  back() {
    this.router.navigateByUrl('/admin');
  }

  AdvanceSearch() {
    if (this.isAdvancedSearch === true) {
      this.tempList = this.listData;
      if(this.searchCity != "" || this.searchSkill != "")
      {
        this.displayedColumns = this.isAdmin == true ? ['select', 'fullName', 'email' , 'city', 'skills','experience', 'actions'] : ['select', 'fullName', 'email', 'city', 'skills','experience'];
        
      }
      this.tempList = this.tempList.filter(e =>
        e.city.toLowerCase().includes(this.searchCity.trim().toLowerCase()) &&
        e.skills.toString().toLowerCase().includes(this.searchSkill.trim().toLowerCase())
      );
      this.Data = new MatTableDataSource(this.tempList);
    } else {
      this.isAdvancedSearch = true;
    }
  }


  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.listData.data.forEach(row => this.selection.select(row));
  }
  onSearchClear() {
    this.searchKey = '';
    this.isAdvancedSearch = false;
    this.searchCity = "";
    this.searchSkill = "";
    this.refresh();
    this.applyFilter();
  }

  applyFilter() {
    this.Data.filter = this.searchKey.trim().toLowerCase();
  }
  SendMail() {

    console.log(this.selection.selected);
    if (this.selection.selected && this.selection.selected.length > 0) {
      this.emailData =
      {
        from: "a@pwc.com",
        to: " ",
        subject: this.EmailSubject,
        body: this.EmailBody
      }
      this.selection.selected.forEach(x =>

        this.service.sendEmail(this.emailData, x.email).subscribe((res) => {
          console.log(res);
        })
      );
      console.log(this.EmailTo);




    }
    else {
      alert("Please Select Atleast 1 User");
    }
  }


  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig).afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  refresh() {
    this.service.getAllProfile().subscribe(
      (res) => {
        console.log(res);

        this.listData = res;
        this.Data = new MatTableDataSource(this.listData);
        this.Data.paginator = this.paginator;
        this.Data.sort = this.sort;
        this.displayedColumns = this.isAdmin == true ? ['select', 'fullName', 'email', 'mobile', 'city', 'skills', 'actions'] : ['select', 'fullName', 'email', 'mobile', 'city', 'skills'];

      });

  }

  onEdit(row) {
    // row._id = row._id;
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig).afterClosed().subscribe(result => {
      this.refresh();
    });
  }
  onFocus() {
    console.log("focus");
  }
  onDelete(_id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteEmployee(_id).subscribe();
      this.refresh();
    }
  }
}

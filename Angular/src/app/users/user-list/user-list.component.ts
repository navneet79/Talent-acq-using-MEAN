import { UserComponent } from './../user/user.component';
// import { MatDialogConfig } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { EmployeeService } from './../../shared/employee.service';
// import { UserComponent} 
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  isAdmin: any;
  loginUser: any;
  listData: any;
  Data: MatTableDataSource<any>;

  // displayedColumns: string[] = ['userName', 'userRole'];
  displayedColumns: string[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;


  constructor(private service: EmployeeService, private dialog: MatDialog, private router: Router) { }


  ngOnInit() {
    this.loginUser = this.service.getLoginUser();
    this.isAdmin = this.loginUser.loginUserRole === 'admin' ? true : false;
    this.isAdmin = true;
    this.refresh();
    this.displayedColumns = this.isAdmin == true ? ['employeeId', 'userName', 'project', 'userRole', 'actions'] : ['employeeId', 'userName', 'project', 'userRole'];
  }

  onSearchClear() {
    this.searchKey = ' ';
    this.applyFilter();
  }

  applyFilter() {
    this.Data.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeUserFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(UserComponent, dialogConfig).afterClosed().subscribe(result => {
      this.refresh();
    });
  }
  back() {
    this.router.navigateByUrl('/admin');
  }
  onEdit(row) {
    this.service.populateUserForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(UserComponent, dialogConfig).afterClosed().subscribe(result => {
      this.refresh();
    });;
  }

  refresh() {
    this.service.getAllUsers().subscribe(
      (res) => {
        this.listData = res;
        this.Data = new MatTableDataSource(this.listData);
        this.Data.paginator = this.paginator;
        this.Data.sort = this.sort;
      });

  }

  onDelete(_id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteUser(_id).subscribe();
      this.refresh();
    }
  }

}

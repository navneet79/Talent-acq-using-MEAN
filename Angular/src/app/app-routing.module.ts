import { EmailComponent } from './email/email.component';
//import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { AdminComponent } from './admin/admin.component';
//import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component'
import { UsersComponent } from './users/users.component'

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UsersComponent },
  { path: 'email', component: EmailComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

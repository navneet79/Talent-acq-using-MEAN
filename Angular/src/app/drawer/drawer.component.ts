import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {

  constructor(public service: EmployeeService) { }
  @Input()
  IsLogout: any;
  
  availableFunc: any = ['user','email','employees']
  ngOnInit() {
  }

}

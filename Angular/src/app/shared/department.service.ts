// import { Injectable } from '@angular/core';

// import * as _ from 'lodash';

// @Injectable({
//   providedIn: 'root'
// })
// export class DepartmentService {
//   departmentList: AngularFireList<any>;
//   array = [];

//   constructor(private firebase: AngularFireDatabase) {
//     this.departmentList = this.firebase.list('departments');
//     this.departmentList.snapshotChanges().subscribe(
//       list => {
//         this.array = list.map(item => {
//           return {
//             _id: item.key,
//             ...item.payload.val()
//           };
//         });
//       });
//    }


//    getDepartmentName(_id) {
//     if (_id == "0")
//       return "";
//     else{
//       return _.find(this.array, (obj) => { return obj._id == _id; })['name'];
//     }
//   }

// }

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  initData = [{
    _id: 0,
    age: 35,
    name: 'Colleen Coleman',
    med: 'POOCHIES',
    email: 'colleencoleman@poochies.com'
  },
  {
    _id: 1,
    age: 38,
    name: 'Jacobson Shelton',
    med: 'QUORDATE',
    email: 'jacobsonshelton@quordate.com'
  },
  {
    _id: 2,
    age: 33,
    name: 'Grimes Mays',
    med: 'SPEEDBOLT',
    email: 'grimesmays@speedbolt.com'
  },
  {
    _id: 3,
    age: 24,
    name: 'Kathrine Roman',
    med: 'WAAB',
    email: 'kathrineroman@waab.com'
  },
  {
    _id: 4,
    age: 31,
    name: 'Martha Maxwell',
    med: 'LYRICHORD',
    email: 'marthamaxwell@lyrichord.com'
  },
  {
    _id: 5,
    age: 21,
    name: 'Test Warnder',
    med: 'XEON',
    email: 'testwarnder@xeon.commmmm'
  }

  ];
  private mainData: BehaviorSubject<any> = new BehaviorSubject<any>(this.initData);
  public mainDataObs = this.mainData.asObservable();
  constructor() {
  }

  addUser(body) {
    let id: any = this.initData[this.initData.length - 1]._id;
    body._id = ++id;
    this.initData = [...this.initData, body];
    this.mainData.next(this.initData);
    console.log(this.initData);
  }

  deleteUser(index) {
    this.initData.splice(index, 1);
  }

  editUser(body) {
    console.log(body);
    let newArray = this.initData.map((item: any) => {
      return item._id === body._id ? body : item;
    });
    this.initData = newArray;
    this.mainData.next(this.initData);
  }

  sortData(state: boolean) {
    console.log(state);
    state ? this.initData.sort(this.sortFunc) :
      this.initData.sort(this.unSortFunc);
  }

  sortFunc(userO, userT) {
    // Sort by age
    if (userO.age < userT.age) { return -1; }
    if (userO.age > userT.age) { return 1; }
    return 0;
  }
  unSortFunc(userO, userT) {
    // sort by _id so it will be unsorted again
    if (userO._id < userT._id) { return -1; }
    if (userO._id > userT._id) { return 1; }
    return 0;
  }
}

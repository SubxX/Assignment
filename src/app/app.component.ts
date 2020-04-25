import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from './global-service/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  dataTBS: any;
  initData: Array<any>;
  tempSubscription: any;
  sortStatus = false;
  constructor(private gs: GlobalService) {
  }
  ngOnInit() {
    this.tempSubscription = this.gs.mainDataObs.subscribe((data) => {
      this.initData = data;
    });
    this.scrollHandeler();
  }

  sendData(useData) {
    this.dataTBS = useData;
  }
  clearEditdata() {
    this.dataTBS = undefined;
  }
  deleteItem(index) {
    this.dataTBS = undefined;
    this.gs.deleteUser(index);
  }
  sort() {
    this.sortStatus = !this.sortStatus;
    if (this.sortStatus) {
      this.gs.sortData(this.sortStatus);
    } else {
      this.gs.sortData(this.sortStatus);
    }
  }
  compareFunc(userO, userT) {
    if (userO.age < userT.age) { return -1; }
    if (userO.age > userT.age) { return 1; }
    return 0;
  }

  scrollHandeler() {
    setTimeout(() => {
      const inner = document.querySelector('.inner');
      inner.scrollTop = inner.scrollHeight - inner.clientHeight;
    }, 10);
  }

  ngOnDestroy() {
    this.tempSubscription.unsubscribe();
  }
}

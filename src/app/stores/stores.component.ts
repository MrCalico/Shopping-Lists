import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  @Output() openStoreItems = new EventEmitter();

  stores: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase, private router: Router) {
      this.stores = db.list('/stores');
    }

  ngOnInit() {
    console.log('ngOnInit(Stores)');
  }

/* Replaced in HTML with routerLink
  showStoreItems(store) {
    this.openStoreItems.emit(false);
    this.router.navigate(['storelist', store]);
  }
*/
}

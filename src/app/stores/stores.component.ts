import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  stores: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase) {
      this.stores = db.list('/stores');
    }

  ngOnInit() {
    console.log('ngOnInit(Stores)');
  }

}

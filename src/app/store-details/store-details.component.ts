import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/map';

import { IStore } from '../services/store.model';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css']
})
export class StoreDetailsComponent implements OnInit {

  storeName = 'Ralphs';

  store: IStore = <IStore>{};
  stores: any;
  storeKey: string = '0';

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute ) {

  }

  ngOnInit() {

    this.stores = this.db.list('/stores');
    this.storeKey = this.route.snapshot.params['id'];

   }

  submit(values) {

    console.log('name: ', values);
    for (let key in values) {
        if (values.hasOwnProperty(key)) {
              console.log(key + " -> " + values[key]);
              if (values[key]) {
                this.store[key] = values[key];
              }
        }
    }

  this.db.list('/stores').update(this.storeKey, this.store);

  }

  addnew(values) {
  }

}
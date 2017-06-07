import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  storeKey: string;

  constructor(private db: AngularFireDatabase, private route: Router ) {

  this.db.list('/stores', {
            query: {
                orderByChild: 'name',
                equalTo: this.storeName
              },
              preserveSnapshot: true
            }).subscribe( store => store.map( s => { this.store = s.val(); this.storeKey = s.key; } ) );
  }

  ngOnInit() { }

  submit(values) {

    this.db.list('/stores').update(this.storeKey, this.store);
  }

  addnew(values) {
  }

}

// Expunged Code:
/*
  storeForm: FormGroup;
  store: IStore = {
    name: 'ralphs',
    firstName: 'John',
    lastName: 'Kallie',
    address: '1010 Wilshire Blvd.',
    url: 'http://ralphs.com',
    iconPath: 'c:/temp/icon.jpg'
  };

      this.store.name = 'Ralphs'
      this.store.firstName = 'John';
      this.store.lastName = 'Kallie';
      this.store.address = '1010 Wilshire Blvd.';
      this.store.url = 'http://ralphs.com';
      this.store.iconPath = 'c:/temp/icon.jpg';

      this.storeForm = new FormGroup({
        name: new FormControl(this.store.name),
        address: new FormControl(this.store.address),
        firstName: new FormControl(this.store.firstName),
        lastName: new FormControl(this.store.lastName)
      });

    console.log(this.store.name);
    console.log(this.store);
    this.storeForm.controls.name.setValue(this.store.name);
*/

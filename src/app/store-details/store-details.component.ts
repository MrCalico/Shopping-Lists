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
  storeKey: string;

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute ) {

  }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.db.list('/stores', {
            query: {
                orderByChild: 'name',
                equalTo: params['id']
              },
              preserveSnapshot: true
            }).subscribe( store => store.map( s => { this.store = s.val(); this.storeKey = s.key; } ) );
    })
   }

  submit(values) {

    this.db.list('/stores').update(this.storeKey, this.store);
  }

  addnew(values) {
  }

}
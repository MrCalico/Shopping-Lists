import { Injectable } from '@angular/core';
import { FirebaseListObservable,
         FirebaseObjectObservable,
         AngularFireDatabase } from 'angularfire2/database';
import { IStoreList, IStoreItem } from './store-list.model';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/count';

@Injectable()
export class StoreItemsService {

  listItems: FirebaseListObservable<any[]>;
  items: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) { }

  getItems() {
      this.items = this.db.list('/items');
      return(this.items);
  }

  getItemsArray(): string[] {
     let itemNames = [];
     this.getItems()
      .subscribe(items => items
        .forEach(item => itemNames.push(item.name)));
     return(itemNames);
  }

  getStoreItems(store) {
    this.listItems = this.db.list('/stores/0/items');
    return(this.listItems);

  }

  getNextSeq(store) {
     let count = 0;
     this.getStoreItems(store)
        .subscribe(i => i.forEach(c => ++count ));
    return(count + 1);
  }

  addItem(formValues) {
    console.log(formValues);
  }

}

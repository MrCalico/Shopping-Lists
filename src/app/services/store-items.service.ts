import { Injectable } from '@angular/core';
import { FirebaseListObservable,
         FirebaseObjectObservable,
         AngularFireDatabase } from 'angularfire2/database';
import { IStoreList, IStoreItem } from './store-list.model';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/count';

interface IFbKey {
  key: string;
}

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

  getStoreItemByKey(store, key) {
  }

  getStoreItemByName(store, name) {
  }

  getNextSeq(store) {
     let count = 0;
     this.getStoreItems(store)
        .subscribe(i => i.forEach(c => ++count ));
    return(count + 1);
  }

  addItem(listSeq: number, itemName: string, itemNote: string, dateTouched = new Date) {
    const newItem = {
      'listSeq': listSeq,
      'name': itemName,
      'note': itemNote,
      'dateTouched': dateTouched
    };
    console.log(newItem);
    let key = this.listItems.push(newItem);
    this.listItems.update( key, { 'dateTouched': dateTouched } );
  }

  check(key) {
    let checked: boolean = false;
    console.log(key);
    this.db.object('/stores/0/items/' + key)
      .subscribe( i => i.checked ? checked = false : checked = true );
    console.log(checked);
    this.db.list('/stores/0/items/')
           .update( key, { 'checked': checked, 'dateTouched': new Date } );
  }

  deleteItem(key) {
    console.log('Delete: ' + key);
  }
}


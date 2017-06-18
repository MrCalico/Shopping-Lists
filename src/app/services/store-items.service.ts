import { Injectable } from '@angular/core';
import { FirebaseListObservable,
         FirebaseObjectObservable,
         AngularFireDatabase } from 'angularfire2/database';
import { IStoreList, IStoreItem } from './store-list.model';
import { IStore } from './store.model';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/distinct';

interface IFbKey {
  key: string;
}

@Injectable()
export class StoreItemsService {

  listItems: FirebaseListObservable<any[]>;
  items: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) { }

  getItems() {
      return(this.items = this.db.list('/items', {
      query: {
        orderByChild: 'name'
      }
    }));
  }

  getItemCategories() {
    return(this.db.list('/items', {
      query: {
        orderByChild: 'category'
      }
    }));
  }

  getItemCategory(name) {
      return this.db.list('/items', {
        query: {
          orderByChild: 'name',
          equalTo: name
        }
      });
  }

  getItemCategoriesDistinct() {
    return(this.db.list('/items',
      { preserveSnapshot: true, query: {orderByChild: 'category', limitToFirst: 1}} ));

  }

  getItemsByCategory() {
      return(this.items = this.db.list('/items', {
      query: {
        orderByChild: 'category'
      }
    }));
  }

  getItemsArray(): string[] {
     let itemNames: string[] = [];
     let i = 0;
     console.log('i: ',i);
     this.getItems()
      .subscribe(items => items
        .forEach(item => { itemNames.push(item.name) } ));
     return(itemNames);
  }

  getItemsCategoryArray(): string[] {
    let itemCategories: string[] = [];
    this.getItems()
      .subscribe(items => items
        .forEach(item => {
          if ( itemCategories.indexOf(item.category) === -1) {
               itemCategories.push(item.category);
          }
        } ));
   return(itemCategories);
  }

  getStoreItems(storeId, reverse) {
    this.listItems = this.db.list('/stores/' + storeId + '/items');
    if (reverse) { 
      return(this.listItems.map(i => { return i.reverse(); } ));
    } else {
      return(this.listItems);
    }
  }

  getStoreItemByKey(store, key) {
  }

  getStoreItemByName(store, name) {
  }

  getNextSeq(storeId) {
     let count = 0;
     this.getStoreItems(storeId, false)
        .subscribe(i => i.forEach(c => ++count ));
    return(count + 1);
  }

  addItem(listSeq: number, itemName: string, itemNote: string, itemCategory: string, dateTouched = new Date) {
    const newItem = {
      'listSeq': listSeq,
      'name': itemName,
      'note': itemNote,
      'category': itemCategory,
      'dateTouched': dateTouched
    };
    console.log(newItem);
    let key = this.listItems.push(newItem);
    this.listItems.update( key, { 'dateTouched': dateTouched } );
  }

  check(storeId, key) {
    let checked: boolean = false;
    console.log(key);
    this.db.object('/stores/' + storeId + '/items/' + key)
      .subscribe( i => i.checked ? checked = false : checked = true );
    console.log(checked);
    this.db.list('/stores/' + storeId + '/items/')
           .update( key, { 'checked': checked, 'dateTouched': new Date } );
  }

  deleteItem(storeId, key) {
    console.log('Delete: ' + key);
    this.listItems.remove(key);
  }

  getStoreItemsByDate(storeId, reverse) {
    const queryObservable = this.db.list('/stores/' + storeId + '/items', {
      query: {
        orderByChild: 'dateTouched'
      }
    });
    if (reverse) {
      return( queryObservable.map( (arr) => { return arr.reverse() })  );
    } else {
      return( queryObservable );
    }
  }

  getStoreItemsByCategory(storeId) {
    return( this.db.list('/stores/' + storeId + '/items', {
      query: {
        orderByChild: 'category'
      }
    }));
  }

  getStoreIdByName(name): string {
    let key = '0';
    let keys = this.db.list('/stores', { preserveSnapshot: true,
      query: {
        orderByChild: 'name',
        equalTo: name
      }
    }).map(snaps => snaps.forEach(snap => snap.key) );
    console.log('getStoreId(' + name + '): ', keys.subscribe(k => { key = k }));
    return(key);
  }

  getStoreByName(name): FirebaseListObservable<any> {
    return(this.db.list('/stores', {
      query: {
        orderByChild: 'name',
        equalTo: name
      }
    }));
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

interface Item  {
   name: string;
 }

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

 listItems: FirebaseListObservable<any[]>;
 items: FirebaseListObservable<any[]>;

 addMode: boolean = false;
 newItem = { 'listSeq' : 0, 'name' : '', 'note': '', 'checked': false };
 newItemName: FormControl;

 filteredItems: any;
 itemNames: string[] = [];

  constructor(db: AngularFireDatabase) {
      this.listItems = db.list('/stores/0/items');
      this.items = db.list('/items');
      this.items.subscribe(items => items.forEach(item => this.itemNames.push(item.name)));

      this.newItemName = new FormControl();
      this.filteredItems = this.newItemName.valueChanges
        .startWith(null)
        .map(i => this.filterItems(i));
    }

  filterItems(val: string) {
      return val ? this.itemNames.filter(item => new RegExp(`^${val}`, 'gi').test(item))
               : this.itemNames;
  }

  ngOnInit() {
    console.log('ngOnInit(StoreListComponent)');
  }

  addItem() {
    console.log('add item clicked.');
    this.newItem.listSeq = 4;
    this.addMode = true;
  }

  cancelItem() {
    this.addMode = false;
  }

}

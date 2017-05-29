import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

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
 itemsArray: any;

 addMode: boolean = false;
 newItem = { 'listSeq' : 0, 'name' : '', 'note': '', 'checked': false };
 newItemName: FormControl;

 filteredItems: any;

  constructor(db: AngularFireDatabase) {
      this.listItems = db.list('/stores/0/items');
      this.items = db.list('/items');

      this.newItemName = new FormControl();

      this.filteredItems = this.newItemName.valueChanges
      //  .startWith(null)
        .map(I => this.filterItems(I));
      /*
      this.newItemName.valueChanges.subscribe(
        c => { 
          console.log(c);
        },
        e => console.log(e.message),
        () => console.log('complete')
      );*/
      console.log(this.filteredItems);
    }

  ngOnInit() {
    console.log('ngOnInit(StoreListComponent)');
  }

  addItem() {
    console.log('add item clicked.');
    //this.items.subscribe(i => this.itemsArray.push(i) );
    //console.log(this.itemsArray);
    this.newItem.listSeq = 4;
    this.addMode = true;
  }

  cancelItem() {
    this.addMode = false;
  }

    filterItems(val: string) {
    return (this.items);
    /*
    return val ? this.items.filter(i => new RegExp(`^${val}`, 'gi').test(i))
               : this.items;
    */
  }

}

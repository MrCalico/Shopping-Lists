import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

 listItems: FirebaseListObservable<any[]>;
 addMode: boolean = false;

  constructor(db: AngularFireDatabase) {
      this.listItems = db.list('/stores/0/items');
    }

  ngOnInit() {
    console.log('ngOnInit(StoreListComponent)');
    //this.listItems.map(i => console.log(i.name));
  }

  addItem() {
    console.log('add item clicked.');
    this.addMode = true;
  }

  cancelItem() {
    this.addMode = false;
  }

}

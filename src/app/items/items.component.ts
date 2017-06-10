import { Component, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreItemsService} from '../services/store-items.service';

import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {

  items: any; //FirebaseListObservable<any[]>;
  categories: any; //FirebaseListObservable<any[]>;

  constructor(private sis: StoreItemsService, private db: AngularFireDatabase) { }

  ngOnInit() {
    // this.items = this.db.list('/items');
    // this.items = this.sis.getItems().take(10);
    // this.categories = this.sis.getItemCategoriesDistinct();
    // this.db.object('/items', {preserveSnapshot: true}).map( i => i.category).subscribe(i => { console.log(i.val()) } );
    // this.categories = this.db.list('/items').filter(item => category[category]);
  }

}

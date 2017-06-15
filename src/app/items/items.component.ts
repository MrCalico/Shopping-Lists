import { Component, OnInit, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreItemsService} from '../services/store-items.service';

import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

import 'rxjs/add/operator/distinct';
import { UniquePipe } from '../unique.pipe';
import { CategoryItemsPipe } from '../category-items.pipe';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {

  items: any; // FirebaseListObservable<any[]>;
  categories: any; // FirebaseListObservable<any[]>;

  categoryView = ['hello'];

  remove_circle_outline = 'remove_circle_outline';
  add_circle_outline = 'add_circle_outline';
  iconTag = 'add_circle_outline';

  constructor(private sis: StoreItemsService, private db: AngularFireDatabase) { }

  ngOnInit() {

    this.categories = this.db.list('/items', { query: { orderByChild: 'category' }} );
    this.items = this.db.list('/items', { query: { orderByChild: 'category'}}); // , equalTo: this.category }} );
  }

  expand(category) {
    console.log('expand', category);
    this.categoryView.push(category);
    this.items = this.db.list('/items', { query: { orderByChild: 'category'}});
    this.iconTag = 'remove_circle_outline';
  }

  collapse(category) {
    this.categoryView = [];
    console.log('collapse', category);
    this.items = this.db.list('/items', { query: { orderByChild: 'category'}});
    this.iconTag = 'add_circle_outline';
  }

  toggleView(category) {
    if (this.categoryView.indexOf(category) >= 0 ) {
      this.collapse(category);
    } else {
      this.expand(category);
    }
  }

  view(category) {

      if( this.categoryView.indexOf(category) >= 0 ) {
          return true;
        } else {
          return false;
        }
  }
}

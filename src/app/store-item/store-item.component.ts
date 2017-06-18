import { Component, Input, OnInit } from '@angular/core';
import { IStoreItem } from '../services/store-list.model';
import { StoreItemsService } from '../services/store-items.service';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.css']
})
export class StoreItemComponent implements OnInit {

@Input() item: IStoreItem;
@Input() storeId;
@Input() returnClick: EventListener;

  constructor(private sis: StoreItemsService) { }

  ngOnInit() {  }

  itemCheck(key) { this.sis.check(this.storeId, key); }

  deleteItem(key) { this.sis.deleteItem(this.storeId, key); }

  drag(ev) {
    console.log(ev);
  }

  touchStart(ev) {
    console.log('start')

  }

  touchMove(ev) {
    console.log('Move',ev);
  }

  touchEnd(ev) {
    console.log('TouchEnd',ev)
  }

}

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
@Input() returnClick: EventListener;

  constructor(private sis: StoreItemsService) { }

  ngOnInit() {  }

  itemCheck(key) { this.sis.check(key); }

  deleteItem(key) { this.sis.deleteItem(key); }

}

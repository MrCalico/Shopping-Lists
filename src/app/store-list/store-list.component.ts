import { Component, OnInit, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { IStoreItem, IStoreList } from './../services/store-list.model';
import { StoreItemsService } from '../services/store-items.service';
import { EventEmitterService } from '../services/event-emitter.service';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/count';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

 @Output() hideNavBar = true;
 addMode: boolean = false;
 sortType: string = 'sequence';
 lastSortType: number = 0;

 labelDate: string = 'Date';
 labelChecked: string = 'Checked';
 labelOrder: string = "Ascending";
 labelCategory: string = "Category";

 public newItemForm: FormGroup;
 public newItemName: FormControl;
 public newItemNote: FormControl;
 public newItemSeq: FormControl;

 private currentStore = 0;

 filteredItems: any;
 itemNames: string[];  // Arrary for Autocomplete filtering
 itemCategories: string[];

 listItems: any;

 constructor(private _fb: FormBuilder, private sis: StoreItemsService,
             private route: Router, private ees: EventEmitterService ) { }

 filterItems(val: string) {
      return val ? this.itemNames.filter(item => new RegExp(`^${val}`, 'gi').test(item)) : this.itemNames;
 }

  ngOnInit() {

    this.itemNames = this.sis.getItemsArray();
    this.itemCategories = this.sis.getItemsCategoryArray();

    console.log(this.itemNames);

    this.currentStore = 0;  // TODO: get store parameter from snapshot.

    this.ees.hideNavBar(true);

    this.newItemName = new FormControl('', Validators.required);
    this.newItemSeq =  new FormControl('', Validators.required);
    this.newItemNote = new FormControl('');

    this.newItemForm = new FormGroup({
       newItemName: this.newItemName,
       newItemSeq:  this.newItemSeq,
       newItemNote: this.newItemNote
    });

    this.listItems = this.sis.getStoreItems(this.currentStore, false);

    this.filteredItems = this.newItemForm.controls.newItemName.valueChanges
      .startWith(null)
      .map(i => this.filterItems(i));

  }

  itemCheck(key) {
    this.sis.check(key);
  }

  addItem() {
    this.addMode = true;
    console.log('add item clicked.');
    this.newItemSeq.setValue(this.sis.getNextSeq(this.currentStore));
    this.newItemName.setValue(null);
    this.newItemNote.setValue(null);

    // this.sis.addItem(this.sis.getNextSeq(this.currentStore), null, null);
  }

  cancelItem() {
    this.addMode = false;
  }

  saveNewItem(fV) {
    if (this.newItemForm.valid) {
      console.log('saving formValue');
      this.sis.addItem(fV.newItemSeq, fV.newItemName, fV.newItemNote, this.itemCategories[this.itemNames.indexOf(fV.newItemName)] );
      this.addMode = false;
    } else {
      alert('Input Invalid');
    }
  }

  sortBy(sortType, reverse) {

    if ( sortType === 0) {
      this.listItems = this.sis.getStoreItems(this.currentStore, reverse);
    }
    if ( sortType === 1 ) {
      this.listItems = this.sis.getStoreItemsByDate(this.currentStore, reverse);
    }
    this.lastSortType = sortType;
   }

    toggleCheck() {
      console.log('Toggle Check');
        this.labelChecked =
          this.labelChecked === 'Checked' ? 'Unchecked' : 'Checked';
        this.sortBy(this.lastSortType, this.labelDate === 'Newer' ? true : false );
    }

    toggleDate() {
      console.log('Toggle Date')
      this.labelDate =
        this.labelDate === 'Newer' ? 'Older' : 'Newer';
      this.sortBy(1, this.labelDate === 'Newer' ? true : false );
    }

    toggleOrder() {
      console.log('Toggle Order');
      this.labelOrder =
        this.labelOrder === 'Ascending' ? 'Descending' : 'Ascending';
      this.sortBy(0, this.labelOrder === 'Ascending' ? false : true);
    }

    toggleCategory() {
      console.log('Toggle Category');
      if ( this.labelCategory === 'Category On' ) {
        this.labelCategory = 'Category Off';
        this.listItems = this.sis.getStoreItemsByCategory(this.currentStore);
    } else {
        this.labelCategory = 'Category On';
        switch(this.lastSortType) {
          case 0:
            this.listItems = this.sis.getStoreItems(this.currentStore, this.labelOrder === 'Ascending' ? false : true );
            break;
          case 1:
            this.listItems = this.sis.getStoreItemsByDate(this.currentStore, this.labelOrder === 'Ascending' ? false : true );
            break;
        }
      }
    }

  return() {
    console.log('return clicked');
    this.route.navigate(['stores']);
  }
}

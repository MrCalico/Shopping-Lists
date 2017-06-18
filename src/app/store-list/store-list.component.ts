import { Component, OnInit, OnChanges, Output, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router'
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
 labelChecked: string = 'check_box';
 labelOrder: string = "sort";
 labelCategory: string = "toc";

 public newItemForm: FormGroup;
 public newItemName: FormControl;
 public newItemNote: FormControl;
 public newItemSeq: FormControl;
 public newItemCategory: FormControl;

 @Output() storeId;

 filteredItems: any;
 filteredCategories: any;

 itemNames: string[];       // Arrary for Autocomplete filtering
 itemCategories: string[];  // Array of Categories

 listItems: any;

 constructor(private _fb: FormBuilder, private sis: StoreItemsService,
             private router: Router, private route: ActivatedRoute,
             private ees: EventEmitterService ) { }

 filterItems(val: string) {
      return val ? this.itemNames.filter(item => new RegExp(`^${val}`, 'gi').test(item)) : this.itemNames;
 }

 filterCategories(val: string) {
      return val ? this.itemCategories.filter(category => new RegExp(`^${val}`, 'gi').test(category)) : this.itemCategories;
 }
  ngOnInit() {

    this.itemNames = this.sis.getItemsArray();
    this.itemCategories = this.sis.getItemsCategoryArray();

    console.log(this.itemNames);

    this.storeId = this.route.snapshot.params['id'];

    this.ees.hideNavBar(true);

    this.newItemName = new FormControl('', Validators.required);
    this.newItemSeq =  new FormControl('', Validators.required);
    this.newItemNote = new FormControl('');
    this.newItemCategory = new FormControl('', Validators.required);

    this.newItemForm = new FormGroup({
       newItemName: this.newItemName,
       newItemSeq:  this.newItemSeq,
       newItemNote: this.newItemNote,
       newItemCategory: this.newItemCategory
    });

    this.listItems = this.sis.getStoreItems(this.storeId, false);

    this.filteredItems = this.newItemForm.controls.newItemName.valueChanges
      .startWith(null)
      .map(i => this.filterItems(i));

    this.filteredCategories = this.newItemForm.controls.newItemCategory.valueChanges
      .startWith(null)
      .map(c => this.filterCategories(c));

    this.newItemForm.controls.newItemName.valueChanges
        .filter(item => (item === null) ? false : true )
        .filter( item =>  { 
            if (this.itemNames.indexOf(item) !== -1) {
              return true;
            } else {
              this.newItemForm.controls.newItemCategory.setValue(null); // clear category
              return false;
            } })
        .map( item => this.sis.getItemCategory(item).map( o => o[0]['category'] )
        .subscribe(c => this.newItemForm.controls.newItemCategory.setValue(c) ) )
        .subscribe();
}

  itemCheck(key) {
    this.sis.check(this.storeId, key);
  }

  addItem() {
    this.addMode = true;
    console.log('add item clicked.');
    this.newItemSeq.setValue(this.sis.getNextSeq(this.storeId));
    this.newItemName.setValue(null);
    this.newItemNote.setValue(null);
    this.newItemCategory.setValue(null);

    // this.sis.addItem(this.sis.getNextSeq(this.storeId), null, null);
  }

  cancelItem() {
    this.addMode = false;
  }

  saveNewItem(fV) {
    if (this.newItemForm.valid) {
      console.log('saving formValue');

      this.sis.addItem(fV.newItemSeq, fV.newItemName, fV.newItemNote, fV.newItemCategory);
      this.addMode = false;
    } else {
      alert('Input Invalid');
    }
  }

  sortBy(sortType, reverse) {

    if ( sortType === 0) {
      this.listItems = this.sis.getStoreItems(this.storeId, reverse);
    }
    if ( sortType === 1 ) {
      this.listItems = this.sis.getStoreItemsByDate(this.storeId, reverse);
    }
    this.lastSortType = sortType;
   }

    toggleCheck() {
      console.log('Toggle Check');
        this.labelChecked =
          this.labelChecked === 'check_box' ? 'indeterminate_check_box' : 'check_box';
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
        this.labelOrder === 'sort' ? 'low_priority' : 'sort';
      this.sortBy(0, this.labelOrder === 'sort' ? false : true);
    }

    toggleCategory() {
      console.log('Toggle Category');
      if ( this.labelCategory === 'toc' ) {
        this.labelCategory = 'list';
        this.listItems = this.sis.getStoreItemsByCategory(this.storeId);
    } else {
        this.labelCategory = 'toc';  // Category On
        switch(this.lastSortType) {
          case 0:
            this.listItems = this.sis.getStoreItems(this.storeId, this.labelOrder === 'sort' ? false : true );
            break;
          case 1:
            this.listItems = this.sis.getStoreItemsByDate(this.storeId, this.labelOrder === 'sort' ? false : true );
            break;
        }
      }
    }

  return() {
    console.log('return clicked');
    this.router.navigate(['stores']);
  }
}

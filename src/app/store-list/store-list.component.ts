import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IStoreItem, IStoreList } from './../services/store-list.model';
import { StoreItemsService } from './../services/store-items.service';


import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/count';

interface Item  {
   name: string;
 }

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

 addMode: boolean = false;

 public newItemForm: FormGroup;
 public newItemName: FormControl;
 public newItemNote: FormControl;
 public newItemSeq: FormControl;

 private currentStore = 0;

 filteredItems: any;
 itemNames = [];  // Arrary for Autocomplete filtering
 listItems: any;

 constructor(private _fb: FormBuilder, private sis: StoreItemsService ) { }

 filterItems(val: string) {
      return val ? this.itemNames.filter(item => new RegExp(`^${val}`, 'gi').test(item))
               : this.itemNames;
 }

  ngOnInit() {
    this.listItems = this.sis.getStoreItems(this.currentStore);
    this.itemNames = this.sis.getItemsArray();
    this.currentStore = 0;  // TODO: get store parameter from snapshot.

      this.newItemName = new FormControl('', Validators.required);
      this.newItemSeq =  new FormControl('', Validators.required);
      this.newItemNote = new FormControl('');

      this.newItemForm = new FormGroup({
        newItemName: this.newItemName,
        newItemSeq:  this.newItemSeq,
        newItemNote: this.newItemNote
      });

      this.filteredItems = this.newItemForm.controls.newItemName.valueChanges
        .startWith(null)
        .map(i => this.filterItems(i));
  }

  itemCheck(key) {
    this.sis.check(key);
  }

  addItem() {
    console.log('add item clicked.');
    this.newItemSeq.setValue(this.sis.getNextSeq(this.currentStore));
    this.newItemName.setValue(null);
    this.newItemNote.setValue(null);
    this.addMode = true;
  }

  cancelItem() {
    this.addMode = false;
  }

  saveNewItem(fV) {
    if (this.newItemForm.valid) {
      console.log('saving formValue');
      this.sis.addItem(fV.newItemSeq, fV.newItemName, fV.newItemNote);
      this.addMode = false;
    } else {
      alert('Input Invalid');
    }
  }

}

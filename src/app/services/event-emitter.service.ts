import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventEmitterService {

  viewNavBar = new EventEmitter();

  constructor() { }

  hideNavBar(data: boolean) {
    this.viewNavBar.emit(false);
    console.log('hideNavBar: emmitting view: false');
  }

  showNavBar(data: boolean) {
    this.viewNavBar.emit(true);
    console.log('showNavBar: emmitting view: true');
  }

}
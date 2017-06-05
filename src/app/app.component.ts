import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shopping Lists App';
  @Output() showNavBar = true;
  @Input() activate: EventListener;

  constructor() { }

  onActivate(e) {
    console.log('onActivate');
    if ( e.hideNavBar ) {
      this.showNavBar = false;
    }
  }

  onDeactivate(e) {
    console.log('onDeactivate');
    if ( e.hideNavBar ) {
      this.showNavBar = true;
    }
  }
}

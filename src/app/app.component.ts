import { Component, Input, EventEmitter, Output, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Shopping Lists App';
  @Output() showNavBar = true;
  @Input() activate: EventListener;
  @Input() viewNavBar: EventListener;

  constructor(private ren: Renderer2) { }

  ngOnInit() {
    this.ren.listen('document', 'viewNavBar', (evt) => {
      console.log('navBarEvent!', evt);
    });
  }

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

  onViewNavBar($event) {
    console.log('onViewNavBar Event!');
  }
  
}

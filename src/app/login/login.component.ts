import { Component, OnInit, Output } from '@angular/core';
import { AngularFireAuthProvider } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

@Output() hideNavBar = true;

  constructor() { }

  ngOnInit() {
  }

  login() {

  }

  logoff() {

  }

}

import { Component, OnInit, Output } from '@angular/core';
import { AngularFireAuthProvider } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { MdSnackBar } from '@angular/material';
import { EventEmitterService } from '../services/event-emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

@Output() hideNavBar = true;

  constructor(private afAuth: AngularFireAuth,
                  private snackBar: MdSnackBar,
                  private ees: EventEmitterService,
                  private router: Router)   { }

  ngOnInit(): void {
    let message = '';
    let action='';
    this.afAuth.authState.subscribe(d => {
      if (d == null) {
        message = 'Please Logon';
        action = 'Logged Off';
      } else {
        message = d.displayName;
        action = 'Logged In';
        this.hideNavBar = false;
        this.ees.showNavBar(true);

      }
      console.log(message);
      console.log(d);
      this.snackBar.open( action, message, { duration: 2000, })
      .afterDismissed().subscribe(() => {
            console.log('The snack-bar was dismissed');
            if (d !== null) {
              this.hideNavBar = false;
              this.router.navigate(['stores']);
            }
        });
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}

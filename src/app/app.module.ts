import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { MaterialModule } from '@angular/material';
import { MdGridListModule, MdCheckboxModule, MdInputModule } from '@angular/material';

import { StoresComponent } from './stores/stores.component';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreItemsService } from './services/store-items.service';

@NgModule({
  declarations: [
    AppComponent,
    StoresComponent,
    StoreDetailsComponent,
    LoginComponent,
    ListComponent,
    NavbarComponent,
    StoreListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    MdGridListModule,
    MdCheckboxModule,
    MdInputModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: 'stores', component: StoresComponent },
      { path: 'stores/:id', component: StoreDetailsComponent },
      { path: 'storelist/:id', component: StoreListComponent}
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [StoreItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { NavbarComponent } from './navbar/navbar.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreItemComponent } from './store-item/store-item.component';

import { StoreItemsService } from './services/store-items.service';
import { EventEmitterService } from './services/event-emitter.service';

// FirebaseUI
import {AuthMethods, AuthProviders, FirebaseUIAuthConfig,
        FirebaseUIModule} from 'firebaseui-angular';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
  providers: [
    AuthProviders.Google,
    AuthProviders.Facebook,
    AuthProviders.Twitter,
    AuthProviders.Github,
    AuthProviders.Password,
    AuthProviders.Phone
  ],
  method: AuthMethods.Popup,
  tos: '<your-tos-link>'
};

@NgModule({
  declarations: [
    AppComponent,
    StoresComponent,
    StoreDetailsComponent,
    LoginComponent,
    NavbarComponent,
    StoreListComponent,
    StoreItemComponent,
    ItemsComponent,
    ItemDetailComponent
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
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'stores', component: StoresComponent },
      { path: 'store/:id', component: StoreDetailsComponent },
      { path: 'storelist/:id', component: StoreListComponent},
      { path: 'login', component: LoginComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'item/:id', component: ItemDetailComponent }
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  providers: [StoreItemsService, EventEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

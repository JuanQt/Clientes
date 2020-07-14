import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Conexion Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { ClienteComponent } from './component/cliente/cliente.component';
import { ClienteListComponent } from './component/cliente-list/cliente-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ClienteListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //conexion firebase
    AngularFireDatabaseModule, //no faltar error mio
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase), 
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

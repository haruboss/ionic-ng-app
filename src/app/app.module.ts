import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AngularFireDatabaseModule} from '@angular/fire/compat/database'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicStorageModule.forRoot(), IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule,
  AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule, AngularFireDatabaseModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

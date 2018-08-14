import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {TrackerModule} from './tracker/tracker.module';
import {AppRoutes} from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TrackerModule,
    BrowserModule,

    // routes
    AppRoutes,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

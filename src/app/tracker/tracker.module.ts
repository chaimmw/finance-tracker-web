import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

import {LoginComponent} from './components/login/login';
import {TrackerRoutingModule} from './tracker-routing.module';
import {FeathersClientService} from './services/feathers-client.service';




@NgModule({
  declarations: [
    LoginComponent,
      ],
  imports: [
    BrowserModule,

    // angular mateial
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    // routes
    TrackerRoutingModule,
  ],
  providers: [
    FeathersClientService,
  ],
})
export class TrackerModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

import {LoginComponent} from './components/login/login';
import {TrackerRoutingModule} from './tracker-routing.module';
import {FeathersClientService} from './services/feathers-client.service';
import {DashboardComponent} from './components/dashboard/dashboard';
import {AuthGuard} from './gaurds/auth-gaurd';
import {TrackerLayoutComponent} from './components/tracker-layout/tracker-layout';
import {AuthService} from './services/authService';




@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    TrackerLayoutComponent,
      ],
  imports: [
    BrowserModule,
    FormsModule,

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
    AuthGuard,
    AuthService,
  ],
})
export class TrackerModule { }

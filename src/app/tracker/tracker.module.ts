import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { AgGridModule } from 'ag-grid-angular';

import {LoginComponent} from './components/login/login';
import {TrackerRoutingModule} from './tracker-routing.module';
import {FeathersClientService} from './services/feathers-client.service';
import {DashboardComponent} from './components/dashboard/dashboard';
import {AuthGuard} from './gaurds/auth-gaurd';
import {TrackerLayoutComponent} from './components/tracker-layout/tracker-layout';
import {AuthService} from './services/authService';
import {ExpensePageComponent} from './components/expense-page/expense-page';
import {IncomePageComponent} from './components/income-page/income-page';
import {SummaryPageComponent} from './components/summary-page/summary-page';
import {NavBarComponent} from './components/nav-bar/nav-bar';
import {AboutPageComponent} from './components/about-page/about-page';
import {ContactPageComponent} from './components/contact-page/contact-page';
import {JoinPageComponent} from './components/join-page/join-page';
import {ValidatorService} from './services/validator.service';




@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    TrackerLayoutComponent,
    ExpensePageComponent,
    IncomePageComponent,
    SummaryPageComponent,
    NavBarComponent,
    AboutPageComponent,
    ContactPageComponent,
    JoinPageComponent,
      ],
  imports: [
    BrowserModule,
    FormsModule,

    // angular mateial
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,

    // ag grid
    AgGridModule.withComponents([]),

    // routes
    TrackerRoutingModule,
  ],
  providers: [
    FeathersClientService,
    AuthGuard,
    AuthService,
    ValidatorService,
  ],
})
export class TrackerModule { }

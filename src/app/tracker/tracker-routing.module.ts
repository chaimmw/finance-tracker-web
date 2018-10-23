import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login';
import {DashboardComponent} from './components/dashboard/dashboard';
import {AuthGuard} from './gaurds/auth-gaurd';
import {TrackerLayoutComponent} from './components/tracker-layout/tracker-layout';
import {ExpensePageComponent} from './components/expense-page/expense-page';
import {IncomePageComponent} from './components/income-page/income-page';
import {SummaryPageComponent} from './components/summary-page/summary-page';
import {AboutPageComponent} from './components/about-page/about-page';
import {ContactPageComponent} from './components/contact-page/contact-page';
import {JoinPageComponent} from './components/join-page/join-page';
import {WelcomeLayoutComponent} from './components/welcome-layout/welcome-layout';
import {WelcomePageComponent} from './components/welcome-page/welcome-page';


const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeLayoutComponent,
    children: [
      {path: '', redirectTo: '/welcome/home', pathMatch: 'full'},
      {path: 'home', component: WelcomePageComponent},
      {path: 'login', component: LoginComponent},
      {path: 'join', component: JoinPageComponent},
    ],
  },
  {
    path: 'tracker',
    component: TrackerLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: '/tracker/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'expense', component: ExpensePageComponent},
      {path: 'income', component: IncomePageComponent},
      {path: 'summary', component: SummaryPageComponent},
      {path: 'about', component: AboutPageComponent},
      {path: 'contact', component: ContactPageComponent},
    ],
  },
];



export const TrackerRoutingModule = RouterModule.forChild(routes);

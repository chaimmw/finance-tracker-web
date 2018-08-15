import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login';
import {DashboardComponent} from './components/dashboard/dashboard';
import {AuthGuard} from './gaurds/auth-gaurd';
import {TrackerLayoutComponent} from './components/tracker-layout/tracker-layout';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'tracker',
    component: TrackerLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: '/tracker/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent}
    ],
  },
];



export const TrackerRoutingModule = RouterModule.forChild(routes);

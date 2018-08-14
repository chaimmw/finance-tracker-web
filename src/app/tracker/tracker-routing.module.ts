import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
];



export const TrackerRoutingModule = RouterModule.forChild(routes);

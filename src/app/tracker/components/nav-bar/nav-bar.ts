
import {Component} from '@angular/core';
import {FeathersClientService} from '../../services/feathers-client.service';
import {Router} from '@angular/router';



@Component({
  selector: 'nav-bar',
  templateUrl: 'nav-bar.html',
  styleUrls: ['nav-bar.scss'],
})
export class NavBarComponent {

    constructor(private router: Router,
                private feathersClient: FeathersClientService) {
    }

    goToHome() {
      this.router.navigate(['/tracker/dashboard']);
    }

    logout() {
      this.feathersClient.logout();
      this.router.navigate(['/login']);
    }

}

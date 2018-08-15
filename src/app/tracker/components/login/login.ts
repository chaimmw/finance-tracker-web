
import { Component } from '@angular/core';
import {FeathersClientService} from '../../services/feathers-client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/authService';



@Component({
  templateUrl: 'login.html',
  styleUrls: ['login.scss'],
})
export class LoginComponent {

 email;
  password;

    constructor(private authService: AuthService,
                private router: Router,
                private route: ActivatedRoute) {
    }


    login() {

      const credentials = {
        strategy: 'local',
        email: this.email,
        password: this.password,
      };

      this.authService.authenticate(credentials);
    }

}

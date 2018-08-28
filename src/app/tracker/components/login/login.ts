
import { Component } from '@angular/core';
import {AuthService} from '../../services/authService';



@Component({
  templateUrl: 'login.html',
  styleUrls: ['login.scss'],
})
export class LoginComponent {

 email;
  password;

    constructor(private authService: AuthService,) {
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

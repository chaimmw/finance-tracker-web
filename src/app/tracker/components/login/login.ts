
import { Component } from '@angular/core';
import {AuthService} from '../../services/authService';
import {FormControl, Validators} from '@angular/forms';



@Component({
  templateUrl: 'login.html',
  styleUrls: ['login.scss'],
})
export class LoginComponent {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);


  constructor(private authService: AuthService,) {
  }


  login() {

    const credentials = {
      strategy: 'local',
      email: this.email.value,
      password: this.password.value,
    };

    this.authService.authenticate(credentials);
  }


}


import { Component } from '@angular/core';
import {AuthService} from '../../services/authService';
import {FormControl, Validators} from '@angular/forms';
import {ErrorDialogService} from '../../services/error-dialog.service';



@Component({
  templateUrl: 'login.html',
  styleUrls: ['login.scss'],
})
export class LoginComponent {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);


  constructor(private authService: AuthService,
              private errorDialog: ErrorDialogService) {
  }


  login() {

    const credentials = {
      strategy: 'local',
      email: this.email.value,
      password: this.password.value,
    };

    this.authService.authenticate(credentials);
  }

  validateFields() {
    if(this.email.hasError('required') || this.password.hasError('required')) {
      this.errorDialog.displayError('Please enter all fields');
    } else if (this.email.invalid){
      this.errorDialog.displayError('Please enter a valid email');
    } else {
      this.login();
    }
  }


}


import {Component} from '@angular/core';
import * as _ from 'lodash';
import {FeathersClientService} from '../../services/feathers-client.service';
import {AuthService} from '../../services/authService';
import {FormControl, Validators} from '@angular/forms';
import {ErrorDialogService} from '../../services/error-dialog.service';

const defaltUser = {
  firstName: undefined,
  lastName: undefined,
  username: undefined,
  email: undefined,
  password: undefined,
};

@Component({
  templateUrl: 'join-page.html',
  styleUrls: ['join-page.scss'],
})
export class JoinPageComponent {

  user = _.cloneDeep(defaltUser);
  firstName;
  lastName;
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);

  constructor(private feathersClient: FeathersClientService,
              private authService: AuthService,
              private errorDialog: ErrorDialogService) {
  }


  addUser() {

    const newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
    };

    this.feathersClient.service('users').create(newUser).then(response => {
      console.log('saved');
      this.login();
    });
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
    if (this.email.hasError('required') || this.password.hasError('required')) {
      this.errorDialog.displayError('Please enter all fields');
    } else if (this.email.invalid) {
      this.errorDialog.displayError('Please enter a valid email');
    } else if (this.username.hasError('required')) {
      this.errorDialog.displayError('Please enter a username');
    } else if (this.password !== this.confirmPassword) {
      this.errorDialog.displayError('Password does not match');
    } else {
      this.addUser();
    }
  }
}

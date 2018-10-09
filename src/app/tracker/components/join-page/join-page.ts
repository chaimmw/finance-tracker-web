
import {Component} from '@angular/core';
import * as _ from 'lodash';
import {FeathersClientService} from '../../services/feathers-client.service';
import {AuthService} from '../../services/authService';
import {FormControl, Validators} from '@angular/forms';

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
              private authService: AuthService) {
  }


  addUser() {
    this.feathersClient.service('users').create(this.user).then(response => {
      console.log('saved');
      this.login();
    });
  }

  login() {

    const credentials = {
      strategy: 'local',
      email: this.user.email,
      password: this.user.password,
    };

    this.authService.authenticate(credentials);

  }
}

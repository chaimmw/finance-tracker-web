
import {Component} from '@angular/core';
import * as _ from 'lodash';
import {FeathersClientService} from '../../services/feathers-client.service';
import {AuthService} from '../../services/authService';

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

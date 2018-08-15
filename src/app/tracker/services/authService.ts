import { Injectable } from '@angular/core';
import {FeathersClientService} from './feathers-client.service';


@Injectable()
export class AuthService {

  constructor(private feathersClient: FeathersClientService) {}

  public isAuthenticated = false;

  public user: any;



  authenticate(creds) {
    this.feathersClient.authenticate(creds).then(result => {
      this.onSuccesfulAuthenticate(result);
    }).catch(error => {
      // TODO add error dialog
      console.error(error);
    });
  }

  onSuccesfulAuthenticate(result) {
    this.isAuthenticated = true;

    if (result.user) {
      this.user = result.user;
    }
  }

}

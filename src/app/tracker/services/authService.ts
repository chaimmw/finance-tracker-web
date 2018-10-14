import { Injectable } from '@angular/core';
import {FeathersClientService} from './feathers-client.service';
import {Router} from '@angular/router';
import {ErrorDialogService} from './error-dialog.service';


@Injectable()
export class AuthService {

  constructor(private feathersClient: FeathersClientService,
              private router: Router,
              private errorDialog: ErrorDialogService) {}

  public isAuthenticated = false;

  public user: any;



  authenticate(creds) {
    this.feathersClient.authenticate(creds).then(result => {
      this.onSuccesfulAuthenticate(result);
      console.log(this.user);
    }).catch(error => {
      this.errorDialog.displayError(error.message);
      console.error(error);
    });
  }

  onSuccesfulAuthenticate(result) {
    this.isAuthenticated = true;

    if (result.user) {
      this.user = result.user;
    }

    this.router.navigate(['tracker']);
  }

}

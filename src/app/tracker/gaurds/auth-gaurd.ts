import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {


  canActivate() {
    return true;
  }

}

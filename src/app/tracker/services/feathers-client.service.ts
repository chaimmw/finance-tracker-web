import {Injectable, OnInit} from '@angular/core';
import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import feathersSocketIOClient from '@feathersjs/socketio-client';
import feathersAuthClient from '@feathersjs/authentication-client';



@Injectable()
export class FeathersClientService implements OnInit {

  private _feathers = feathers();                     // init socket.io
  // local development
  private _socket = io('http://localhost:3030');      // init feathers
  //  heroku deployed app
  // private _socket = io('https://cmw-finance-tracker.herokuapp.com');

  constructor() {
    this._feathers
      .configure(feathersSocketIOClient(this._socket)) // add socket.io plugin
      .configure(feathersAuthClient({                   // add authentication plugin
        storage: window.localStorage
      }));
      // .configure(feathersRx({                           // add feathers-reactive plugin
      //   idField: '_id'
      // }));
  }

  // expose services
  public service(name: string) {
    return this._feathers.service(name);
  }

  // expose authentication
  public authenticate(credentials?): Promise<any> {
    return this._feathers.authenticate(credentials);
  }

  // expose logout
  public logout() {
    return this._feathers.logout();
  }


  ngOnInit() {

  }

}

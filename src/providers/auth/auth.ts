import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {

  constructor(
    public http: HttpClient,
    public storage: Storage
  ) {
  }

  login() {

  }

  userIsLogged(){
    this.storage.get('token').then(val => {
      if(val !== undefined){
        return val;
      }else{
        return false;
      }
    });
  }

  logout() {
    this.storage.remove('token');
  }

}

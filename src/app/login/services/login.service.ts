import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Data } from "@angular/router/router";
import { Observable } from "rxjs/Observable";
import { options } from '../../admin/headers';
@Injectable()
export class LoginService {
  loggedInStatus: boolean;
  constructor(private http: Http) { }

  getMasterData() {

    console.log("inputdata");
    return this.http.get("https://kleveron-backend.herokuapp.com/get/admin2", options).map(res => res.json());



  }

  getAccessToken(loginData) {
    return this.http.post("https://dev-futurxlabs.scikey.io/auth/v1/login/resources?is_resource=true",
      loginData,
      options);

  }

  setUserLoggedInStatus() {
    this.loggedInStatus = true;
  }
  getUserLoggedInStatus() {
    return this.loggedInStatus;
  }

}

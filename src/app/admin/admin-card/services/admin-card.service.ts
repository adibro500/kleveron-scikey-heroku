import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Data } from "@angular/router/router";
import { Observable } from "rxjs/Observable";
import { options } from '../../headers';
@Injectable()
export class AdminCardService {

  constructor(private http: Http) { }

  putCardData(inputdata) {

    console.log("inputdata", inputdata);
    return this.http.post("http://localhost:5000/save", inputdata, options).map(res => res.text()).subscribe(data => console.log(data));

  }
  getCardData() {

    return this.http.get("http://localhost:5000/get/cards", options).map(res => res.json());

  }


}

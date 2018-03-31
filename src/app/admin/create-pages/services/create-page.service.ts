import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Data } from "@angular/router/router";
import { Observable } from "rxjs/Observable";
import { options } from '../../headers';
@Injectable()
export class CreatePageService {

  constructor(private http: Http) { }

  putMasterData(inputdata) {

    // console.log("inputdata", inputdata);
    return this.http.post("http://localhost:5000/save", inputdata, options).map(res => res.text()).subscribe(data => console.log(data));

  }

  putFormNames(inputdata) {

    // console.log("inputdata", inputdata);
    return this.http.post("http://localhost:5000/save/admin-input2-names", inputdata, options).map(res => res.text()).subscribe(data => console.log(data));
  }

  getFormNames() {

    // console.log("inputdata");
    return this.http.get("https://kleveron-backend.herokuapp.com/get/admin2_names", options).map(res => res.json());
  }



}

import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Data } from "@angular/router/router";
import { Observable } from "rxjs/Observable";
import { options, headers } from '../../headers';
@Injectable()
export class RenderPageService {

  constructor(private http: Http) { }

  getMasterData() {
    // console.log("inputdata");
    return this.http.get('http://localhost:5000/get/pages', options).map(res => res.json());
  }

  putFormData(inputdata) {

    // console.log("inputdata", inputdata);
    return this.http.post("https://kleveron-backend.herokuapp.com/save/admin2", inputdata, options).map(res => res.text()).subscribe(data => console.log(data));


  }
  putHeadersData(inputdata, doc_id) {
    return this.http.post("http://localhost:5000/update/pages/" + doc_id, inputdata, options);
  }

}

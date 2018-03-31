import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-survey-display',
  template: '<button class="btn btn1 pull-right" (click)="publishSurvey()">Publish Survey</button><app-surveyjs [json]="json"></app-surveyjs>',
  styleUrls: ['./survey-display.component.css']
})

export class SurveyDisplayComponent implements OnInit {

  json: any;
  temp: any;

  constructor(private http: Http) { }

  ngOnInit() {
    let options = new RequestOptions();
    let headers = new Headers();
    // let url = 'http://localhost:8081/auth/v1/ldap-login';
    headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('orgname', 'dev-futurxlabs');
    headers.append('user_code', '3');
    headers.append('token', localStorage.getItem("token"));

    options.headers = headers;

    this.http.get("https://dev-futurxlabs.scikey.io/scikey/v1/assessments/" + localStorage.getItem("survey_id") + "/elements?is_resource=true", options).subscribe(res => {
      // console.log(res.json().data[0]);
      this.temp = JSON.parse(JSON.stringify(res.json()));
      this.json = this.temp.data[0].survey_questions_json;
      console.log(this.json);
    });
  }

  publishSurvey() {
    let options = new RequestOptions();
    let headers = new Headers();
    // let url = 'http://localhost:8081/auth/v1/ldap-login';
    headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('orgname', 'dev-futurxlabs');
    headers.append('user_code', '3');
    headers.append('token', localStorage.getItem("token"));

    options.headers = headers;
    var body = { "survey_status": "ENABLE" };
    this.http.post("https://dev-futurxlabs.scikey.io/scikey/v1/assessments/" + localStorage.getItem("survey_id") + "?is_resource=true", body, options).subscribe(res => {
      alert("Survey published");
    })
  }


}

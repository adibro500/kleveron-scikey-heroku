
import { Headers, RequestOptions } from '@angular/http';

export let options = new RequestOptions();
// let url = 'http://localhost:8081/auth/v1/ldap-login';
export let headers = new Headers();
headers.append('Content-Type', 'application/json');
// headers.append('Access-Control-Allow-Origin', '*');
//headers.append('formType', 'Input');
headers.append('orgname', 'dev-futurxlabs');
//  headers.append('authorization', localStorage.getItem("accessToken"));

// headers.append('Access-Control-Allow-Headers', '*');
// headers.append('Access-Control-Request-Method', '*');
// headers.append('Access-Control-Allow-Methods', 'POST');

//Access-Control-Allow-Methods

options.headers = headers;

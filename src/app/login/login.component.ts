
import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from "rxjs/Rx";
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from "@angular/forms";
// import { AuthGuardService } from "../auth-guard.service";
// import { LoginService } from "./login.service";
import { DOCUMENT } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnDestroy, OnInit {

  ngOnDestroy(): void {
    //this.observable.unsubscribe();
  }

  observable: any;
  public form: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  uname: string = '';
  pass: string = '';
  constructor(private _login: LoginService,
    private fb: FormBuilder,
    translate: TranslateService,
    private router: Router,
    @Inject(DOCUMENT) private document: any) {

    this.observable = Observable.interval(1000).subscribe(x => {
      translate.use(localStorage.getItem('lang'));
      //translate.use(localStorage.getItem('lang'));
    });

    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
    var color = localStorage.getItem("color");
    // if (color == "pink-blue") {
    //   this.document.getElementById("color").setAttribute("href", "./assets/styles/pink-blue.css");
    // }
    // else {
    //   this.document.getElementById("color").setAttribute("href", "./assets/styles/orange-blue.css");
    // }


    // this language will be used as a fallback when a translation isn't found in the current languag
  }
  ngOnInit() {


  }

  res = [];
  respBody;
  // tslint:disable-next-line:member-ordering
  invalidLogin = true;
  resp: any = {};
  public onSubmit(): void {

    let json1 = {
      "email": this.uname,
      "password": this.pass
    };


    this._login.getAccessToken(json1)
      .subscribe((res) => {
        this.resp = JSON.parse(JSON.stringify(res.headers));
        this.respBody = JSON.parse(JSON.stringify(res.json()));
        if (this.respBody['status_code'] === 'AS_RR_200') {
          // const time_to_login = Date.now() + this.resp.expiresIn;
          //localStorage.setItem('timer', JSON.stringify(time_to_login));

          this.invalidLogin = true;
          //if (localStorage.getItem("token") === '') {
          localStorage.setItem('user_code', this.respBody.data.user_details.resource_id);
          localStorage.setItem("token", this.resp.authorization);
          // } else {
          this._login.setUserLoggedInStatus();
          // }
          this.router.navigate(['/parent/createPage']);
        } else {
          this.invalidLogin = false;
          this.router.navigate(['/']);
        }

      });


    // this.ags.isLoggedIn(json1).subscribe((res) => {
    //   if (res.data != "invalid") {
    //     this.ags.setUserLoggedInStatus();
    //     localStorage.setItem("loginname", this.uname);
    //     this.router.navigate(['/parent/adminWidget']);
    //   }
    // });

  }

}

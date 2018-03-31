import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'right-menu-toggle',
  templateUrl: './right-menu-toggle.component.html',
  styleUrls: ['./right-menu-toggle.component.css']
})
export class RightMenuToggleComponent implements OnInit {

  ngOnInit(): void {


  }

  constructor( @Inject(DOCUMENT) private document: any) {


  }

  changeMenu(side) {
    localStorage.setItem("side", side);
    if (side == "right") {
      this.document.getElementById("theme").setAttribute("href", "./assets/styles/right-menu.css");
    }
    else {
      this.document.getElementById("theme").setAttribute("href", "./assets/styles/left-menu.css");
    }

  }

  changeColor(color) {
    localStorage.setItem("color", color);
    if (color == "pink-blue") {
      this.document.getElementById("color").setAttribute("href", "./assets/styles/pink-blue.css");
      this.document.getElementById("logo_img").setAttribute("src", "./assets/images/logo_steer.png");
      this.document.getElementById("logo_img").setAttribute("width", "500");
      this.document.getElementById("logo_img").setAttribute("height", "450");


    }
    else if (color == "orange-blue") {
      this.document.getElementById("color").setAttribute("href", "./assets/styles/orange-blue.css");
      this.document.getElementById("logo_img").setAttribute("src", "./assets/images/settings/logo_dashboard.png");

    }
    else if (color == "pink-blue") {
      this.document.getElementById("color").setAttribute("href", "./assets/styles/pink-blue.css");
      this.document.getElementById("logo_img").setAttribute("src", "./assets/images/settings/logo_dashboard.png");
    }
    else if (color == "sky-purple") {
      this.document.getElementById("color").setAttribute("href", "./assets/styles/sky-purple.css");
      this.document.getElementById("logo_img").setAttribute("src", "./assets/images/settings/logo_dashboard.png");
    }
    else if (color == "yellow-navy") {
      this.document.getElementById("color").setAttribute("href", "./assets/styles/yellow-navy.css");
      this.document.getElementById("logo_img").setAttribute("src", "./assets/images/settings/logo_dashboard.png");
    }
    else if (color == "green-purple") {
      this.document.getElementById("color").setAttribute("href", "./assets/styles/green-purple.css");
      this.document.getElementById("logo_img").setAttribute("src", "./assets/images/settings/logo_dashboard.png");
    }
    else if (color == "steer-high") {
      this.document.getElementById("color").setAttribute("href", "./assets/styles/steer-high.css");
      this.document.getElementById("logo_img").setAttribute("src", "./assets/images/settings/logo_dashboard.png");
    }
    else if (color == "logo") {
      this.document.getElementById("logo").setAttribute("href", "./assets/styles/own-company-logo.css");
      this.document.getElementById("logo_img").setAttribute("src", "./assets/images/settings/logo_dashboard.png");
    }
    else if (color == "default-logo") {
      this.document.getElementById("logo").setAttribute("href", "./assets/styles/default-logo.css");
      this.document.getElementById("logo_img").setAttribute("src", "./assets/images/settings/logo_dashboard.png");
    }
    else if (color == "secondary-logo") {
      this.document.getElementById("logo").setAttribute("href", "./assets/styles/secondary-logo.css");
      this.document.getElementById("logo_img").setAttribute("src", "./assets/images/settings/logo_dashboard.png");
    }
  }




  toggle(id) {
    var el = document.getElementById(id);
    var img = document.getElementById("tgl_icn");
    var box = el.getAttribute("class");
    if (box == "thm_select") {
      el.setAttribute("class", "show");
      this.delay(img, "./assets/images/toggle.png", 400);
    }
    else {
      el.setAttribute("class", "thm_select");
      this.delay(img, "./assets/images/toggle.png", 400);
    }
  }

  delay(elem, src, delayTime) {
    window.setTimeout(function () { elem.setAttribute("src", src); }, delayTime);
  }

}

import { Component, OnInit } from '@angular/core';
import { AdminCardService } from './services/admin-card.service';
declare var $: any;
declare var perfectScrollbar: any;
declare var height: any;
declare var tabs: any;
@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.css']
})
export class AdminCardComponent implements OnInit {
  cards: any[] = [];
  constructor(private adminCardService: AdminCardService) { }

  formLink: any;
  ngOnInit() {
    this.cards.push({
      'text': 'Sample Text',
      'link': ''
    });
  }

  cloneElement(idx) {
    let temp = JSON.parse(JSON.stringify(this.cards[idx]));
    this.cards.splice(idx + 1, 0, temp);
  }

  delElement(idx) {
    delete this.cards[idx];
  }
  editElement(idx) {
    localStorage.setItem('linkIndex', idx);
  }

  _saveLink() {

    this.cards[localStorage.getItem('linkIndex')].link = this.formLink;
    $('#input_control_Modal').hide();
  }
  formName;


  _saveData() {

    let sendJson = {
      "user": "aditya",
      "controls": this.cards,
      "formType": "Cards",
      "FormName": this.formName,
    };
    this.adminCardService.putCardData(sendJson);
    alert("Template saved Successfully!!");
    $('#input_control_Form').hide();

  }

}

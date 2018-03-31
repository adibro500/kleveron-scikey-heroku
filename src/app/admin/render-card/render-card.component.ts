import { Component, OnInit } from '@angular/core';
import { AdminCardService } from '../admin-card/services/admin-card.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-render-card',
  templateUrl: './render-card.component.html',
  styleUrls: ['./render-card.component.css']
})
export class RenderCardComponent implements OnInit {

  constructor(private adminCard: AdminCardService, private route: ActivatedRoute) { }

  cards: any[] = [];
  index;
  data: any[] = [];
  ngOnInit() {
    this.adminCard.getCardData().subscribe(data => {
      this.data = JSON.parse(JSON.stringify(data));
      console.log(this.data);
      this.route.params.subscribe(params => {
        this.index = params['id'];
        if (this.data && this.data.length > 0 && this.index)
          this.getTemplateByIndex(this.index);
      });
    });
  }

  getTemplateByIndex(idx) {
    // console.log('controls', this.data[i].controls);
    for (var i = 0; i < this.data.length; i++) {
      if (idx == this.data[i].FormName) {
        break;
      }
    }
    console.log('cards', this.data[i]);
    this.cards = this.data[i].controls;
  }


}



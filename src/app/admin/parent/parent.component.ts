import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DragulaService } from 'ng2-dragula';

import { TranslateService } from '@ngx-translate/core';
import { Observable } from "rxjs/Rx";
import { RenderPageService } from '../render-pages/services/render-pages-service.service';
import { CreatePageService } from '../create-pages/services/create-page.service';
import { AdminCardService } from '../admin-card/services/admin-card.service';
declare var $: any;
declare var perfectScrollbar: any;
declare var height: any;
declare var tabs: any;
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
})

export class ParentComponent implements OnInit {
  color;
  private _presetFonts = ['Arial', 'Serif', 'Helvetica', 'Sans-Serif', 'Open Sans', 'Roboto Slab'];



  public sizeSelect: boolean = true;
  public styleSelect: boolean = true;
  temp_name: string = "Temp Name";
  foot_name: string = "© 2017 Kleveron. A venture of SRKay Consulting Group LLP. All Rights Reserved.";
  public presetFonts = this._presetFonts;

  togglePresetFonts() {
    this.presetFonts = this.presetFonts.length ? [] : this._presetFonts;
  }

  toggleExtraOptions() {
    this.sizeSelect = !this.sizeSelect;
    this.styleSelect = !this.styleSelect;
  }
  @Input()
  hideMenu = false;
  data: any[] = [];
  widdata: any[] = [];
  checks: boolean[] = [];

  template_name = "Kleveron";
  temp_no;
  arr;
  username;
  menu: any[] = [];
  menu2: any[] = [];
  constructor(private acs: AdminCardService,
    translate: TranslateService, private router: Router, private renderPagesService: RenderPageService) {



    const sub = Observable.interval(3000).subscribe(x => {
      this.template_name = localStorage.getItem("temp_name");
      this.username = localStorage.getItem("loginname");
      translate.use(localStorage.getItem('lang'));
    });

    //console.log(translate);

    this.renderPagesService.getMasterData().subscribe(menu => {
      this.menu = JSON.parse(JSON.stringify(menu));
    });


    this.acs.getCardData().subscribe(menu => {
      this.menu2 = JSON.parse(JSON.stringify(menu));
    });

    console.log("init data", this.menu);
  }

  logOut() {
    localStorage.setItem("accessToken", '');
    this.router.navigate(['/']);
  }


  setTemp(d) {
    if (d.formName == undefined)
      localStorage.setItem("temp_name", d.FormName);
    else
      localStorage.setItem("temp_name", d.formName);
  }

  changeLang(lang) {
    localStorage.setItem('lang', lang);
  }



  title = 'app';

  ngOnInit() {

    // for (var i = 0, len = localStorage.length; i < len; ++i) {
    //   console.log(localStorage.key(i));
    // }

    // $('.navbar-header').click(function () {
    //   $('.wrapper').toggleClass('hidemenu');
    // });

    // if ($(window).width() < 767) {
    //   $(document).click(function (e) {
    //     if (!$(e.target).closest('.navbar-header, .aside').length) {
    //       $('.wrapper').removeClass('hidemenu');
    //     }
    //   })
    // }

    // $('.aside_nav').perfectScrollbar();
    // $('.drop-content').perfectScrollbar();



    // $(window).load(function () {
    //   var H = $(window).height();
    //   var nH = $('.frame_header').height();
    //   var nD = $('.dash_logo').height();

    //   var S = H - nH;

    //   $('.wrapper ').css('min-height', H);
    //   $('.aside_nav ').css('height', S);

    //   if ($(window).width() < 767) {
    //     $('.aside_nav ').css('min-height', S - nD - 20);
    //   }
    //   $(window).resize(function () {
    //     var H = $(window).height();
    //     var nH = $('.frame_header').height();
    //     var nD = $('.dash_logo').height();

    //     var S = H - nH;

    //     $('.wrapper ').css('min-height', H);
    //     $('.aside_nav ').css('height', S);

    //     if ($(window).width() < 767) {
    //       $('.aside_nav ').css('min-height', S - nD - 20);
    //     }
    //   });
    // });


    // // side sub-menu js


    // $(document).ready(function () {
    //   $(".inner").css("display", "none");
    //   $('.sub_menu_toggle').click(function (e) {
    //     e.preventDefault();

    //     var $this = $(this);
    //     if ($this.next().hasClass('visible')) {
    //       $this.next().removeClass('visible');
    //       $this.next().slideUp(350);
    //     } else {
    //       $this.parent().parent().find('li .inner').removeClass('visible');
    //       $this.parent().parent().find('li .inner').slideUp(350);
    //       $this.next().toggleClass('visible');
    //       $this.next().slideToggle(350);
    //     }
    //   });
    // });

    // $(window).load(function () {
    //     var C = $(window).height();
    //     var cH = $('.con_hdr').height();
    //     var cT = C - cH;
    //     $('.all_con_wrap').css('height', cT);
    //     $(window).resize(function () {
    //         var C = $(window).height();
    //         var cH = $('.con_hdr').height();
    //         var cT = C - cH;
    //         $('.all_con_wrap').css('height', cT);
    //     });
    // });

  }


}

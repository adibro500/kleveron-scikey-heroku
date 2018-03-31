import { Component, Renderer, Input, Inject } from '@angular/core';
import { OnInit, AfterViewInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { ActivatedRoute } from '@angular/router';
import { IsMobileService } from 'ngx-datetime-picker/services/isMobile.service';
import { DateService } from 'ngx-datetime-picker/services/date.service';
import { DatePipe } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';
import { RenderPageService } from './services/render-pages-service.service';
import { Headers, RequestOptions, Http } from '@angular/http';
declare var $: any;
declare var perfectScrollbar: any;
declare var height: any;
declare var tabs: any;

@Component({
  selector: 'render-pages',
  templateUrl: './render-pages.component.html',
})

export class RenderPagesComponent implements OnInit, AfterViewInit {
  id: string;
  order: number;
  type: string;
  values: string[];
  placeholder: string;
  lnames: string[];
  lclasses: string[];
  lids: string[];
  selectRadio;
  jsonHeaders: any[] = [];
  Textboxes: any[] = [];
  changeC: string;
  options: any;
  localStorageItems: any[] = [];
  temp2: any;
  data: any;
  index;
  selectedMethod: any[] = [];
  temp_name = localStorage.getItem("temp_name");

  filesToUpload: Array<File>;

  html_temp: string;

  constructor( @Inject(DOCUMENT) private document: any,
    dragulaService: DragulaService, private route: ActivatedRoute,
    private renderPagesService: RenderPageService,
    private http: Http) {

    this.options = {
      revertOnSpill: true
    };
    this.filesToUpload = [];
    for (let i = 0; i < localStorage.length; i++) {
      this.localStorageItems.push({ id: i + 'local', value: localStorage.key(i) });
    }



    // dragulaService.out.subscribe((value: any[]) => {
    //     const [bagName, e, el] = value;
    //     console.log("ll", e);
    //     console.log("kk", el);
    //     console.log('id is:', e.dataset.id);
    //     this.temp2 = ;

    // });
    dragulaService.drop.subscribe((value: any[]) => {
      this.onDrop(value);

    });




  }
  showValue: boolean;
  headersValue = 0;
  headCount = 0;
  onMethodChange(event, idx) {
    this.selectedMethod[idx] = event;
    this.showValue = true;
    console.log(event);
    if (event.includes('local')) {
      // tslint:disable-next-line:radix
      this.headersValue = parseInt(event.substr(0, 1));
      // tslint:disable-next-line:radix
      let arrValue = parseInt(event.slice(6));

      console.log(this.headersValue);
      let pass = {};
      pass['key'] = localStorage.key(this.headersValue);
      pass['value'] = localStorage.getItem(localStorage.key(this.headersValue));
      this.jsonHeaders.splice(this.headCount, 0, pass);
      console.log(this.jsonHeaders);
    } else if (event.includes('orgname')) {
      let pass = {};
      pass['key'] = 'orgname';
      pass['value'] = this.jsonHeaders[idx].value;
      this.jsonHeaders.splice(this.headCount, 0, pass);
    } else if (event.includes('Content-Type')) {
      let pass = {};
      pass['key'] = 'Content-Type';
      pass['value'] = this.jsonHeaders[idx].value;
      this.jsonHeaders.splice(this.headCount, 0, pass);
    }
    this.headCount++;
    console.log(this.jsonHeaders);
  }


  ngAfterViewInit() {

  }

  sendHeadersToServer() {
    let arr = [];
    for (let i = 0; i < this.jsonHeaders.length; i++) {
      let temp = {};
      temp['key'] = this.jsonHeaders[i].key;
      if (this.jsonHeaders[i].value.includes('localStorage')) {
        temp['actual_param'] = this.jsonHeaders[i].value;
        // tslint:disable-next-line:no-eval
        temp['value'] = eval(this.jsonHeaders[i].value);
      } else {
        temp['value'] = this.jsonHeaders[i].value;
      }
      arr.push(temp);
    }
    console.log('arr', arr);
    let jsonData = {
      'data': {
        'headers': arr
      }
    };
    console.log(jsonData);
    this.renderPagesService.putHeadersData(jsonData, this.doc_id).subscribe(res => console.log(res.json()));
  }



  upload() {
    this.makeFileRequest("http://localhost:5000/upload", [], this.filesToUpload).then((result) => {
      console.log(result);
    }, (error) => {
      console.error(error);
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }

  doc_id;


  texts: any[] = [];

  selectedOpts: any[] = [];
  selectOptions2: any[] = [];
  FormName = "";
  selectHeaders: any[] = [];
  FormUrl;
  getTemplateByIndex(idx) {
    for (var i = 0; i < this.data.length; i++) {
      if (idx == this.data[i].FormName) {
        break;
      }
    }
    this.html_temp = this.data[i].html;
    this.doc_id = this.data[i]._id;
    this.selectHeaders = this.data[i].headers;
    this.Textboxes = this.data[i].controls;
    this.changeC = this.data[i].column_config;
    this.FormName = this.data[i].FormName;
    this.FormUrl = this.data[i].FormURL;
    console.log("col-conf", this.changeC);
    console.log(this.doc_id);
    // for (var k = 0; k < this.Textboxes.length; k++) {
    //   // if (this.Textboxes[k].type == 'select') {
    //   //     this.selectOptions2.push({ 'id': k, 'selected': '', 'values': this.Textboxes[k].values });
    //   // }
    //   this.Textboxes[k].order = k;
    // }
    console.log("textboxes", this.Textboxes);
    console.log("select", this.selectOptions2);
  }



  saveData() {
    //    this.adminService.putMasterData(this.Textboxes);
    console.log("done");
  }



  onDrop(args) {

    const [el, e, target, source, sibling] = args;
    //console.log("kk", e.dataset.id);
    console.log("kk", el);
    console.log('id is:', source.children[0]);
    console.log('id is:', target.children[2]);
    //sconsole.log('id is:', sibling.dataset.id);
    if (sibling !== null && e !== null && this.Textboxes[parseInt(e.dataset.id)] !== undefined) {
      let tmp = this.Textboxes[e.dataset.id].order;
      this.Textboxes[e.dataset.id].order = this.Textboxes[sibling.dataset.id].order;
      this.Textboxes[sibling.dataset.id].order = tmp;

      // for (var i = sibling.dataset.id + 1; i < this.Textboxes.length; i++) {
      //     if (this.Textboxes[i] !== undefined) {
      //         alert(this.Textboxes[i].order);
      //         this.Textboxes[i].order = this.Textboxes[i].order++;



      //     }

      // }
      //  console.log('id2 is:', args[4].getAttribute("data-id"));

      //console.log("other id is", value[4].getAttribute("data-id"));

      // console.log(e.type, e);
      // if (args[4] !== null && this.Textboxes[parseInt(args[4].getAttribute("data-id"))] !== undefined) {
      //     console.log("inside condition");
      //     let temp = this.Textboxes[parseInt(e.dataset.id)].order;
      //     this.Textboxes[parseInt(e.dataset.id)].order = this.Textboxes[parseInt(args[4].getAttribute("data-id"))].order;
      //     this.Textboxes[parseInt(args[4].getAttribute("data-id"))].order = temp;
      // this.Textboxes.sort((a, b) => {
      //     if (a.order < b.order) return -1;
      //     else if (a.order > b.order) return 1;
      //     else return 0;
      // });
      console.log(this.Textboxes);
    }
    // }
    // else

    //     console.log("outside condition");


  }

  selectedValue;
  clickRad(tb) {

    alert(tb);
    this.selectedValue = tb;

  }

  changeCols(order) {

    if (order == "cols-2") {
      this.document.getElementById("cols").removeAttribute('href');
      this.document.getElementById("cols").setAttribute("href", "./assets/styles/theme-1.css");

    }
    else if (order == "cols-1") {
      this.document.getElementById("cols").removeAttribute('href');

      this.document.getElementById("cols").setAttribute("href", "./assets/styles/theme-2.css");
    }
    else if (order == "cols-4") {
      this.document.getElementById("cols").removeAttribute('href');
      this.document.getElementById("cols").setAttribute("href", "./assets/styles/theme-3.css");
    }
    else {
      this.document.getElementById("cols").removeAttribute('href');

      this.document.getElementById("cols").setAttribute("href", "./assets/styles/theme-4.css");
    }


  }

  nextData() {
    alert(this.selectRadio);
  }


  cloneElement(idx) {

    for (var i = idx + 1; i < this.Textboxes.length; i++) {

      this.Textboxes[i].order = this.Textboxes[i].order++;

    }
    this.Textboxes.splice(idx + 1, 0, this.Textboxes[idx]);
    console.log(this.Textboxes);
  }

  defValues;
  getDef(i) {
    return this.Textboxes[i].values[0];

  }

  // onDrop(args) {
  //     let [e, el, source, target] = args;

  //     //        let id = source.id;
  //     console.log(source);
  //     console.log(target);
  // }

  equals(o1, o2) {
    return o1 === o2;
  }
  selectOptions: any[] = [];

  // updateArr(a) {
  //     this.selectedValues.push(a);
  //     console.log(this.selectedValues);
  // }
  addMore() {
    this.jsonHeaders.push({
      "key": "",
      "value": ""
    });
  }

  apiHeaders;
  respb;
  resp2;
  saveHeaders() {
    let ass_name;
    let ass_ver;
    console.log(this.jsonHeaders);
    // localStorage.removeItem('token');
    let apiHeaders = new RequestOptions();
    let headers = new Headers();
    // for (let i = 0; i < this.jsonHeaders.length; i++) {
    //   headers.append(this.jsonHeaders[i].key, this.jsonHeaders[i].value);
    // }
    // this.http.get("http://localhost:5000/get/headers/" + this.doc_id).subscribe(res => { this.resp2 = JSON.parse(JSON.stringify(res)); });
    console.log('resp2', this.selectHeaders);
    for (var k = 0; k < this.selectHeaders.length; k++) {
      if (this.selectHeaders[k].actual_param !== undefined) {
        console.log('hellooooooo');
        // tslint:disable-next-line:no-eval
        headers.append(this.selectHeaders[k].key, eval(this.selectHeaders[k].actual_param));
      } else {
        headers.append(this.selectHeaders[k].key, this.selectHeaders[k].value);
      }
      console.log(headers);
    }
    console.log(headers);
    apiHeaders.headers = headers;
    console.log(apiHeaders);
    for (var j = 0; j < this.Textboxes.length; j++) {
      if (this.Textboxes[j] !== null) {
        if (this.Textboxes[j].type == 'text_label' && this.Textboxes[j].placeholder == 'Assessment Name') {
          ass_name = this.Textboxes[j].values[0];
        }
        if (this.Textboxes[j].type == 'text_label' && this.Textboxes[j].placeholder == 'Assessment Version') {
          ass_ver = this.Textboxes[j].values[0];
        }
      }
    }
    ass_name = encodeURIComponent(ass_name.trim());
    let temp_link = this.FormUrl + '?assessment_name=' + ass_name + '&is_resource=true';
    console.log(temp_link);
    this.http.get(temp_link, apiHeaders).map(res => res.json()).subscribe((res) => {
      this.respb = JSON.parse(JSON.stringify(res));
      console.log('data', this.respb);
      if (this.respb.data.is_version_exist === true) {
        alert("version already exists");
      } else {
        alert("version is available");
        let body = {
          "title": ass_name,
          "end_time": "2999-12-31 03:00:00",
          "survey_status": "CREATE_ASSESSMENT_IN_DRAFT",
          "type": "ASSESSMENT",
          "survey_publish_mode": "PRIVATE",
          "version": ass_ver,
          "created_by": "juhi Naik",
          "updated_by": "juhi Naik"
        };
        this.http.post("https://dev-futurxlabs.scikey.io/scikey/v1/assessments?is_resource=true", body, apiHeaders)
          .subscribe((res) => {

            console.log(res);
            let check = JSON.stringify(res);
            let resp = JSON.parse(JSON.stringify(res.json()));
            console.log('hhhh', resp);
            localStorage.setItem("survey_id", resp.data[0].survey_id);
            console.log(resp.data[0].survey_id);
            alert("!!!Assessment Created!!!");
          })
      }
    });
    // $('#input_control_Modal').hide;
  }

  addLess() {
    this.jsonHeaders.splice(-1, 1);
  }
  ngOnInit() {

    this.renderPagesService.getMasterData().subscribe(data => {
      this.data = JSON.parse(JSON.stringify(data));
      this.route.params.subscribe(params => {
        this.index = params['id'];
        if (this.data && this.data.length > 0 && this.index)
          this.getTemplateByIndex(this.index);
      }
      )
    });

    this.jsonHeaders.push({
      "key": "",
      "value": ""
    });

    var num = 0;
    $(".save_btn").click(function () {
      console.log($("#contra").html());

    });

    // $(".delel").click(function () {
    //     $(this).closest(".element_box").remove();
    // });


    // $('#datetimepicker3').datetimepicker({
    //     icons: {
    //         time: 'fa fa-clock-o',
    //         date: 'fa fa-calendar',
    //         up: 'fa fa-chevron-up',
    //         down: 'fa fa-chevron-down',
    //         previous: 'fa fa-chevron-left',
    //         next: 'fa fa-chevron-right',
    //         today: 'fa fa-crosshairs',
    //         clear: 'fa fa-trash'
    //     },
    //     format: 'MM/DD/YYYY'
    // });

    // $(function () {
    //     $('#datetimepicker1').datetimepicker();
    // });



    $(function () {
      $('#datetimepicker2').datetimepicker({
        format: 'LT'
      });
    });

    $(document).ready(function () {
      //here first get the contents of the div with name class copy-fields and add it to after "after-add-more" div class.
      $(".add-more").click(function () {
        var html = $(".copy-fields").html();
        $(".add_field").after(html);
      });
      $("body").on("click", ".remove", function () {
        $(this).parents(".remove_field").remove();
      });
    });






    $('.sv_btn').on('click', function () {
      $("#input_label_Modal").hide();
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    })


    $('.navbar-header').click(function () {
      $('.wrapper').toggleClass('hidemenu');
    });

    if ($(window).width() < 767) {
      $(document).click(function (e) {
        if (!$(e.target).closest('.navbar-header, .aside').length) {
          $('.wrapper').removeClass('hidemenu');
        }
      })
    }

    $('.aside_nav').perfectScrollbar();
    $('.drop-content').perfectScrollbar();

    $("#detail_tabs").tabs();
    $(".tab_no").click(function () {
      var active = $("#detail_tabs").tabs("option", "active");
      $("#detail_tabs").tabs("option", "active", active + 1);

    });

    $(window).load(function () {
      var H = $(window).height();
      var nH = $('.frame_header').height();
      var nD = $('.dash_logo').height();
      //var F = $('footer').height();
      var S = H - nH;
      //var C = H - nH - F - 60;
      // $('.wrapper ').css('min-height', H);
      $('.aside_nav ').css('height', S);
      //$('.bgwhite').css('min-height', C);
      if ($(window).width() < 767) {
        $('.aside_nav ').css('min-height', S - nD - 20);
      }
      $(window).resize(function () {
        var H = $(window).height();
        var nH = $('.frame_header').height();
        var nD = $('.dash_logo').height();
        //var F = $('footer').height();
        var S = H - nH;
        //var C = H - nH - F - 60;
        // $('.wrapper ').css('min-height', H);
        $('.aside_nav ').css('height', S);
        //$('.bgwhite').css('min-height', C);
        if ($(window).width() < 767) {
          $('.aside_nav ').css('min-height', S - nD - 20);
        }
      });
    });

    $("#clone0").click(function () {
      $(this).parent().find('.element-box').eq(0).clone().appendTo(this);
    });

    $(".nx_btn").click(function () {
      var nextDiv = $(".modal_tabs:visible").next(".modal_tabs");
      if (nextDiv.length == 0) { // wrap around to beginning
        nextDiv = $(".modal_tabs:first");
      }
      $(".modal_tabs").hide();
      nextDiv.show();
    });

    $('#vldtn_btn1').on('change', function (e) {
      if (e.target.checked) {
        $('.hide_lbl').show();
      } else {
        $('.hide_lbl').hide();
      }
    });


    $(document).ready(function () {
      $(".inner").css("display", "none");
      $('.sub_menu_toggle').click(function (e) {
        e.preventDefault();

        var $this = $(this);
        if ($this.next().hasClass('visible')) {
          $this.next().removeClass('visible');
          $this.next().slideUp(350);
        } else {
          $this.parent().parent().find('li .inner').removeClass('visible');
          $this.parent().parent().find('li .inner').slideUp(350);
          $this.next().toggleClass('visible');
          $this.next().slideToggle(350);
        }
      });
    });

    $(window).load(function () {
      var C = $(window).height();
      var cH = $('.con_hdr').height();
      var cT = C - cH;
      $('.all_con_wrap').css('height', cT);
      $(window).resize(function () {
        var C = $(window).height();
        var cH = $('.con_hdr').height();
        var cT = C - cH;
        $('.all_con_wrap').css('height', cT);
      });
    });


  }
  is_submit: boolean;
  jsonObj: any[] = [];
  selectedValues: any[] = [];
  dateValues: any[] = [];
  timeValues: any[] = [];
  checkValues: any[] = [];
  selectValues: any[] = [];
  selectValues2: any[] = [];

  fileNames: string[] = [];

  fileEvent(fileInput: Event, i) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    let fileName = this.fileNames.push(file.name);
    this.fileNames[i] = file.name;
  }




  log(e: any) {
    console.log(e.type, e);
  }

  selectfnValues(idx) {

  }

  sendData() {


    //this.is_submit = true;


    let bjson: any = {};
    let rad = {};

    bjson['FormName'] = this.FormName;
    for (var i = 0; i < this.Textboxes.length; i++) {
      var k = 0;
      // alert("inside " + this.Textboxes[i].type);
      // alert("more in " + i);

      if (this.Textboxes[i] !== null && this.Textboxes[i].type === 'textbox' && this.Textboxes[i].values[0] !== "") {

        alert("inside if");

        //   bjson["control_id"] = this.Textboxes[i].id;
        bjson[this.Textboxes[i].placeholder] = this.Textboxes[i].values[0];

      }
      else if (this.Textboxes[i] !== null && this.Textboxes[i].type === 'textarea' && this.selectValues[i] !== "") {

        bjson[this.Textboxes[i].placeholder] = this.Textboxes[i].values[0];

      }

      else if (this.Textboxes[i] !== null && this.Textboxes[i].type === 'select' && this.selectValues[i] !== "") {

        bjson[this.Textboxes[i].values[0]] = this.selectValues[i];

      } else if (this.Textboxes[i] !== null && this.Textboxes[i].type === 'password' && this.Textboxes[i].values[0] !== "") {

        bjson[this.Textboxes[i].placeholder] = this.Textboxes[i].values[0];


      } else if (this.Textboxes[i] !== null && this.Textboxes[i].type === 'checkbox' && this.Textboxes[i].boolvals[0] != undefined) {
        bjson[this.Textboxes[i].lnames[0]] = this.Textboxes[i].boolvals[0];


      } else if (this.Textboxes[i] !== null && this.Textboxes[i].type === 'radio' && this.selectedValue == this.Textboxes[i].lnames[0]) {


        alert(this.selectedValue);

        rad['value'] = this.Textboxes[i].lnames[0];
        // if (this.selectedValue === this.Textboxes[i].lnames[0])
        rad['selected'] = true;
        // else
        //     rad['selected'] = false;
        bjson["Other info"] = rad;



      } else if (this.Textboxes[i] !== null && this.Textboxes[i].type === 'switch' && this.Textboxes[i].values[0] !== "") {
        bjson[this.Textboxes[i].placeholder] = this.Textboxes[i].values[0];



      } else if (this.Textboxes[i] !== null && this.Textboxes[i].type === 'datepicker' && this.dateValues[i] !== undefined) {
        bjson[this.Textboxes[i].lnames[0]] = this.dateValues[i];

      } else if (this.Textboxes[i] !== null && this.Textboxes[i].type === 'timepicker' && this.timeValues[i] !== undefined) {
        bjson[this.Textboxes[i].lnames[0]] = this.timeValues[i];

      } else if (this.Textboxes[i] !== null && this.Textboxes[i].type === 'fbook' && this.Textboxes[i].values[0] !== "") {

        bjson[this.Textboxes[i].placeholder] = this.Textboxes[i].values[0];

      } else if (this.Textboxes[i] !== null && this.Textboxes[i].type === 'linkedin' && this.Textboxes[i].values[0] !== "") {

        bjson[this.Textboxes[i].placeholder] = this.Textboxes[i].values[0];

      } else if (this.Textboxes[i] !== null && this.Textboxes[i].type === 'gplus' && this.Textboxes[i].values[0] !== "") {

        bjson[this.Textboxes[i].placeholder] = this.Textboxes[i].values[0];

      } else if (this.Textboxes[i] !== null && this.Textboxes[i].type === 'twitter' && this.Textboxes[i].values[0] !== "") {

        bjson[this.Textboxes[i].placeholder] = this.Textboxes[i].values[0];
      } else if (this.Textboxes[i] !== null && this.Textboxes[i].type === 'text_label' && this.Textboxes[i].values[0] !== "") {

        bjson[this.Textboxes[i].placeholder] = this.Textboxes[i].values[0];
      }

    }
    this.jsonObj.push(bjson);

    let Obj = {
      "formValues": this.jsonObj
    }
    this.renderPagesService.putFormData(Obj);
    alert("Data sent successfully");


    console.log(this.jsonObj);
  }
}

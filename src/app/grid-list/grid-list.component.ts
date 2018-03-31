import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
declare var $: any;
declare var perfectScrollbar: any;
declare var height: any;
declare var tabs: any;

@Component({
  selector: 'grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.css']
})
export class GridListComponent implements OnInit {



  sales: any[];

  columns: any[] = [];
  subcolumns: any = {};

  ngOnInit() {
    this.sales = [
      { brand: 'Apple', 'Sale Rate': { sale: { lastYearSale: '51%', thisYearSale: '40%' }, Profits: { lastYearProfit: '$54,406.00', thisYearProfit: '$43,342' } } },
      { brand: 'Samsung', 'Sale Rate': { sale: { lastYearSale: '83%', thisYearSale: '96%' }, Profits: { lastYearProfit: '$423,132', thisYearProfit: '$312,122' } } },
      { brand: 'Microsoft', 'Sale Rate': { sale: { lastYearSale: '38%', thisYearSale: '5%' }, Profits: { lastYearProfit: '$12,321', thisYearProfit: '$8,500' } } },
      { brand: 'Philips', 'Sale Rate': { sale: { lastYearSale: '49%', thisYearSale: '22%' }, Profits: { lastYearProfit: '$745,232', thisYearProfit: '$650,323,' } } },
      { brand: 'Song', 'Sale Rate': { sale: { lastYearSale: '17%', thisYearSale: '79%' }, Profits: { lastYearProfit: '$643,242', thisYearProfit: '500,332' } } },
      { brand: 'LG', 'Sale Rate': { sale: { lastYearSale: '52%', thisYearSale: ' 65%' }, Profits: { lastYearProfit: '$421,132', thisYearProfit: '$150,005' } } },
      { brand: 'Sharp', 'Sale Rate': { sale: { lastYearSale: '82%', thisYearSale: '12%' }, Profits: { lastYearProfit: '$131,211', thisYearProfit: '$100,214' } } },
      { brand: 'Panasonic', 'Sale Rate': { sale: { lastYearSale: '44%', thisYearSale: '45%' }, Profits: { lastYearProfit: '$66,442', thisYearProfit: '$53,322' } } },
      { brand: 'HTC', 'Sale Rate': { sale: { lastYearSale: '90%', thisYearSale: '56%' }, Profits: { lastYearProfit: '$765,442', thisYearProfit: '$296,232' } } },
      { brand: 'Toshiba', 'Sale Rate': { sale: { lastYearSale: '75%', thisYearSale: '54%' }, Profits: { lastYearProfit: '$21,212', thisYearProfit: '$12,533' } } }
    ];

    this.columns = this.getKeys(this.sales[0]);

    console.log(this.columns);
    // var count = 0;
    // for (var i = 0; i < this.columns.length; i++) {

    //   if (this.columns[i].includes('.') && count === this.columns[i].split('.').length) {
    //     var key = this.columns[i].split('.')[0];
    //     this.subcolumns[key] = [];
    //     count++;
    //   } if (this.columns[i].includes(key)) {
    //     this.subcolumns[key].push(this.columns[i].split('.')[0]);
    //   } else {
    //     this.subcolumns[this.columns[i]] = '';
    //   }
    // }
    // console.log(this.subcolumns);

  }

  createJSONOfJSON() {

  }




  getKeys(object) {
    function iter(o, p) {
      if (Array.isArray(o)) { return; }
      if (o && typeof o === 'object') {
        let keys = Object.keys(o);
        if (keys.length) {
          keys.forEach(function (k) { iter(o[k], p.concat(k)); });
        }
        return;
      }
      result.push(p.join('.'));
    }
    var result = [];
    iter(object, []);
    return result;
  }

}




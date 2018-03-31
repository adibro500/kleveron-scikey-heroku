import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { GridOptions } from 'ag-grid';
import { RequestOptions, Headers, Http } from '@angular/http';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  public gridOptions: GridOptions;
  private gridApi;
  private gridColumnApi;
  constructor(private http: Http) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {

        headerName: "Assessment Name",
        field: "title",
      },
      {
        headerName: "Updated On",
        field: "updated_on",
      },
      {
        headerName: "End Time",
        field: "end_time",
      },
      {
        headerName: "Created On",
        field: "created_on",
      },
      {
        headerName: "Version",
        field: "version",
      },
      {
        headerName: "Version",
        field: "version",
      },
      {
        headerName: "Survey Id",
        field: "survey_id",
      },
      {
        headerName: "Start Time",
        field: "start_time",
      },
      {
        headerName: "Updated By",
        field: "updated_by",
      },
      {
        headerName: "Survey Status",
        field: "survey_status",

        // {
        //   headerName: "Total",
        //   columnGroupShow: "closed",
        //   field: "total",
        //   width: 100,
        //   filter: "agNumberColumnFilter"
        // },
        // {
        //   headerName: "Gold",
        //   columnGroupShow: "open",
        //   field: "gold",
        //   width: 100,
        //   filter: "agNumberColumnFilter"
        // },
        // {
        //   headerName: "Silver",
        //   columnGroupShow: "open",
        //   field: "silver",
        //   width: 100,
        //   filter: "agNumberColumnFilter"
        // },
        // {
        //   headerName: "Bronze",
        //   columnGroupShow: "open",
        //   field: "bronze",
        //   width: 100,
        //   filter: "agNumberColumnFilter"
        // }

      }];
    // this.gridOptions.rowData = [
    //   { id: 5, value: 10, sex: "male", salary: 5000 },
    //   { id: 10, value: 15, sex: "female", salary: 9000 },
    //   { id: 15, value: 20, sex: "male", salary: 5000 }
    // ]
  }
  res;
  resarr: any[] = [];
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let apiheaders = new RequestOptions();
    let headers = new Headers();
    headers.append("user_code", localStorage.getItem("user_code"));
    headers.append("token", localStorage.getItem('token'));
    headers.append("orgname", "dev-futurxlabs");
    headers.append("Content-Type", "application/json");
    apiheaders.headers = headers;
    this.http
      .get("https://dev-futurxlabs.scikey.io/scikey/v1/assessments?is_resource=true", apiheaders)
      .subscribe(res1 => {
        this.res = JSON.parse(JSON.stringify(res1.json()));
        this.resarr = this.res.data;
        console.log(this.resarr);
        params.api.setRowData(this.resarr);
      });
  }


}

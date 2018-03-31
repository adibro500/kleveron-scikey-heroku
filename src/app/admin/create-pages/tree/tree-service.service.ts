import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { TreeNode } from "primeng/primeng";

@Injectable()
export class NodeService {

  constructor(private http: Http) { }

  getFiles() {
    return this.http.get('/assets/data/files.json')
      .toPromise()
      .then(res => <TreeNode[]>res.json().data);
  }
}
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  private data = {};

  constructor() { }

  setData(key, value) {
    this.data[key] = value;
  }
  getData(key) {
    return this.data[key];
  }
  resetData() {
    this.data = {};
  }

}

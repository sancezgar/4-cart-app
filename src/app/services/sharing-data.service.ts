import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _idProductEventEmmiter:EventEmitter<number> = new EventEmitter();
  private _productEventEmmiter:EventEmitter<Product> = new EventEmitter();

  constructor() { }

  get idProductEventEmmiter(){
    return this._idProductEventEmmiter;
  }

  get productEventEmmiter(){
    return this._productEventEmmiter;
  }

}

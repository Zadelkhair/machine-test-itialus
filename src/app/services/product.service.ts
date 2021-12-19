import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor() { }

  // all(): product[] {

  //   let prods : product[] = [];

  //   environment

  //   return prods;

  // }

  // get(): product {

  //   let prod : product = new product();

  //   return prod;

  // }

  // create():void {

  // }

  // update(): void {

  // }

  // delete(): void {

  // }

}

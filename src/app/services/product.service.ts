import { Injectable } from '@angular/core';
import product from '../views/types/product';
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor() { }

  all(): product[] {

    let prods : product[] = [];

    return prods;

  }

  get(): product {

    let prod : product = new product();

    return prod;

  }

  create():void {

  }

  update(): void {

  }

  delete(): void {

  }



}

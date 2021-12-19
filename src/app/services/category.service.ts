import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Category from '../views/types/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  all(): Observable<Category[]> {

    let categories: Observable<Category[]>;

    categories = this.http.get<Category[]>(environment.apiUrl+'/api/all/categories',{
      headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'your bearer token'
      })
    });

    return categories;

  }

  get(): Category {

    let cat: Category = new Category();

    return cat;

  }

  create(category:Category): void {

    this.http.post(environment.apiUrl+'\api\store\category',category, {
      headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'your bearer token'
      })
    });

  }

  update(): void {

  }

  delete(): void {

  }
}

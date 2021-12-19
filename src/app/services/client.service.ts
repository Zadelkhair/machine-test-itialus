import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import Client from "../moduls/client/client";

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  apiUrl: string = "";
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'API-KEY': environment.apiKey
  });

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  all(): Observable<Client[]> {
    //return this.http.get<Client[]>(this.apiUrl + '/clients', {headers:this.headers});
    return this.http.get<Client[]>(this.apiUrl + '/clients', {headers:this.headers});
  }

  byid(id: number) : Observable<Client> {
    //return this.http.get<Client>(this.apiUrl + '/clients/' + id, { headers: this.headers });
    return this.http.get<Client>(this.apiUrl + '/clients/details?client_id=' + id, { headers: this.headers });
  }

  create(client: Client) : Observable<Client> {
    //return this.http.post<Client>(this.apiUrl + '/clients', client, { headers: this.headers });
    return this.http.post<Client>(this.apiUrl + '/clients/add', client, { headers: this.headers });
  }

  update(client: Client) : Observable<Client> {
    //return this.http.put<Client>(this.apiUrl + '/clients/'+ client.client_id, client, { headers: this.headers });
    return this.http.post<Client>(this.apiUrl + '/clients/update', client, { headers: this.headers });
  }

  delete(client: Client) : Observable<Client> {
    //return this.http.delete<Client>(this.apiUrl + '/clients/' + client.client_id, { headers: this.headers });
    return this.http.post<Client>(this.apiUrl + '/clients/delete/' + client.client_id, { headers: this.headers });
  }

}

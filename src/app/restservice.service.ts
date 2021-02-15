import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { World, Pallier, Product } from './world';

@Injectable({
  providedIn: 'root'


})
export class RestserviceService {
  server = "http://localhost:8080/"
  user = "";
  constructor(private http: HttpClient) {

  }

  getUser(){    
    return this.user;
  }
  setUser(user: string){
    this.user=user;
  }

  getServer() {
    return this.server;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
   }
   getWorld(): Promise<World> {
    return this.http.get(this.server + "adventureisis/generic/world")
    .toPromise().catch(this.handleError);    
   };
   
}

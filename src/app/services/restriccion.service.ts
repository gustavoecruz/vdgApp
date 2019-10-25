import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestriccionService {

  readonly URL_API = "http://localhost:9090/RestriccionDTO";

  constructor(private http:HttpClient) { }

  getRestricciones(email: string){
    return this.http.get(this.URL_API+ "/getByUsuarioApp/" +
      email);
  }
}

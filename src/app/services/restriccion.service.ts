import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestriccionService {

  readonly URL_API = "https://vdg-back.herokuapp.com/RestriccionDTO";

  constructor(private http:HttpClient) { }

  getRestricciones(email: string){
    return this.http.get(this.URL_API+ "/getByUsuarioApp/" +
      email);
  }
}

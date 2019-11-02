import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PruebaDeVidaService {

  readonly URL_API = "http://localhost:9090/PruebaDeVida";

  constructor(private http: HttpClient) { }

  getPruebasDeVida(email: string) {
    return this.http.get(this.URL_API + "/getByMail/" +
      email);
  }

  

}

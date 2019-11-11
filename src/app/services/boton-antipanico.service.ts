import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BotonAntipanico } from '../models/boton-antipanico';

@Injectable({
  providedIn: 'root'
})
export class BotonAntipanicoService {

  readonly URL_API = 'https://vdg-back.herokuapp.com/BotonAntipanico';

  constructor(private http: HttpClient) { }

  alertar(botonAntipanico: BotonAntipanico, email: string){
    return this.http.post(this.URL_API + "/" + email, botonAntipanico);
  }

}

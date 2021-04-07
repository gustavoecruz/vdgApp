import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FotoPruebaDeVidaService {

  readonly URL_API = environment.apiUrl+"FotoPruebaDeVida";

  constructor(private http: HttpClient) { }

  postFotoPruebaDeVida(idPruebaDeVida: number, foto: string) {
    return this.http.post(this.URL_API + "/"+ idPruebaDeVida , foto);
  }
}

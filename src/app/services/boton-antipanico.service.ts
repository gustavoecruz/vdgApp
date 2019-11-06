import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BotonAntipanicoService {

  readonly URL_API = 'http://localhost:9090/BotonAntipanico';

  constructor(private http: HttpClient) { }

  alertar(emailDamnificada: string){
    return this.http.get(this.URL_API + '/' + emailDamnificada);
  }

}

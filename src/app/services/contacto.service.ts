import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contacto } from '../models/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  readonly URL_API = 'http://localhost:9090/Contacto';

  constructor(private http: HttpClient) { }

  getContacto(idDamnifacada: number){
    return this.http.get(this.URL_API + '/' + idDamnifacada);
  }

  postContacto(contacto: Contacto){
    return this.http.post(this.URL_API, contacto);
  }

  deleteContacto(idContacto: number){
    return this.http.delete(this.URL_API + "/" + idContacto);
  }

}

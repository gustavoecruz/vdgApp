import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: Usuario[];
  readonly URL_API = 'http://localhost:9090/Usuario';

  constructor(private http: HttpClient) { }

  getUsuarios(){
    return this.http.get(this.URL_API);
  }

}

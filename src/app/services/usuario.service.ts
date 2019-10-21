import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: Usuario[];
  readonly URL_API = 'https://vdg-back.herokuapp.com/Usuario';

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get(this.URL_API);
  }

  login(email: String, contrasena: String) {
    const loginInfo = {};
    loginInfo["email"] = email;
    loginInfo["contrasena"] = contrasena;
    return this.http.post(this.URL_API + "/login", loginInfo);
  }

}

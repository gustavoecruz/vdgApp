import { Injectable } from '@angular/core';
import { RestriccionDTO } from 'src/app/models/restriccion-dto';
import { Contacto } from 'src/app/models/contacto';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  restriccionDTO: RestriccionDTO;
  contacto: Contacto;
  emailUsuario: string = "";

  constructor() { }

  enviarRestriccion(restriccion: RestriccionDTO) {
    this.restriccionDTO = restriccion;
  }

  enviarContacto(contacto: Contacto) {
    this.contacto = contacto;
  }

  enviarEmailUsuario(emailUsuario: string) {
    this.emailUsuario = emailUsuario;
  }
}

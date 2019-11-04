import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacto } from 'src/app/models/contacto';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-gestionar-contactos',
  templateUrl: './gestionar-contactos.page.html',
  styleUrls: ['./gestionar-contactos.page.scss'],
})
export class GestionarContactosPage implements OnInit {

  contactos: Contacto[];

  constructor(private router: Router, private contactoService: ContactoService) { }

  ngOnInit() {
    this.getContactos();
  }

  abrirContacto(contacto: string){
    console.log(contacto);
  }

  getContactos(){
    this.contactoService.getContacto(2)
    .subscribe(res => {
      this.contactos = res as Contacto[];
      console.log(res);
    })
  }

  eliminarContacto(contacto: Contacto){
    this.contactoService.deleteContacto(contacto.idContacto)
    .subscribe(res => {
      this.getContactos();
    })
  }
}

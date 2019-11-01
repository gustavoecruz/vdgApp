import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacto } from 'src/app/models/contacto';

@Component({
  selector: 'app-gestionar-contactos',
  templateUrl: './gestionar-contactos.page.html',
  styleUrls: ['./gestionar-contactos.page.scss'],
})
export class GestionarContactosPage implements OnInit {

  contactos: Contacto[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  abrirContacto(contacto: string){
    console.log(contacto);
  }

}

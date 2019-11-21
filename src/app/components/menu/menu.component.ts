import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  usuario: Usuario = new Usuario;

  listaDamnificada= [
    {
      titulo:'Localizar victimario',
      icon: 'locate',
      url: '/restricciones-localizables'
    },
    {
      titulo:'Gestionar contactos',
      icon: 'contacts',
      url: '/gestionar-contactos'
    }
  ];
  
  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.get('usuario').then((user) => {
      this.usuario = user as Usuario;
    })
  }

}

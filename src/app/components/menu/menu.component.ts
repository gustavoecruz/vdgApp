import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  lista= [
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
  
  constructor() { }

  ngOnInit() {}

}

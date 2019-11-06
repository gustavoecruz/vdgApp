import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacto } from 'src/app/models/contacto';
import { ContactoService } from 'src/app/services/contacto.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-gestionar-contactos',
  templateUrl: './gestionar-contactos.page.html',
  styleUrls: ['./gestionar-contactos.page.scss'],
})
export class GestionarContactosPage implements OnInit {

  contactos: Contacto[];
  loaderToShow: any;

  constructor(private router: Router, private contactoService: ContactoService,
    private storage: Storage, public loadingController: LoadingController) {
    }

  ngOnInit() {
  }

  //EVENTO IONIC QUE EJECUTA METODO CADA VEZ QUE SE INGRESA A LA PAG
  ionViewDidEnter(){
    this.getContactos();
  }

  getContactos(){
    this.showLoader("Cargando contactos...");
    this.storage.get('persona').then((email) => {
      this.contactoService.getContacto(email)
      .subscribe(res => {
        this.loadingController.dismiss();
        this.contactos = res as Contacto[];
      });  
    });
  }

  eliminarContacto(contacto: Contacto){
    this.showLoader("Eliminando contacto...");
    this.contactoService.deleteContacto(contacto.idContacto)
    .subscribe(res => {
      this.loadingController.dismiss();
      this.getContactos();
    })
  }

  async showLoader(mensaje: string) {
    const loading = await this.loadingController.create({
      spinner: "lines-small",
      message: mensaje,
      backdropDismiss: false,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

}

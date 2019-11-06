import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Contacto } from 'src/app/models/contacto';
import { Router } from '@angular/router';
import { PickerController } from '@ionic/angular';
import { ContactoService } from 'src/app/services/contacto.service';
import { Storage } from '@ionic/storage';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';

@Component({
  selector: 'app-agregar-contacto',
  templateUrl: './agregar-contacto.page.html',
  styleUrls: ['./agregar-contacto.page.scss'],
})
export class AgregarContactoPage implements OnInit {

  contacto: Contacto = new Contacto;
  loaderToShow: any;

  constructor(private toastController: ToastController, public loadingController: LoadingController,
    private router: Router, public pickerCtrl: PickerController, private contactoService: ContactoService,
    private storage: Storage, private comunicacionService: ComunicacionService) { }

  ngOnInit() {
    this.contacto = this.comunicacionService.contacto;
  }

  agregarContacto(contactoForm: NgForm) {
    if(contactoForm.invalid){
      this.presentToast('Falta completar campos');
    }
    else{
      this.showLoader("Agregando contacto...");
      this.contacto.apellido = contactoForm.value.apellido;
      this.contacto.nombre = contactoForm.value.nombre;
      this.contacto.email = contactoForm.value.email;
      this.contacto.telefono = contactoForm.value.telefono;
      this.contacto.relacion = contactoForm.value.relacion;
      this.contacto.idDamnificada = 2;
      this.contactoService.postContacto(this.contacto)
        .subscribe(res => {
          this.loadingController.dismiss();
          this.presentToast('Contacto agregado correctamente.');
          contactoForm.reset();
          this.router.navigate(["/gestionar-contactos"]);
          this.contacto = new Contacto;
          this.comunicacionService.contacto = new Contacto;
        });
    }
  }

  //ABRE TOIAST CON MENSAJE
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  //ABRE EL PICKER PARA SELECCIONAR RELACIÓN
  async openPicker() {
    const picker = await this.pickerCtrl.create({
      buttons: [{
        text: 'Guardar',
      }],
      columns: [
        {
          name: 'relacion',
          options: [
            {
              text: 'Padre/Madre',
              value: 1
            },
            {
              text: 'Hermano/a',
              value: 2
            },
            {
              text: 'Otro familiar',
              value: 3
            },
            {
              text: 'Amigo/a',
              value: 4
            },
            {
              text: 'Compañero de trabajo/estudio',
              value: 5
            },
            {
              text: 'Otro',
              value: 6
            }
          ]
        }
      ]
    });
    await picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('relacion');
      this.contacto.relacion = col.options[col.selectedIndex].text;
    });
  }

  //ABRE CUADRO DE ESPERA
  showLoader(mensaje: string) {
    this.loaderToShow = this.loadingController.create({
      message: mensaje
    }).then((res) => {
      res.present();
    });
  }

}

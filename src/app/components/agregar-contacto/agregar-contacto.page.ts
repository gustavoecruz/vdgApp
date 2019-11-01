import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Contacto } from 'src/app/models/contacto';
import { Router } from '@angular/router';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-contacto',
  templateUrl: './agregar-contacto.page.html',
  styleUrls: ['./agregar-contacto.page.scss'],
})
export class AgregarContactoPage implements OnInit {

  contacto: Contacto = new Contacto;

  constructor(private toastController: ToastController, public loadingController: LoadingController,
    private router: Router, public pickerCtrl: PickerController) { }

  ngOnInit() {
  }

  agregarContacto(contactoForm: NgForm) {
    console.log(this.contacto);
    console.log(contactoForm.value);
    this.presentToast('Contacto agregado correctamente.');
    contactoForm.reset();
    this.router.navigate(["/gestionar-contactos"]);
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
              value: "padre/madre"
            },
            {
              text: 'Hermano/a',
              value: 3
            },
            {
              text: 'Otro familiar',
              value: 4
            },
            {
              text: 'Amigo/a',
              value: 5
            },
            {
              text: 'Compañero de trabajo/estudio',
              value: 6
            },
            {
              text: 'Otro',
              value: 7
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

}

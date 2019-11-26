import { Component, OnInit } from '@angular/core';
import { Notificacion } from 'src/app/models/notificacion';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  notificaciones: Notificacion[];
  loaderToShow: any;

  constructor(
    private notificacionService: NotificacionService,
    public loadingController: LoadingController,
    private router: Router,
    private comunicacion: ComunicacionService) { }

  ngOnInit() {
    this.getNotificaciones();
  }

  getNotificaciones() {
    //    this.showLoader();
    this.notificacionService.getNoificaciones(localStorage.getItem('emailUsuario'))
      .subscribe(res => {
        console.log(res);
        //        this.loadingController.dismiss();
        this.notificaciones = res as Notificacion[];
      });
  }

  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'Cargando notificaciones'
    }).then((res) => {
      res.present();
    });
  }

  ir() {
    if (localStorage.getItem('rolUsuario') == "DAMNIFICADA") {
      this.router.navigate(["/home-damnificada"]);
    }
    else {
      this.router.navigate(["/home-victimario"]);
    }
  }

}

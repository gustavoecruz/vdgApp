import { Component, OnInit } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { Router } from '@angular/router';
import { BotonAntipanicoService } from 'src/app/services/boton-antipanico.service';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home-damnificada',
  templateUrl: './home-damnificada.page.html',
  styleUrls: ['./home-damnificada.page.scss'],
})
export class HomeDamnificadaPage implements OnInit {

  lat: number;
  lon: number;
  lat2: number;
  lon2: number;
  distancia: number;

  constructor(public geolocation: Geolocation, private ubicacionService: UbicacionService,
    private router: Router, private botonAntipanicoService: BotonAntipanicoService,
    private storage: Storage, public loadingController: LoadingController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.getGeolocation();
    this.watchGeolocation();
  }

  localizacionSegundoPlano() {
  }

  getGeolocation() {
    console.log("ME PIDIO POSITION");
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      this.lat = geoposition.coords.latitude;
      this.lon = geoposition.coords.longitude;
      console.log("TENGO LAS COORD");
      console.log("LAT " + this.lat);
    });
  }

  watchGeolocation() {
    let watch = this.geolocation.watchPosition({ enableHighAccuracy: true });
    watch.subscribe((data) => {
      this.lat2 = data.coords.latitude;
      this.lon2 = data.coords.longitude;
      this.distancia = data.coords.accuracy;
    });
  }

  calculateDistance(lon1, lon2, lat1, lat2) {
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((lon1 - lon2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a)));
    return Math.trunc(dis * 1000);
  }

  localizarVictimario() {
    console.log("fea");
    this.router.navigate(["/restricciones-localizables"]);
  }

  alertar() {
    this.showLoader("Enviando alerta a contactos...");
    this.storage.get('persona').then((email) => {
      this.botonAntipanicoService.alertar(email)
        .subscribe(res => {
          this.loadingController.dismiss();
          this.presentToast('Alerta enviada a contactos correctamente.');
        });
    });
  }

  //ABRE CUADRO DE CARGA
  async showLoader(mensaje: string) {
    const loading = await this.loadingController.create({
      spinner: "lines-small",
      message: mensaje,
      backdropDismiss: false,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  //ABRE TOIAST CON MENSAJE
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }


}

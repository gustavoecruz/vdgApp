import { Component, OnInit } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { Router } from '@angular/router';


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

  constructor(public geolocation: Geolocation, private ubicacionService: UbicacionService,
    private router: Router) { }

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

}

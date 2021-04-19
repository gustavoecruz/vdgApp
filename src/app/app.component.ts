import { Component } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { ComunicacionService } from './services/comunicacion/comunicacion.service';
import { UbicacionService } from './services/ubicacion.service';
import { NotificacionService } from './services/notificacion.service';
import { Notificacion } from './models/notificacion';
import { ForegroundService } from '@ionic-native/foreground-service/ngx';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private backgroundMode: BackgroundMode,
    private localNotifications: LocalNotifications,
    private comunicacion: ComunicacionService,
    private ubicacionService: UbicacionService,
    private notificacionService: NotificacionService,
    public geolocation: Geolocation,
    private foregroundService: ForegroundService,
    private http: HttpClient
  ) {
    this.initializeApp();
  }


  private latitud: any;
  private longitud: any;
  private contador = 0;
  readonly URL_API = 'https://vdg-back.herokuapp.com/'+'Ubicacion';
  private email = "damnificada2@damnificada.com"




  initializeApp() {
    this.platform.ready().then(() => {

      this.foregroundService.start('GPS Running', 'Background Service');
      //setInterval(() => this.notificar(), 20000);
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();

      this.backgroundMode.on('activate').subscribe(() => {
        console.log("Background activado");
        this.backgroundMode.disableWebViewOptimizations();
        let watch = this.geolocation.watchPosition({ enableHighAccuracy: true });
        watch.subscribe((data) => {
          this.latitud = data.coords.latitude;
          this.longitud = data.coords.longitude;
        });
        //setInterval(() => this.hagoElPost(), 10000);
        setInterval(() => console.log("Hora "+(new Date()).toUTCString()), 10000);

      });


      this.backgroundMode.disableBatteryOptimizations();
      this.backgroundMode.overrideBackButton();
      this.backgroundMode.excludeFromTaskList();
      //setInterval(() => this.notificarDos(), 10000);
      this.backgroundMode.enable();


    });
  }

  hagoElPost(){
    console.log("Interval de 10 segs");
    const loginInfo = {};
    loginInfo["latitud"] = this.latitud;
    loginInfo["longitud"] = this.longitud; 
    console.log("HAGO EL POST lat: "+this.latitud+"    lon: "+this.longitud+"   email: "+this.email);
    console.log(this.http.post(this.URL_API +"/postUbi/"+this.email, loginInfo));
    return this.http.post(this.URL_API +"/postUbi/"+this.email, loginInfo);
  }


  //NOSE SI LAS LLAMADAS VAN ADENTRO DEL SCHEDULE
  notificarDos() {
    console.log("INTERVAL DEL BACKGROUND CORRIENDO");
    if (this.comunicacion.emailUsuario != "") {
      console.log("LLAMO A ENVIAR UBICACION");
      this.enviarUbicacion();
      
    }
  }

  //NOSE SI LAS LLAMADAS VAN ADENTRO DEL SCHEDULE
  notificar() {
    console.log(this.comunicacion.emailUsuario);
    if (this.comunicacion.emailUsuario != "") {
      this.enviarUbicacion();
      this.tengoNotificaciones();
    }
  }

  enviarUbicacion() {
    console.log("AHORA ENVIO LA UBICACION");
    this.ubicacionService.postUbicacion(this.comunicacion.emailUsuario,
      this.latitud, this.longitud)
      .subscribe(res => {
        console.log("Ya me devolvio el RES");
        console.log(res);
      });
    /*
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      console.log("Ya tengo el position actual");
      this.ubicacionService.postUbicacion(this.comunicacion.emailUsuario,
        geoposition.coords.latitude, geoposition.coords.longitude)
        .subscribe(res => {
          console.log("Ya me devolvio el RES");
          console.log(res);
        });
    });
    */
  }

  tengoNotificaciones() {
    this.notificacionService.getNotificacionesNoVistas(this.comunicacion.emailUsuario)
      .subscribe(res => {
        console.log(res);
        var notificacionesNoVistas = res as Notificacion[];
        var i: number;
        for (i = 0; i < notificacionesNoVistas.length; i++) {
          this.mostrarNotificacion(notificacionesNoVistas[i].descripcion);
        }
      });
  }

  mostrarNotificacion(mensaje) {
    this.localNotifications.schedule({
      title: 'Hola ' + this.comunicacion.emailUsuario,
      text: mensaje,
      trigger: {
        in: 1,
        unit: ELocalNotificationTriggerUnit.SECOND,
      },
    });
  }
}

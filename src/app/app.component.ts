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
    public geolocation: Geolocation
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      setInterval(() => this.notificar(), 10000);
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();
      this.backgroundMode.enable();
      //nuevo
      this.backgroundMode.disableBatteryOptimizations();
      this.backgroundMode.disableWebViewOptimizations();
      this.backgroundMode.on('activate').subscribe(() => {
        this.backgroundMode.disableBatteryOptimizations();
        this.backgroundMode.disableWebViewOptimizations();
        this.backgroundMode.overrideBackButton();
        this.backgroundMode.excludeFromTaskList();
        this.backgroundMode.setDefaults({ silent: true });
        setInterval(() => this.notificar(), 10000);
      });
    });
  }

  //NOSE SI LAS LLAMADAS VAN ADENTRO DEL SCHEDULE
  notificar() {
    if (this.comunicacion.emailUsuario != "") {
      this.localNotifications.schedule({
        title: 'Hola' + this.comunicacion.emailUsuario,
        text: 'Multi ILocalNotification 2',
        trigger: {
          in: 1,
          unit: ELocalNotificationTriggerUnit.SECOND,
        },
      });
      this.enviarUbicacion();
      this.tengoNotificaciones();
    }

  }

  enviarUbicacion() {
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      this.ubicacionService.postUbicacion(this.comunicacion.emailUsuario,
        geoposition.coords.latitude, geoposition.coords.longitude).subscribe(res => { console.log(res); });
    });
  }

  tengoNotificaciones() {
    this.notificacionService.getNotificacionesNoVistas(this.comunicacion.emailUsuario).subscribe(res => {
      var notificacionesNoVistas = res as Notificacion[];
      var i: number;
      for(i = 0; i<notificacionesNoVistas.length; i++){
        this.mostrarNotificacion(notificacionesNoVistas[i].descripcion);
      }
    })
  }

  mostrarNotificacion(mensaje){
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

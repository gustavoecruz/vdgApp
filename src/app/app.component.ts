import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { ComunicacionService } from './services/comunicacion/comunicacion.service';

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
    private comunicacion: ComunicacionService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
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
    }
  }

}

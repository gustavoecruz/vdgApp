import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { NgForm } from '@angular/forms';
import * as sha256 from 'js-sha256';
import { Router } from '@angular/router';
import { LoadingController, ToastController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loaderToShow: any;

  //Back button
  subscribe: any;

  usuarioStorage: Usuario = new Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router,
    public loadingController: LoadingController, public toastController: ToastController,
    private storage: Storage, private platform: Platform, private comunicacion: ComunicacionService)
  { }

  ngOnInit() {
            if(localStorage.getItem('emailUsuario') != ''){
              this.comunicacion.enviarEmailUsuario(localStorage.getItem('emailUsuario'));
              if(localStorage.getItem('rolUsuario')=="DAMNIFICADA"){
                this.router.navigate(["/home-damnificada"]);
              }
              else{
                this.router.navigate(["/home-victimario"]);
              }
            }
   }

  ingresar(usuarioForm: NgForm) {
    if (usuarioForm.valid) {
      var mail = usuarioForm.value.email;
      var contrasena = sha256.sha256(usuarioForm.value.password);
      this.showLoader();
      this.usuarioService.login(mail, contrasena)
        .subscribe(rolUsuario => {
          this.loadingController.dismiss();
          this.usuarioStorage.email = mail;
          this.usuarioStorage.rolDeUsuario = rolUsuario as string;
          console.log("DATOS ROL: " + rolUsuario);
          this.setUsuario(mail);
          if (rolUsuario == "VICTIMARIO") {
            this.router.navigate(["/home-victimario"]);
            localStorage.setItem('emailUsuario', mail);
            localStorage.setItem('rolUsuario', "VICTIMARIO")
            this.storage.set('usuario', this.usuarioStorage);
            this.comunicacion.enviarEmailUsuario(mail);
          }
          else if (rolUsuario == "DAMNIFICADA") {
            this.router.navigate(["/home-damnificada"]);
            localStorage.setItem('emailUsuario', mail);
            localStorage.setItem('rolUsuario', "DAMNIFICADA")
            this.storage.set('usuario', this.usuarioStorage);
            this.comunicacion.enviarEmailUsuario(mail);
          }
          else
            this.loginInvalido();
        });
    }
  }

  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'Iniciando sesión'
    }).then((res) => {
      res.present();
    });
  }

  async loginInvalido() {
    const toast = await this.toastController.create({
      header: "Error al iniciar sesión.",
      message: 'Por favor verifique los datos ingresados.',
      duration: 4000,
      color: "danger"
    });
    toast.present();
  }

  setUsuario(email: string) {
    this.storage.set('persona', email);
  }

}

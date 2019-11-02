import { Component, OnInit } from '@angular/core';
import { PruebaDeVida } from 'src/app/models/prueba-de-vida';
import { LoadingController } from '@ionic/angular';
import { PruebaDeVidaService } from 'src/app/services/prueba-de-vida.service';

@Component({
  selector: 'app-home-victimario',
  templateUrl: './home-victimario.page.html',
  styleUrls: ['./home-victimario.page.scss'],
})
export class HomeVictimarioPage implements OnInit {

  loaderToShow: any;
  pruebasDeVida: PruebaDeVida[];  

  constructor(public loadingController: LoadingController, private pruebaDeVidaService: PruebaDeVidaService) { }

  ngOnInit() {
    this.cargarPruebasDeVida();
  }

  cargarPruebasDeVida(){
    var emailPersona = localStorage.getItem("emailUsuario");
    this.showLoader();
    this.pruebaDeVidaService.getPruebasDeVida(emailPersona).subscribe(pruebasPersona =>{
      this.loadingController.dismiss();
      this.pruebasDeVida = pruebasPersona as PruebaDeVida[];
      console.log("PRUEBAS: " + this.pruebasDeVida);
    });
  }

  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'Cargando solicitudes de prueba de vida'
    }).then((res) => {
      res.present();
    });
  }

}

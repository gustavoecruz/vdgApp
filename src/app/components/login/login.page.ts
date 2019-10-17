import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios(){
    this.usuarioService.getUsuarios()
      .subscribe(res => {
        this.usuarioService.usuarios = res as Usuario[];
        console.log(res);
      })
  }

}

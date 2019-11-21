import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './components/login/login.module#LoginPageModule' },
  { path: 'home-damnificada', loadChildren: './components/home-damnificada/home-damnificada.module#HomeDamnificadaPageModule' },
  { path: 'localizacion-victimario', loadChildren: './localizacion-victimario/localizacion-victimario.module#LocalizacionVictimarioPageModule' },
  { path: 'restricciones-localizables', loadChildren: './components/restricciones-localizables/restricciones-localizables.module#RestriccionesLocalizablesPageModule' },
  { path: 'gestionar-contactos', loadChildren: './components/gestionar-contactos/gestionar-contactos.module#GestionarContactosPageModule' },
  { path: 'agregar-contacto', loadChildren: './components/agregar-contacto/agregar-contacto.module#AgregarContactoPageModule' },  { path: 'home-victimario', loadChildren: './components/home-victimario/home-victimario.module#HomeVictimarioPageModule' },
  { path: 'pruebas-de-vida', loadChildren: './components/pruebas-de-vida/pruebas-de-vida.module#PruebasDeVidaPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

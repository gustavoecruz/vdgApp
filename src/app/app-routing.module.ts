import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './components/login/login.module#LoginPageModule' },
  { path: 'home-damnificada', loadChildren: './components/home-damnificada/home-damnificada.module#HomeDamnificadaPageModule' },  { path: 'localizacion-victimario', loadChildren: './localizacion-victimario/localizacion-victimario.module#LocalizacionVictimarioPageModule' },
  { path: 'restricciones-localizables', loadChildren: './components/restricciones-localizables/restricciones-localizables.module#RestriccionesLocalizablesPageModule' },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

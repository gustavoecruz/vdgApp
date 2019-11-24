import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  readonly URL_API = 'https://vdg-back.herokuapp.com/Notificacion';

  constructor(private http: HttpClient) { }

  getNotificacionesNoVistas(email: String){
    return this.http.get(this.URL_API + '/getNoVistas/' + email);
  }
}

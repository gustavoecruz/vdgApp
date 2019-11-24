import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UbicacionDTO } from '../models/ubicacion-dto';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  readonly URL_API = 'https://vdg-back.herokuapp.com/Ubicacion';

  constructor(private http: HttpClient) { }

  postUbicacion(email: String, latitud: number, longitud: number) {
    const loginInfo = {};
    loginInfo["latitud"] = latitud;
    loginInfo["longitud"] = longitud; 
    console.log("HAGO EL POST lat: "+latitud+"    lon: "+longitud+"   email: "+email);
    console.log(this.http.post(this.URL_API +"/postUbi/"+email, loginInfo));
    return this.http.post(this.URL_API +"/postUbi/"+email, loginInfo);
  }

  getUbicacionesRestriccion(idRestriccion: number) {
    return this.http.get(this.URL_API + "/getByRestriccion/" + idRestriccion);
  }

  getEstaInfringiendo(idRestriccion: number, ubicacionDTO: UbicacionDTO) {
    return this.http.post(this.URL_API + "/infringe/" + idRestriccion, ubicacionDTO);
  }

}

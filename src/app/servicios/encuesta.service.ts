import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()
export class EncuestaService{
    public url:String;
    
    constructor(private _http:HttpClient){
      this.url = GLOBAL.url;
    }
    
    getListaEcuesta(correo):Observable<any>{
      return this._http.get(this.url+`encuesta/obtenerEncuestasPorUsuario?correo=${correo}`);
    } 

}

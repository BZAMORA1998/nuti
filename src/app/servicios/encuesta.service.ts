import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EncuestaService{
    public url:String;
    
    constructor(private _http:HttpClient){
        this.url="https://notisurvey.goitsa.me/notisurvey/resources/";
    }
    
    getListaEcuesta(correo):Observable<any>{
      return this._http.get(this.url+`encuesta/obtenerEncuestasPorUsuario?correo=${correo}`);
    } 

}

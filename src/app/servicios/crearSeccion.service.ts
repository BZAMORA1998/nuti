import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CrearSeccionService{
	public url: string;

	constructor(
        public _http:HttpClient
	){
		this.url="https://notisurvey.goitsa.me/notisurvey/resources/";
	}


	postCrearSeccion(seccion){
		console.log(seccion);
		var params = JSON.stringify(seccion);
		console.log("servicio: "+params);
		let headers = new HttpHeaders({'Content-Type':'application/json'});
		return this._http.post('https://notisurvey.goitsa.me/notisurvey/resources/seccion/crearListaSeccion',params,{headers: headers});
    }
}
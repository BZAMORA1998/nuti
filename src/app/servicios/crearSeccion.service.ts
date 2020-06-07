import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class CrearSeccionService{
	public url: string;

	constructor(
        public _http:HttpClient
	){
		this.url=this.url = GLOBAL.url;
	}


	postCrearSeccion(seccion){
		//console.log(seccion);
		var listaSecciones=JSON.stringify(seccion);
		console.log(listaSecciones);
		var headers = new HttpHeaders({'Content-Type':'application/json'});
		return this._http.post(this.url+'seccion/crearListaSeccion',listaSecciones,{headers: headers});
    }
}
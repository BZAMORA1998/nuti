import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable()
export class SeccionService{
	public url: string;

	constructor(
        public _http:HttpClient
	){
		this.url=this.url = environment.apiUrl;
	}


	postCrearSeccion(seccion):Observable<any>{
		var listaSecciones=JSON.stringify(seccion);
		console.log(listaSecciones);
		var headers = new HttpHeaders({'Content-Type':'application/json'});
		return this._http.post(this.url+'seccion/crearListaSeccion',listaSecciones,{headers: headers});
	}
	
	getListaSecciones(id):Observable<any>{
		return this._http.get(this.url+`seccion/obtenerSeccionPorIdEncuesta?idEncuesta=${70}`);
	}
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable()
export class PreguntasService{
	public url: string;

	constructor(
        public _http:HttpClient
	){
		this.url=this.url = environment.apiUrl;
	}


	postCrearPreguntas(preguntas):Observable<any>{
		var listaPreguntas=JSON.stringify(preguntas);
		console.log("JSON: "+listaPreguntas);
		var headers = new HttpHeaders({'Content-Type':'application/json'});
		return this._http.post(this.url+'pregunta/crearListaPreguntas',listaPreguntas,{headers: headers});
	}
	
	getListaPreguntas(id):Observable<any>{
		console.log("Id de servicio es",id);
		return this._http.get(this.url+`pregunta/obtenerPreguntasPorIdEncuesta?idEncuesta=${id}`);
	}
}
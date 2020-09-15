import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
	
	getListaPreguntasPorSeccion(id):Observable<any>{
		console.log("Id de servicio es",id);
		return this._http.get(this.url+`pregunta/obtenerPreguntasPorIdSeccion?idSeccion=${id}`);
	}

	
	getListaPreguntas(id):Observable<any>{
		console.log("Id de servicio es",id);
		return this._http.get(this.url+`pregunta/obtenerPreguntasPorIdEncuesta?idEncuesta=${id}`);
	}

	// Servicios de inhabilitación - Pregunta - Opciones
	
	postInactivarPregunta(idPregunta, estado):Observable<any>{
		let body = new HttpParams()
			.set('idPregunta',idPregunta)
			.set('estado',estado)

			let headers = new HttpHeaders()
			.set('Content-Type','application/x-www-form-urlencoded');

		return this._http.post(this.url+'pregunta/inhabilitarPregunta',body.toString(),{headers:headers})
	}

	postInactivarOpcionesPregunta(idPregunta,idOpcion, estado):Observable<any>{
		let body = new HttpParams()
			.set('idPregunta',idPregunta)
			.set('idOpcion',idOpcion)
			.set('estado',estado)
		
			let headers = new HttpHeaders()
			.set('Content-Type','application/x-www-form-urlencoded');

		return this._http.post(this.url+'pregunta/inhabilitarOpcion',body.toString(),{headers:headers});
	}
}
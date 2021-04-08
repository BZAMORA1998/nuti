import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable()
export class ReportesService{
	public url: string;

	constructor(
        public _http:HttpClient
	){
		this.url=this.url = environment.apiUrl;
	}


	postObtenerReporte(idEncuesta, fechaInicio, fechaFin):Observable<any>{
		let body = new HttpParams()
			.set('idEncuesta',idEncuesta)
            .set('fechaInicio',fechaInicio)
            .set('fechaFin',fechaFin)

			let headers = new HttpHeaders()
			.set('Content-Type','application/x-www-form-urlencoded');

		return this._http.post(this.url+'reporte/obtenerRespuestasPorIdEncuesta',body.toString(),{headers:headers})
	}


}
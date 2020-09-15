import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { environment } from 'src/environments/environment';


@Injectable()
export class EncuestaService{
    public url:String;
    
    constructor(private _http:HttpClient){
      this.url = environment.apiUrl;
    }
    
    getListaEcuesta(correo,size,pagina):Observable<any>{
      console.log(correo,size,pagina);
      return this._http.get(this.url+`encuesta/obtenerEncuestasPorUsuario?correo=${correo}&size=${size}&pagina=${pagina}`);
    } 

    getEncuestaXId(idEncuesta):Observable<any>{
      console.log(idEncuesta);
      return this._http.get(this.url+`formulario/obtenerFormulario?idSurvey=${idEncuesta}`);

    }

    getEncuestaXIdPost(idEncuesta):Observable<any>{
      let body = new HttpParams()
      .set('idEncuesta',idEncuesta)

      let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.post(this.url+'encuesta/obtenerEncuestaPorId',body.toString,{headers:headers});
    }

    postCrearEncuesta(encuesta):Observable<any>{
      let body = new HttpParams()
         .set('correo',encuesta.correo)
         .set('titulo',encuesta.titulo)
         .set('mensaje',encuesta.mensaje)
         .set('fechaInicio',encuesta.fechaInicio)
         .set('fechaFin',encuesta.fechaFin)
         .set('link',encuesta.link)
         .set('unidadNegocio',encuesta.unidadNegocio)
         .set('imagenCab',encuesta.imagenCabecera)
         .set('imagenMedi',encuesta.imagenMedi)
         .set('imagenPie',encuesta.imagenPie)
         .set('notaPie',encuesta.notaPie)
         .set('idEncuesta',encuesta.idEncuesta)
         
       let headers=new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded');
            
      return this._http.post(this.url+'encuesta/crearEncuesta',body.toString(),{headers:headers});
    } 


    postSubirImagen(nombreImagen,imgBase64):Observable<any>{
      let body = new HttpParams()
         .set('nombreImagen',nombreImagen)
         .set('imgBase64',imgBase64)

      let headers = new HttpHeaders()
         .set('Content-Type', 'application/x-www-form-urlencoded');

         return this._http.post(this.url+'encuesta/subirImagen',body.toString(),{headers:headers});
      }


    postObtenerEncuestasAbiertas(idEncuesta:number):Observable<any>{
      let body = new HttpParams()
        .set('idEncuesta',idEncuesta.toString())

        let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'encuesta/obtenerEncuestasAbiertas',body.toString(),{headers:headers});
    }


    postRespuestasPorEncuestaCount(idEncuesta:number):Observable<any>{
      let body = new HttpParams()
      .set('idEncuesta',idEncuesta.toString())

      let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

      return this._http.post(this.url+'encuesta/obtenerRespuestasEncuesta',body.toString(),{headers:headers});
  }

}

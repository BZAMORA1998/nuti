import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CrearUsuarioService{
    public url:String;
    
    constructor(private _http:HttpClient){
        this.url="http://vmi244822.contaboserver.net:8080/notisurvey-war/resources/seguridades";
    }
    
    postCrearUsuario(user):Observable<any>{
      let body = new HttpParams()
         .set('empresa',user.empresa)
         .set('nombre',user.nombre)
         .set('apellido',user.apellido)
         .set('password',user.password)
         .set('nick',user.nick)
         .set('correo',user.correo)

       let headers=new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded');
            
      return this._http.post(this.url+'/crearCuenta',body.toString(),{headers:headers});
    } 
}

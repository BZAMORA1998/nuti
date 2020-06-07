import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable()
export class CrearUsuarioService{
    public url:String;
    
    constructor(private _http:HttpClient){
        this.url=environment.apiUrl;
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
            
      return this._http.post(this.url+'seguridades/crearCuenta',body.toString(),{headers:headers});
    } 
}

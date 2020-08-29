import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { isEmptyObject } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class LoginService{
    public url:String;
    public usuario:Usuario;

    
    constructor(private _http:HttpClient){
      this.url = environment.apiUrl;
      this.usuario=JSON.parse(localStorage.getItem("usuario"));
      
    }
    
    getAutenticacion(nick,password):Observable<any>{
      let body = new HttpParams()
         .set('nick', nick)
         .set('password', password);

       let headers=new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded');
            
      return this._http.post(this.url+'seguridades/login',body.toString(),{headers:headers});
    } 
    

    estaAutenticado(): boolean{      
      if(isEmptyObject(this.usuario)){
        console.log("Usuario no logeado");
        return false;
      }else{
        console.log("Usuario logeado");
        return true;
      }
    }

    logout(){
      localStorage.removeItem('usuario');
    }
}

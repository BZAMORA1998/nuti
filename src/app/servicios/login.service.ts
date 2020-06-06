import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class LoginService{
    public url:String;
    
    constructor(private _http:HttpClient){
      this.url = GLOBAL.url;
    }
    
    getAutenticacion(nick,password):Observable<any>{
      let body = new HttpParams()
         .set('nick', nick)
         .set('password', password);

       let headers=new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded');
            
      return this._http.post(this.url+'seguridades/login',body.toString(),{headers:headers});
    } 
}

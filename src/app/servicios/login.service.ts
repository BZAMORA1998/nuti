import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService{
    public url:String;
    
    constructor(private _http:HttpClient){
      this.url = environment.apiUrl;
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

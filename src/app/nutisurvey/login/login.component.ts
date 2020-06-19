import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CrearEncuesta } from 'src/app/models/crearEncuesta';
import { ListaSecciones } from 'src/app/models/listaSecciones';
import { SesSeccionPK } from 'src/app/models/sesSeccionPK';
import {Router, ActivatedRoute} from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { Usuario } from 'src/app/models/usuario';
declare var require: any
var $ = require('jquery');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

  public crearEncuesta: CrearEncuesta;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _loginService:LoginService
  ) { 
    this.usuario=new Usuario("","","","","",0);
  }

  typeInputF="password";
  showPF:boolean=true;
  mostrarPassword(){

    if(this.typeInputF=="text"){
      this.showPF=true;
      this.typeInputF="password";
    }else{
      this.showPF=false;
      this.typeInputF="text";
    }
  }
  
  ngOnInit(): void {
    localStorage.clear();
    this.crearEncuesta=new CrearEncuesta("","","","","","",0,"","","","",0);
    localStorage.setItem("crearEncuesta",JSON.stringify(this.crearEncuesta));
    localStorage.setItem("idEncuesta",JSON.stringify(0));
  }
   public usuario:Usuario;
   public nick:String;
   public password:String;

   redidirigirRegistroEncuesta(){
      return this._router.navigate(['../notisurvey/home/diseño-encuesta']);
  }

  showModalError(message){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor:'#ea792d',
    })
  }
  
  loading(activar){
    Swal.fire({
      html: "<div class='row loading'>"+
                "<div class='col-2'>"+
                    "<div class='spinner-border'></div>"+
                '</div>'+
                "<div class='col-10'>"+
                    "<p class='text-dark'>Procesando, espere por favor...</p>"+
                '</div>'+
            "</div>",    
      showCancelButton: false,
      showConfirmButton: false,
      width: '380px',
    });

    if(!activar){
      Swal.close();
    }
  }

  autenticacion(){
    this.loading(true);
    this._loginService.getAutenticacion(this.nick,this.password).subscribe(
      Response=>{
        if(Response.respuestaProceso.codigo==200){
          this.usuario=Response.usuario;
          console.log(this.usuario);
          localStorage.setItem("usuario",JSON.stringify(this.usuario));
          this.loading(false);
          this.redidirigirRegistroEncuesta();
        }else{
          console.log(Response.respuestaProceso);
          this.loading(false);
          this.showModalError(Response.respuestaProceso.mensaje);
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
}

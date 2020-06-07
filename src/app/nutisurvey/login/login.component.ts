import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CrearEncuesta } from 'src/app/models/crearEncuesta';
import { ListaSecciones } from 'src/app/models/listaSecciones';
import { SesSeccionPK } from 'src/app/models/sesSeccionPK';
import {Router, ActivatedRoute} from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

  public crearEncuesta: CrearEncuesta;
  public crearSeccion:ListaSecciones[]=[
    new ListaSecciones(""," ",0, new SesSeccionPK(0,0,0)) 
  ]; 

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _loginService:LoginService
  ) { 
    this.usuario=new Usuario("","","","","",0);
  }

  ngOnInit(): void {
    localStorage.clear();
    this.crearEncuesta=new CrearEncuesta("","","","","","",0,"","","","",0);
    localStorage.setItem("crearEncuesta",JSON.stringify(this.crearEncuesta));
    localStorage.setItem("crearSeccionLista",JSON.stringify(this.crearSeccion));
  }
  public usuario:Usuario;
   public nick:String;
   public password:String;

   redidirigirRegistroEncuesta(){
      return this._router.navigate(['../notisurvey/home/diseño-encuesta']);
  }

  showModal(message){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor:'#ea792d',
    })
  }

  autenticacion(){
    this._loginService.getAutenticacion(this.nick,this.password).subscribe(
      Response=>{
        if(Response.respuestaProceso.codigo==200){
          this.usuario=Response.usuario;
          console.log(this.usuario);
          localStorage.setItem("usuario",JSON.stringify(this.usuario));
          this.redidirigirRegistroEncuesta();
        }else{
          console.log(Response.respuestaProceso);
          this.showModal(Response.respuestaProceso.mensaje);
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  loading(){
      Swal.fire({
        html: "<div class='row'>"+
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
  }

}

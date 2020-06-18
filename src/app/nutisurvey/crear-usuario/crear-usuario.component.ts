import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CrearUsuario } from 'src/app/models/crearUsuario';
import { ActivatedRoute, Router } from '@angular/router';
import { CrearUsuarioService } from 'src/app/servicios/crearUsuario.service';
declare var require: any
var $ = require('jquery');
import 'jquery-ui-dist/jquery-ui';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  providers:[CrearUsuarioService]
})
export class CrearUsuarioComponent implements OnInit {
  public crearUsuario:CrearUsuario;
  public contrasenaright:String;
  public contrasenaleft:String;
  constructor( private _route:ActivatedRoute,
               private _router:Router,
               private _crearUsuarioService:CrearUsuarioService
    ) { 
    this.crearUsuario=new CrearUsuario("","","","","","");
    this.contrasenaright="";
    this.contrasenaleft="";
  }

  ngOnInit(): void {
    var efect="drop";
    var time=1000; 

    //creacion de usuario
    $("input[id=pregunta1Siguiente]").click(function () {    
    $("#form-pregunta1").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta2").toggle(efect);
        }, time);
    });

    $("input[id=pregunta2Siguiente]").click(function () {    
    $("#form-pregunta2").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta3").toggle(efect);
        }, time);
    });

    $("input[id=pregunta2Anterior]").click(function () {    
    $("#form-pregunta2").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta1").toggle(efect);
        }, time);
    });

    $("input[id=pregunta3Siguiente]").click(function () {    
    $("#form-pregunta3").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta4").toggle(efect);
        }, time);
    });

    $("input[id=pregunta3Anterior]").click(function () {    
        $("#form-pregunta3").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta2").toggle(efect);
        }, time);
    });

    $("input[id=pregunta4Siguiente]").click(function () {    
        $("#form-pregunta4").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta5").toggle(efect);
        }, time);
    });

    $("input[id=pregunta4Anterior]").click(function () {    
        $("#form-pregunta4").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta3").toggle(efect);
        },time);
    });

    $("input[id=pregunta5Siguiente]").click(function () {    
        $("#form-pregunta5").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta6").toggle(efect);
        }, time);
    });

    $("input[id=pregunta5Anterior]").click(function () {    
        $("#form-pregunta5").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta4").toggle(efect);
        },time);
    });

    $("input[id=pregunta6Siguiente]").click(function () {    
        $("#form-pregunta6").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta7").toggle(efect);
        }, time);
    });

    $("input[id=pregunta6Anterior]").click(function () {    
        $("#form-pregunta6").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta5").toggle(efect);
        },time);
    });
  }

  contrasenaigual():boolean{
    if(this.contrasenaright!=this.contrasenaleft){
      return false;
    }else{
      this.crearUsuario.password=this.contrasenaright;
      return true;
    }
  }

  redirigirLogin(){
      setTimeout(()=>{
        window.location.reload();
      }, 100);
      return this._router.navigate(['/login']);
  }

  showModal(message){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor:'#ea792d',
    });
  }

  mostrarModalConfirmacion(message){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      confirmButtonColor:'#ea792d',
      showConfirmButton: true,
    }).then((result) => {
      if (result.value) {
        this.redirigirLogin();
      }
     });
  }

  crearusuario(){
    console.log(this.crearUsuario);
    this._crearUsuarioService.postCrearUsuario(this.crearUsuario).subscribe(
      Response=>{
        console.log(Response);
        if(Response.codigo==200){
          this.mostrarModalConfirmacion(Response.mensaje);
        }else{
          this.showModal(Response.mensaje);
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

}

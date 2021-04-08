import { Component, OnInit } from '@angular/core';
import { ListaSecciones } from 'src/app/models/listaSecciones';
import { SesSeccionPK } from 'src/app/models/sesSeccionPK';
import { ActivatedRoute, Router } from '@angular/router';
import { SeccionService } from 'src/app/servicios/seccion.service';
import { CrearSeccion } from 'src/app/models/crearSeccion';
import Swal from 'sweetalert2';


declare var require: any
var $ = require('jquery');
import 'jquery-ui-dist/jquery-ui';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.css'],
  providers:[SeccionService]
})
export class SeccionesComponent implements OnInit {
  public crearSeccion:ListaSecciones;
  public crearSeccionList:Array<ListaSecciones>;
  public crearS:CrearSeccion;
  public idEncuesta:number;


  constructor(private _seccionService:SeccionService,
              private _route:ActivatedRoute,
              private _router:Router,) {
    this.idEncuesta=Number(JSON.parse(localStorage.getItem("idEncuesta")));
    this.crearSeccionList=new Array<ListaSecciones>();
  }

   ngOnInit(): void {
    this.getSeccion(this.idEncuesta);
  }
  
deshabilitarAgregarSeccion(){

    var cont=0;
    var auxBool=true;
    var nombres= document.getElementsByName("nombres");
    var descripcion = document.getElementsByName("descripcion"); 
    console.log("Lenght "+nombres.length);
    for (var i = 0; i < nombres.length; i++) {
      var desc=(descripcion[i]as HTMLInputElement).value;
      var nom=(nombres[i]as HTMLInputElement).value;
      if(desc=='' || nom==''){
        console.log("Entro al for"+cont);
        cont++;
      }
      auxBool=false;
    }

    
    var agregar = <any> document.getElementById("btn-agregarSeccion");
    var aceptar = <any> document.getElementById("btn-aceptar");
    if(cont==0 && auxBool==false){
      agregar.disabled = false;
      aceptar.disabled = false;
    }else{
      agregar.disabled = true;
      aceptar.disabled = true;
    }
  }

  saveRespuestaInput(titulo,idSeccion,idAux){
    var auxBool=true;

      if(idSeccion!=0){
        this.crearSeccionList.forEach(element => {
            if(element.sesSeccionPK.idSeccion==idSeccion){
              element.sesSeccionPK.idIndice=1;
              element.sesSeccionPK.idSeccion=idSeccion;
              element.titulo=titulo;
              element.sesSeccionPK.idEncuesta=this.idEncuesta;
              this.deshabilitarAgregarSeccion();
          }
        });
      }else{
        this.crearSeccionList.forEach(element => {

          if(element.idAux==idAux && auxBool){
              element.sesSeccionPK.idIndice=1;
              element.idAux=idAux;
              element.titulo=titulo;
              element.sesSeccionPK.idEncuesta=this.idEncuesta;
              console.log(this.crearSeccionList);
              auxBool=false;
              this.deshabilitarAgregarSeccion();
          }
        });
        if(auxBool){
          this.crearSeccionList.forEach(element => {
            if(element.idAux==0 && auxBool){
                element.sesSeccionPK.idIndice=1;
                element.idAux=idAux;
                element.titulo=titulo;
                element.sesSeccionPK.idEncuesta=this.idEncuesta;
                auxBool=false;
                this.deshabilitarAgregarSeccion();
            }
          });
        }
      }
}

  saveRespuestaTextArea(descripcion,idSeccion,idAux){
    var auxBool=true;

      if(idSeccion!=0){
        this.crearSeccionList.forEach(element => {
 
            if(element.sesSeccionPK.idSeccion==idSeccion){
                element.sesSeccionPK.idIndice=1;
                element.sesSeccionPK.idSeccion=idSeccion;
                element.descripcion=descripcion;
                element.sesSeccionPK.idEncuesta=this.idEncuesta;
                this.deshabilitarAgregarSeccion();
            }
          });
      }else{
        this.crearSeccionList.forEach(element => {

          if(element.idAux==idAux && auxBool){
              element.sesSeccionPK.idIndice=1;
              element.idAux=idAux;
              element.descripcion=descripcion;
              element.sesSeccionPK.idEncuesta=this.idEncuesta; 
              console.log(element);
              auxBool=false;
              this.deshabilitarAgregarSeccion();
          }
        });
        if(auxBool){

          this.crearSeccionList.forEach(elementr => {

            if(elementr.idAux==0 && auxBool){
                elementr.sesSeccionPK.idIndice=1;
                elementr.idAux=idAux;
                elementr.descripcion=descripcion;
                elementr.sesSeccionPK.idEncuesta=this.idEncuesta;
                elementr.sesSeccionPK.idEncuesta=this.idEncuesta;
                auxBool=false;
                this.deshabilitarAgregarSeccion();
            }
          });
        }
      }
  }

  agregarSeccion(){
    this.crearSeccion=new ListaSecciones();
    this.crearSeccionList.push(this.crearSeccion);
  }

  getSeccion(idEncuesta):any{
    this._seccionService.getListaSecciones(idEncuesta).subscribe(
      Response=>{
            if(Response.respuestaProceso.codigo==200){
              this.crearSeccionList=Response.listarSecciones;
              if(this.crearSeccionList.length==0){
                this.agregarSeccion();
                this.deshabilitarAgregarSeccion(); 
              }
            }else{
              console.log(Response);
            }
      },
      error=>{
          console.log(<any>error);
      }
    );
  }

  saveSeccion(){
      this.loading(true);
      this.crearS= new CrearSeccion(this.crearSeccionList);

      console.log("Crear seccion",this.crearS);
      this._seccionService.postCrearSeccion(this.crearS).subscribe(
        Response=>{
              if(Response.codigo==200){
                console.log(Response);
                this.loading(false);
                this.showModalConfirmacion(Response.mensaje);
              }else{
                console.log(Response);
                this.loading(true);
                this.showModalError(Response.mensaje);
              }
        },
        error=>{
            console.log(<any>error);
        }
      );
  }


  showModalConfirmacion(message){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      confirmButtonColor:'#ea792d',
      showConfirmButton: true,
    }).then((result) => {
      if (result.value) {
        this.refresh();;
      }
     });
     this.Preguntas();
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

  showModalError(message){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor:'#ea792d',
     })
  }
  
  
  refresh():void{
    setTimeout(()=>{
      window.location.reload();
    });
  }


  Preguntas(){
    return this._router.navigate(['../notisurvey/home/preguntas']);
  }
}

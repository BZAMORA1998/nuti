import { Component, OnInit } from '@angular/core';
import { ListaSecciones } from 'src/app/models/listaSecciones';
import { SesSeccionPK } from 'src/app/models/sesSeccionPK';
import { SeccionService } from 'src/app/servicios/seccion.service';
import { CrearSeccion } from 'src/app/models/crearSeccion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.css'],
  providers:[SeccionService]
})
export class SeccionesComponent implements OnInit {
  public contador:number;
  public crearSeccion:ListaSecciones;
  public crearSeccionList:ListaSecciones[];
  public list:ListaSecciones[];
  public crearS:CrearSeccion;
  public prueba:ListaSecciones[];
  public idEncuesta:number;

  constructor(private _seccionService:SeccionService) {
    this.contador=0;
    this.crearSeccion=new ListaSecciones("","",0,new SesSeccionPK(0,0,0));
    this.list=[new ListaSecciones("","",0,new SesSeccionPK(0,0,0))];
    this.crearSeccionList=JSON.parse(localStorage.getItem("crearSeccionLista"));
    this.idEncuesta=JSON.parse(localStorage.getItem("idEncuesta"));
    console.log(this.crearSeccionList);

   }

  ngOnInit(): void {

    $("#btn-agregarSeccion").click(function(){
      $('#li-clonar').clone().removeAttr("id").insertAfter('.ul-step li:last').find('.campo').val("");
    });
  }

  mostrarModalConfirmacion(message){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      confirmButtonColor:'#ea792d',
      showConfirmButton: true,
    });
  }

  showModal(message){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor:'#ea792d',
    })
  }

  
  CrearSeccion(){
    var nombres= document.getElementsByName("nombres");
    var descripcion = document.getElementsByName("descripcion"); 
  
      this.list=[];
    
      for (var i = 0; i < nombres.length; i++) {
        this.crearSeccion=new ListaSecciones("","",0,new SesSeccionPK(0,0,0));
        // this.crearSeccion.sesSeccionPK.idEncuesta=47;
        this.crearSeccion.sesSeccionPK.idIndice=0;
        // this.crearSeccion.sesSeccionPK.idSeccion=47;
        this.crearSeccion.descripcion=(descripcion[i]as HTMLInputElement).value;
        this.crearSeccion.titulo=(nombres[i]as HTMLInputElement).value;
        // this.crearSeccion.nroSeccion=1;
        this.crearSeccion.sesSeccionPK.idEncuesta=this.idEncuesta;
        this.list.push(this.crearSeccion);
      }

      localStorage.removeItem('crearSeccionLista');
      localStorage.setItem("crearSeccionLista",JSON.stringify(this.list));
      console.log(this.list);
      this.crearS= new CrearSeccion(this.list);
      this._seccionService.postCrearSeccion(this.crearS).subscribe(
        Response=>{
              if(Response.codigo==200){
                console.log(Response);
                this.mostrarModalConfirmacion(Response.mensaje);
              }else{
                console.log(Response);
                this.showModal(Response.mensaje);
              }
        },
        error=>{
            console.log(<any>error);
        }
      );
  }
}

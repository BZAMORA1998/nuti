import { Component, OnInit } from '@angular/core';
import { ListaSecciones } from 'src/app/models/listaSecciones';
import { SesSeccionPK } from 'src/app/models/sesSeccionPK';
import { SeccionService } from 'src/app/servicios/seccion.service';
import { CrearSeccion } from 'src/app/models/crearSeccion';
import Swal from 'sweetalert2';
import { element } from 'protractor';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.css'],
  providers:[SeccionService]
})
export class SeccionesComponent implements OnInit {
  public crearSeccion:ListaSecciones;
  public crearSeccionList:ListaSecciones[];
  public crearSeccionListAux:ListaSecciones[];
  public list:ListaSecciones[];
  public crearS:CrearSeccion;
  public prueba:ListaSecciones[];
  public seccionesId:ListaSecciones[];
  public seccionesSinId:ListaSecciones[];
  public idEncuesta:number;

  constructor(private _seccionService:SeccionService) {
    this.crearSeccion=new ListaSecciones("","",0,0,new SesSeccionPK(0,0,0));
    this.list=[new ListaSecciones("","",0,0,new SesSeccionPK(0,0,0))];
    this.crearSeccionListAux=[new ListaSecciones("","",0,0,new SesSeccionPK(0,0,0))];
    this.crearSeccionList=JSON.parse(localStorage.getItem("crearSeccionLista"));
    this.idEncuesta=JSON.parse(localStorage.getItem("idEncuesta"));
    console.log(this.crearSeccionList);

   }

  ngOnInit(): void {

    // $("#btn-agregarSeccion").click(function(){
    //   $('#li-clonar').clone().removeAttr("id").insertAfter('.ul-step li:last').find('.campo').val("");
    // });  
    this.getSeccion(0); 
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

  public listarSecciones:any[]=[
    {
      descripcion: "",
      estado: "",
      nroSeccion: 0,
      sesSeccionPK: {
          idEncuesta: 66,
          idIndice: 1,
          idSeccion: 54
      },
      titulo:""
    }
  ];
  
  saveRespuestaInput(titulo,idSeccion,idAux){
    var auxBool=true;
    console.log("Titulo: ",titulo);
    console.log("IdSeccion: ",idSeccion);
    console.log("IdAux: ",idAux);

      if(idSeccion!=0){
        this.crearSeccionList.forEach(element => {
            if(element.sesSeccionPK.idSeccion==idSeccion){
              element.sesSeccionPK.idIndice=1;
              element.sesSeccionPK.idSeccion=idSeccion;
              element.titulo=titulo;
              element.sesSeccionPK.idEncuesta=this.idEncuesta;
              console.log("Input"+this.crearSeccion);
              localStorage.removeItem('crearSeccionLista');
              localStorage.setItem("crearSeccionLista",JSON.stringify(this.crearSeccionList));
              console.log(this.crearSeccionList);
          }
        });
      }else{
        this.crearSeccionList.forEach(element => {
          console.log("Comparacion: "+element.idAux,idAux,auxBool)
          if(element.idAux==idAux && auxBool){
              element.sesSeccionPK.idIndice=1;
              element.sesSeccionPK.idSeccion=idAux;
              element.titulo=titulo;
              element.sesSeccionPK.idEncuesta=this.idEncuesta;
              console.log("Titulo con IdAux:"+element);
              localStorage.removeItem('crearSeccionLista');
              localStorage.setItem("crearSeccionLista",JSON.stringify(this.crearSeccionList));
              console.log(this.crearSeccionList);
              auxBool=false;
              console.log("bool if"+auxBool);
          }
        });
        console.log(" bool SinId: "+auxBool)
        if(auxBool){
          console.log(" Entro SinId: "+idAux)
          this.crearSeccionList.forEach(element => {
            console.log(" Entro SinId: "+element.idAux,idAux,auxBool)
            if(element.idAux==0 && auxBool){
                element.sesSeccionPK.idIndice=1;
                element.idAux=idAux;
                element.titulo=titulo;
                element.sesSeccionPK.idEncuesta=this.idEncuesta;
                console.log("Titulo sin idAux:"+element);

                // var nombres= document.getElementsByName("nombres");
                // var descripciones = document.getElementsByName("descripcion"); 
 

                // for(var i=0;nombres.length;i++){
                //     (descripciones[i]as HTMLInputElement).value;
                //     (nombres[i]as HTMLInputElement).value;
                // }
                
                localStorage.removeItem('crearSeccionLista');
                localStorage.setItem("crearSeccionLista",JSON.stringify(this.crearSeccionList));
                console.log("Final sin id: "+this.crearSeccionList);
                auxBool=false;
                console.log("bool sin id: "+this.crearSeccionList);
            }
          });
        }
      }
}

  saveRespuestaTextArea(descripcion,idSeccion,idAux){
    var auxBool=true;
    console.log("descripcion",descripcion);
    console.log("idSeccion",idSeccion);
    console.log("IdAux: ",idAux);

      if(idSeccion!=0){
        this.crearSeccionList.forEach(element => {
            if(element.sesSeccionPK.idSeccion==idSeccion){
              console.log("Comparacion: "+element.sesSeccionPK.idSeccion,idSeccion)
                element.sesSeccionPK.idIndice=1;
                element.sesSeccionPK.idSeccion=idSeccion;
                element.descripcion=descripcion;
                element.sesSeccionPK.idEncuesta=this.idEncuesta;
                console.log("TextArea con idSeccion:"+element);
                localStorage.removeItem('crearSeccionLista');
                localStorage.setItem("crearSeccionLista",JSON.stringify(this.crearSeccionList));
                console.log(this.crearSeccionList);
            }
          });
      }else{
        this.crearSeccionList.forEach(element => {
          console.log("Comparacion: "+element.idAux,idAux,auxBool)
          if(element.idAux==idAux && auxBool){
              element.sesSeccionPK.idIndice=1;
              element.sesSeccionPK.idSeccion=idAux;
              element.descripcion=descripcion;
              element.sesSeccionPK.idEncuesta=this.idEncuesta;
              console.log("TextArea con IdAux:"+element);
              localStorage.removeItem('crearSeccionLista');
              localStorage.setItem("crearSeccionLista",JSON.stringify(this.crearSeccionList));
              console.log(this.crearSeccionList);
              auxBool=false;
              console.log("bool if"+auxBool);
          }
        });
        console.log(" bool SinId: "+auxBool)
        if(auxBool){
          console.log(" Entro SinId: "+idAux)
          this.crearSeccionList.forEach(element => {
            console.log(" Entro SinId: "+element.idAux,idAux,auxBool)
            if(element.idAux==0 && auxBool){
                element.sesSeccionPK.idIndice=1;
                element.idAux=idAux;
                element.descripcion=descripcion;
                element.sesSeccionPK.idEncuesta=this.idEncuesta;
                console.log("TextArea sin idAux:"+element);

                // var nombres= document.getElementsByName("nombres");
                // var descripciones = document.getElementsByName("descripcion"); 
 

                // for(var i=0;nombres.length;i++){
                //     (descripciones[i]as HTMLInputElement).value;
                //     (nombres[i]as HTMLInputElement).value;
                // }
                
                localStorage.removeItem('crearSeccionLista');
                localStorage.setItem("crearSeccionLista",JSON.stringify(this.crearSeccionList));
                console.log("Final sin id: "+this.crearSeccionList);
                auxBool=false;
                console.log("bool sin id: "+this.crearSeccionList);
            }
          });
        }
      }
  }

  agregarSeccion(){
    this.crearSeccion=new ListaSecciones("","",0,0,new SesSeccionPK(0,0,0));
    this.crearSeccionList.push(this.crearSeccion);
    localStorage.removeItem('crearSeccionLista');
    localStorage.setItem("crearSeccionLista",JSON.stringify(this.listarSecciones));
  }

  getSeccion(idEncuesta):any{
    this.listarSecciones=[];

    this._seccionService.getListaSecciones(idEncuesta).subscribe(
      Response=>{
            if(Response.respuestaProceso.codigo==200){
              console.log(Response.listarSecciones);
              this.listarSecciones=Response.listarSecciones;

              this.listarSecciones.forEach(element => {
                console.log("Lista:"+element.descripcion);
              });

              localStorage.removeItem('crearSeccionLista');
              localStorage.setItem("crearSeccionLista",JSON.stringify(this.listarSecciones));

            }else{
              console.log(Response);
            }
      },
      error=>{
          console.log(<any>error);
      }
    );

  }

  CrearSeccion(){

      this.crearS= new CrearSeccion(this.crearSeccionList);

      console.log(this.crearS);
      // this._seccionService.postCrearSeccion(this.crearS).subscribe(
      //   Response=>{
      //         if(Response.codigo==200){
      //           console.log(Response);
      //           this.getSeccion(this.idEncuesta);
      //           this.mostrarModalConfirmacion(Response.mensaje);

      //         }else{
      //           console.log(Response);
      //           this.showModal(Response.mensaje);
      //         }
      //   },
      //   error=>{
      //       console.log(<any>error);
      //   }
      // );
  }
}

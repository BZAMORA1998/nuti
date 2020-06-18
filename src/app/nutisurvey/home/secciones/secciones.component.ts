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
  public crearSeccion:ListaSecciones;
  public crearSeccionList:ListaSecciones[]=[];
  public crearS:CrearSeccion;
  public idEncuesta:number;
  public estado:string="A"

  constructor(private _seccionService:SeccionService) {
    this.crearSeccion=new ListaSecciones("", this.estado,0,0,new SesSeccionPK(0,0,0),"");
    this.crearSeccionList=[new ListaSecciones("", this.estado,0,0,new SesSeccionPK(0,0,0),"")];
    this.crearSeccionList=JSON.parse(localStorage.getItem("crearSeccionLista"));
    this.idEncuesta=Number(JSON.parse(localStorage.getItem("idEncuesta")));
    console.log(this.crearSeccionList);

   }

  ngOnInit(): void {
    console.log(this.idEncuesta);
    this.getSeccion(this.idEncuesta);

    console.log("Longitud: "+this.crearSeccionList.length);

    if(this.crearSeccionList.length==0){
      this.agregarSeccion(); 
    }
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
              console.log("Titulo: ",titulo);
              element.titulo=titulo;
              element.sesSeccionPK.idEncuesta=this.idEncuesta;
              localStorage.removeItem('crearSeccionLista');
              localStorage.setItem("crearSeccionLista",JSON.stringify(this.crearSeccionList));
              console.log("Lista de Seccion: "+this.crearSeccionList);
          }
        });
      }else{
        this.crearSeccionList.forEach(element => {
          console.log("Comparacion: "+element.idAux,idAux,auxBool)
          if(element.idAux==idAux && auxBool){
              element.sesSeccionPK.idIndice=1;
              element.idAux=idAux;
              element.titulo=titulo;
              element.sesSeccionPK.idEncuesta=this.idEncuesta;
              localStorage.removeItem('crearSeccionLista');
              localStorage.setItem("crearSeccionLista",JSON.stringify(this.crearSeccionList));
              console.log(this.crearSeccionList);
              auxBool=false;
              console.log("Lista de Seccion: "+this.crearSeccionList);
          }
        });
        if(auxBool){
          this.crearSeccionList.forEach(element => {
            if(element.idAux==0 && auxBool){
                element.sesSeccionPK.idIndice=1;
                element.idAux=idAux;
                element.titulo=titulo;
                element.sesSeccionPK.idEncuesta=this.idEncuesta;
                localStorage.removeItem('crearSeccionLista');
                localStorage.setItem("crearSeccionLista",JSON.stringify(this.crearSeccionList));
                console.log("Final sin id: "+this.crearSeccionList);
                auxBool=false;
                console.log("Lista de Seccion: "+this.crearSeccionList);
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
        console.log("Idseccion es diferente a 0: ", idSeccion);
        this.crearSeccionList.forEach(element => {
            console.log("Si ",element.sesSeccionPK.idSeccion,"=",idSeccion);
            if(element.sesSeccionPK.idSeccion==idSeccion){
                console.log("Entro");
                element.sesSeccionPK.idIndice=1;
                element.sesSeccionPK.idSeccion=idSeccion;
                element.descripcion=descripcion;
                element.sesSeccionPK.idEncuesta=this.idEncuesta;
                localStorage.removeItem('crearSeccionLista');
                localStorage.setItem("crearSeccionLista",JSON.stringify(this.crearSeccionList));
                console.log(this.crearSeccionList);
                console.log("Lista de Seccion: "+this.crearSeccionList);
            }
          });
      }else{
        console.log("Idseccion es igual a 0 ", idSeccion);
        this.crearSeccionList.forEach(element => {
          console.log("Si ",element.sesSeccionPK.idSeccion,"=",idSeccion ,"&&" ,auxBool);

          console.log(element);

          if(element.idAux==idAux && auxBool){
              console.log("Entro");
              element.sesSeccionPK.idIndice=1;
              element.idAux=idAux;
              element.descripcion=descripcion;
              element.sesSeccionPK.idEncuesta=this.idEncuesta;
              console.log("Descripcion : ",element.descripcion);
              console.log("Lista de Seccion: "+this.crearSeccionList);    
              localStorage.removeItem('crearSeccionLista');
              localStorage.setItem("crearSeccionLista",JSON.stringify(this.crearSeccionList));
              console.log(element);
              auxBool=false;
          }
        });
        if(auxBool){
          console.log(" Entro SinId");
          this.crearSeccionList.forEach(elementr => {
            console.log("Si ",elementr.idAux,"=","0","&&" ,auxBool);

           console.log("El id es",elementr.idAux );
            if(elementr.idAux==0 && auxBool){
                console.log("Entro");
                elementr.sesSeccionPK.idIndice=1;
                elementr.idAux=idAux;
                elementr.descripcion=descripcion;
                elementr.sesSeccionPK.idEncuesta=this.idEncuesta;
                console.log(" El nuevo idAux es "+elementr.idAux, "y la descripcion es ", elementr.descripcion)
                elementr.sesSeccionPK.idEncuesta=this.idEncuesta;
                console.log("Lista de Seccion: "+this.crearSeccionList);    
                localStorage.removeItem('crearSeccionLista');
                localStorage.setItem("crearSeccionLista",JSON.stringify(this.crearSeccionList));
                console.log(this.crearSeccionList);
                auxBool=false;
            }
          });
        }
      }
  }

  agregarSeccion(){
    this.crearSeccion=new ListaSecciones("","A",0,0,new SesSeccionPK(0,0,0),"");
    this.crearSeccionList.push(this.crearSeccion);
    localStorage.removeItem('crearSeccionLista');
    localStorage.setItem("crearSeccionLista",JSON.stringify( this.crearSeccionList));
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

      console.log("Crear seccion",this.crearS);
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

import { Component, OnInit } from '@angular/core';
declare var require: any
var $ = require('jquery');
import 'jquery-ui-dist/jquery-ui';
// import { CrearEncuesta } from 'src/app/models/crearEncuesta';
// import { Usuario } from 'src/app/models/usuario';
import { ListaSecciones } from 'src/app/models/listaSecciones';
import { CrearSeccion } from 'src/app/models/crearSeccion';
import { SesSeccionPK } from 'src/app/models/sesSeccionPK';
import { PreguntasService } from 'src/app/servicios/preguntas.service';
import { ListaPreguntas } from 'src/app/models/listaPreguntas';
import { CrearPreguntas } from 'src/app/models/crearPreguntas';
import Swal from 'sweetalert2';
import { element } from 'protractor';


@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css'],
  providers:[PreguntasService]
})
export class PreguntasComponent implements OnInit {
  public crearSeccion:ListaSecciones;
  public crearSeccionList:ListaSecciones[];
  public crearS:CrearSeccion;
  public idEncuesta:number;
  public estado:string="A";
  public crearPreguntas:ListaPreguntas;
  public crearPreguntasList:ListaPreguntas[];
  public crearP:CrearPreguntas;

  /* tipo de preguntas
    M= Multiple
    RM=-Multiple Respuesta 
    SN=Si o no
    A= Abierta
    F=File
  */
  
  constructor() { 
    this.crearSeccion=new ListaSecciones("", this.estado,0,0,new SesSeccionPK(0,0,0),"");
    this.crearSeccionList=JSON.parse(localStorage.getItem("crearSeccionLista"));
    this.idEncuesta=Number(JSON.parse(localStorage.getItem("idEncuesta")));
    this.crearPreguntasList=JSON.parse(localStorage.getItem("crearPreguntasLista"));
    this.idEncuesta=Number(JSON.parse(localStorage.getItem("idEncuesta")));
    console.log(this.crearSeccionList);
    console.log(this.crearPreguntasList);

    if(this.crearPreguntasList==null || this.crearPreguntasList.length==0){
      this.crearPreguntasList=[];
      this.agregarPreguntaInicial();
    }
  }

  agregarPreguntaInicial(){
    this.crearSeccionList.forEach(element=>{
          this.crearPreguntas=new ListaPreguntas();
          this.crearPreguntas.sesSeccion.sesSeccionPK=element.sesSeccionPK;
          this.crearPreguntasList.push(this.crearPreguntas);
          localStorage.removeItem('crearPreguntasLista');
          localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
    });
  }

  agregarPreguntaPorSeccion(seccion){
    this.crearPreguntas=new ListaPreguntas();
    this.crearPreguntas.sesSeccion.sesSeccionPK=seccion;
    console.log(this.crearPreguntas.sesSeccion);
    this.crearPreguntasList.push(this.crearPreguntas);
    localStorage.removeItem('crearPreguntasLista');
    localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
    $(document).ready(function(){
      $( ".seccion-"+seccion.idSeccion).css( "border-left", "1px solid #bec3d2" );
      $( ".seccion-"+seccion.idSeccion).last().css( "border", "none" );
    });
    //$("."+ this.crearPreguntas.sesSeccion.sesSeccionPK.idSeccion+"-seccion").css("border-left", "1px solid #bec3d2");
  }


  stepProcess(){
    console.log(1);
    this.crearSeccionList.forEach(step=>{
      $(document).ready(function(){
        $( ".seccion-"+step.sesSeccionPK.idSeccion).last().css( "border", "none" );
      });
    });
  }

  ngOnInit(): void {
   this.stepProcess();
  }

  sorteable(i){
      $( "#sortable-"+i).sortable();
      $( "#sortable-"+i).disableSelection();
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


  /* tipo de preguntas
    M= Multiple
    RM=-Multiple Respuesta 
    SN=Si o no
    A= Abierta
    F=File
  */

  public tipoPreguntas={M:"Multiple",RM:"Multiple Respuesta",SN:"Si o No",A:"Abierta",F:"File"};
  saveTipoPregunta(descripcion,idPregunta,idAux,Seccion){
    var tipo;
    console.log("descripcion",descripcion);
    console.log("idPregunta",idPregunta);
    console.log("IdAux: ",idAux);
    console.log("idSeccion: ",Seccion);
    console.log("Lista Seccion: ",this.crearSeccionList[0]);
    var auxBool=true;

    var label = document.getElementById(descripcion);
    console.log(label.innerHTML);

      if(label.innerHTML==this.tipoPreguntas.M){
        tipo="M";
        console.log("Entro al tipo de pregunta ",this.tipoPreguntas.M,tipo);
      }
      if(label.innerHTML==this.tipoPreguntas.RM){
        tipo="RM";
        console.log("Entro al tipo de pregunta ",this.tipoPreguntas.RM,tipo);
      }

      if(label.innerHTML==this.tipoPreguntas.SN){
        tipo="SN";
        console.log("Entro al tipo de pregunta ",this.tipoPreguntas.RM,tipo);
      }

      if(label.innerHTML==this.tipoPreguntas.A){
        tipo="A";
        console.log("Entro al tipo de pregunta ",this.tipoPreguntas.RM,tipo);
      }

      if(label.innerHTML==this.tipoPreguntas.F){
        tipo="F";
        console.log("Entro al tipo de pregunta ",this.tipoPreguntas.RM,tipo);
      }

    if(idPregunta!=0){
      console.log("idPregunta es diferente a 0: ", idPregunta);
      this.crearPreguntasList.forEach(element => {
          console.log("Si ",element.idPregunta,"=",idPregunta);
          if(element.idPregunta==idPregunta && element.sesSeccion.sesSeccionPK.idSeccion==Seccion.idSeccion){
              console.log("Entro");
              element.tipo=tipo;
              localStorage.removeItem('crearPreguntasLista');
              localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
              console.log(this.crearPreguntasList);
              console.log("Lista de Preguntas: "+this.crearPreguntasList);
          }
        });
    }else{
      console.log("IdPregunta es igual a 0 ", idPregunta);
      this.crearPreguntasList.forEach(element => {
        console.log("Si ",element.idPregunta,"=",idPregunta ,"&&" ,auxBool);

        console.log(element);

        if(element.idAux==idAux && element.sesSeccion.sesSeccionPK.idSeccion==Seccion.idSeccion && auxBool){
            console.log("Entro");
            //element.idAux=idAux;
            element.tipo=tipo;
            console.log("Descripcion : ",element.descripcion);
            console.log("Lista de Preguntas: "+this.crearPreguntasList);   
            localStorage.removeItem('crearPreguntasLista');
            localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
            console.log(element);
            auxBool=false;
            //this.deshabilitarAgregarSeccion();
        }
      });
      if(auxBool){
        console.log(" Entro SinId");
        this.crearPreguntasList.forEach(elementr => {
          console.log("Si ",elementr.idAux,"=","0","&&",elementr.sesSeccion.sesSeccionPK.idSeccion,"==",Seccion.idSeccion,"&&",auxBool);

         console.log("El id es",elementr.idAux );

          if(elementr.idAux==0 && elementr.sesSeccion.sesSeccionPK.idSeccion==Seccion.idSeccion && auxBool){
              console.log("Entro seccion: "+Seccion );
              elementr.idAux=idAux;
              elementr.tipo=tipo;
              console.log(" El nuevo idAux es "+elementr.idAux, "y la descripcion es ", elementr.descripcion)
              console.log("Lista de preguntas: "+this.crearPreguntasList);    
              localStorage.removeItem('crearPreguntasLista');
              localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
              console.log(this.crearPreguntasList);
              auxBool=false;
              //this.deshabilitarAgregarSeccion();
          }
        });
      }
    }

  }

  savePregunta(descripcion,idPregunta,idAux,Seccion){
    console.log("descripcion",descripcion);
    console.log("idPregunta",idPregunta);
    console.log("IdAux: ",idAux);
    console.log("idSeccion: ",Seccion);
    console.log("Lista Seccion: ",this.crearSeccionList[0]);
    var auxBool=true;

    if(idPregunta!=0){
      console.log("idPregunta es diferente a 0: ", idPregunta);
      this.crearPreguntasList.forEach(element => {
          console.log("Si ",element.idPregunta,"=",idPregunta,"=",idPregunta );
          if(element.idPregunta==idPregunta && element.sesSeccion.sesSeccionPK.idSeccion==Seccion.idSeccion){
              console.log("Entro");
              element.descripcion=descripcion;
              localStorage.removeItem('crearPreguntasLista');
              localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
              console.log(this.crearPreguntasList);
              console.log("Lista de Preguntas: "+this.crearPreguntasList);
          }
        });
    }else{
      console.log("IdPregunta es igual a 0 ", idPregunta);
      this.crearPreguntasList.forEach(element => {
        console.log("Si ",element.idPregunta,"=",idPregunta ,"&&" ,auxBool);

        console.log(element);

        if(element.idAux==idAux && element.sesSeccion.sesSeccionPK.idSeccion==Seccion.idSeccion && auxBool){
            console.log("Entro");
            element.idAux=idAux;
            console.log("Descripcion : ",element.descripcion);
            element.descripcion=descripcion;  
            localStorage.removeItem('crearPreguntasLista');
            localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
            console.log(element);
            auxBool=false;
            console.log("Lista de Preguntas: "+this.crearPreguntasList);  
            //this.deshabilitarAgregarSeccion();
        }
      });

      if(auxBool){
        console.log(" Entro SinId");
        this.crearPreguntasList.forEach(elementr => {
          console.log("Si ",elementr.idAux,"=","0","&&",elementr.sesSeccion.sesSeccionPK.idSeccion,"==",Seccion.idSeccion,"&&",auxBool);

         console.log("El id es",elementr.idAux );

          if(elementr.idAux==0 && elementr.sesSeccion.sesSeccionPK.idSeccion==Seccion.idSeccion && auxBool){
              console.log("Entro seccion: "+Seccion );
              elementr.idAux=idAux;
              elementr.descripcion=descripcion;
              console.log(" El nuevo idAux es "+elementr.idAux, "y la descripcion es ", elementr.descripcion)   
              localStorage.removeItem('crearPreguntasLista');
              localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
              console.log(this.crearPreguntasList);
              auxBool=false;
              console.log("Lista de Preguntas: "+this.crearPreguntasList);  
              //this.deshabilitarAgregarSeccion();
          }
        });
      }
    }

  }

  CrearPregunta(){
    this.crearP= new CrearPreguntas(this.crearPreguntasList);
    console.log("Crear Preguntas",this.crearP);
}

}

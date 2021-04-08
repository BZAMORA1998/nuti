import { Component, OnInit } from '@angular/core';
declare var require: any
var $ = require('jquery');
import 'jquery-ui-dist/jquery-ui';
import { ListaSecciones } from 'src/app/models/listaSecciones';
import { CrearSeccion } from 'src/app/models/crearSeccion';
import { PreguntasService } from 'src/app/servicios/preguntas.service';
import { ListaPreguntas } from 'src/app/models/listaPreguntas';
import { CrearPreguntas } from 'src/app/models/crearPreguntas';
import Swal from 'sweetalert2';
import { SeccionService } from 'src/app/servicios/seccion.service';
import { OpcionRespuestas } from 'src/app/models/opcionRespuestas';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';


@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css'],
  providers:[PreguntasService,SeccionService]
})
export class PreguntasComponent implements OnInit {
  public opcionRespuestas:OpcionRespuestas;
  public crearSeccion:ListaSecciones;
  public crearSeccionList:ListaSecciones[];
  public crearS:CrearSeccion;
  public idEncuesta:number;
  public estado:string="A";
  public crearPreguntas:ListaPreguntas;
  public crearPreguntasList:ListaPreguntas[];
  public crearP:CrearPreguntas;
  public listarPreguntas:ListaPreguntas[];
  public opcionRespuestaList:OpcionRespuestas[];
  public opcionRespuestaList2:OpcionRespuestas[];
  hidden : boolean;
  
  constructor(private _preguntaService:PreguntasService,private _seccionService:SeccionService,
    private _route:ActivatedRoute,
    private _router:Router,) { 
    this.crearPreguntasList=new Array<ListaPreguntas>();
    this.opcionRespuestaList=[];
    this.opcionRespuestaList2=new Array<OpcionRespuestas>();
    this.idEncuesta=Number(JSON.parse(localStorage.getItem("idEncuesta")));
  }

  agregarPreguntaInicial(){
    this.crearSeccionList.forEach(element=>{
          console.log("Entro: "+element.sesSeccionPK.idSeccion);
          this.crearPreguntas=new ListaPreguntas();
          this.crearPreguntas.sesSeccion=element;
          this.crearPreguntasList.push(this.crearPreguntas);
          localStorage.removeItem('crearPreguntasLista');
          localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
    });
  }

  agregarPreguntaPorSeccion(seccion){
    console.log("Entro: ",seccion);
    this.crearPreguntas=new ListaPreguntas();
    this.crearPreguntas.regla="N";
    this.crearPreguntas.requerida="N";
    this.crearPreguntas.tabula="S";
    this.crearPreguntas.estado="A";
    this.crearPreguntas.esPadre="S";
    this.crearPreguntas.orientacionOpciones="H"; 
    this.crearPreguntas.tipoArea="DEFAULT";  
    this.crearPreguntas.sesSeccion=seccion;
    this.opcionRespuestas=new OpcionRespuestas();
    this.opcionRespuestas.estado='A';
    this.crearPreguntas.opcionRespuestas.push(this.opcionRespuestas);
    console.log("Entro getLista: ", this.crearPreguntasList);
    this.crearPreguntasList.push(this.crearPreguntas);
    localStorage.removeItem('crearPreguntasLista');
    localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
    console.log(".seccion-",seccion.sesSeccionPK.idEncuesta);

    $(document).ready(function(){
      $(".seccion-"+seccion.sesSeccionPK.idSeccion).css( "border-left", "1px solid #bec3d2" );
      $(".seccion-"+seccion.sesSeccionPK.idSeccion).last().css( "border", "none" );
    });
    console.log(".seccionstep-"+seccion.sesSeccionPK.idSeccion);
    this.deshabilitarGuardarPregunta(); 
 }

 // agregar etiqueta nueva en caso de que sea nueva
 agregarEtiqueta(pregunta,tipo,idPregunta,i,seccion){
    console.log("Etiqueta: ",seccion);
    this.opcionRespuestas=new OpcionRespuestas();
    this.opcionRespuestas.estado='A';
    pregunta.opcionRespuestas.push(this.opcionRespuestas);
    console.log("Etiqueta: ",pregunta);
    this.deshabilitarAgregarEtiqueta(tipo,idPregunta,i,seccion);
 }




  stepProcess(){
    console.log(1);
    this.crearSeccionList.forEach(step=>{
      $(document).ready(function(){
        $(".seccion-"+step.sesSeccionPK.idSeccion).css( "border-left", "1px solid #bec3d2" );
        $(".seccion-"+step.sesSeccionPK.idSeccion).last().css( "border", "none" );
      });
      console.log(".seccionstep-"+step.sesSeccionPK.idSeccion);
    });
  }

   
    getPreguntas():any{
      this.crearPreguntasList=[];
      
        this._preguntaService.getListaPreguntas(this.idEncuesta).subscribe(
          Response=>{
                if(Response.respuestaProceso.codigo==200){
                  console.log("Lista de preguntas: ....",Response);
                  console.log("Lista de preguntas lenght: ....",Response.listaPreguntas.length);
                  console.log("this.crearPreguntasList get: ",JSON.stringify(Response.listaPreguntas));
                  if(Response.listaPreguntas.length==0){
                    this.crearSeccionList.forEach(element=>{
                      console.log("If ....",);
                        console.log("element.sesSeccionPK: ",element.sesSeccionPK.idSeccion);
                        this.agregarPreguntaPorSeccion(element);
                        this.deshabilitarAgregarPregunta(element.sesSeccionPK.idSeccion);
                    });
                  }else{
                    this.crearPreguntasList=Response.listaPreguntas;
                    console.log("Lista de Response.listaPreguntas:",this.crearPreguntasList);

                    this.crearPreguntasList.forEach(element => {
                      if(element.opcionRespuestas.length==0){
                          this.opcionRespuestas=new OpcionRespuestas();
                          this.opcionRespuestas.estado='A';
                          element.opcionRespuestas.push(this.opcionRespuestas);
                          console.log("Lista de Response opcion:",element);
                       
                      }
                    });
                    
                    this.crearSeccionList.forEach(elementS=>{
                      this._preguntaService.getListaPreguntasPorSeccion(elementS.sesSeccionPK.idSeccion).subscribe(
                        Response=>{
                              if(Response.respuestaProceso.codigo==200){
                                console.log("Response.respuestaProceso.codigo",Response);
                                if(Response.listaPreguntas.length==0){
                                  this.agregarPreguntaPorSeccion(elementS);
                                  this.deshabilitarAgregarPregunta(elementS.sesSeccionPK.idSeccion);
                                }
                              }else{
                                console.log(Response);
                              }
                        },
                        error=>{
                            console.log(<any>error);
                        }
                      );
                    });
                  }
                  console.log("Lista de preguntas servicio get: ", this.crearPreguntasList);
                  localStorage.removeItem('crearPreguntasLista');
                  localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
                  this.deshabilitarGuardarPregunta(); 
                  this.stepProcess();
                }else{
                  console.log(Response);
                }
          },
          error=>{
              console.log(<any>error);
          }
        );
   }

deshabilitarAgregarEtiqueta(tipo,idPregunta,i,seccion){
  var cont=0;

  console.log(";lkldkclksmdfklmdsakl",seccion);

  console.log(".ordenar"+tipo+"-"+seccion.idSeccion+"-"+i);
  $(document).ready(function(){
    var preguntas=$(".ordenar"+tipo+"-"+seccion.idSeccion+"-"+i);
    console.log("longitud ",preguntas.length);
    preguntas.each(function() {
      console.log(".etiqueta="+$(this).val());

        if($(this).val()==""){
          cont=cont+1;
          console.log("Contador: "+cont);
        }
    });
    console.log("#etiqueta"+tipo+"-"+idPregunta);
    var etiqueta=$("#etiqueta"+tipo+"-"+idPregunta);
    console.log("longitud ",etiqueta.length);
    if(cont==0 ){
      console.log("Entro etiqueta.prop('disabled',false)");
      etiqueta.prop('disabled',false);
    }else{
      console.log("Entro etiqueta.prop('disabled',true)");
      etiqueta.prop('disabled',true);
    }
  });
}

deshabilitarAgregarPregunta(id){
    var cont=0;
    $(document).ready(function(){
      var preguntas=$(".descripcion-"+id);
      console.log(".descripcion-"+preguntas.length);
      preguntas.each(function() {
        console.log(".descripcion="+$(this).val());

        if($(this).val()==""){
          cont=cont+1;
          console.log("Contador: "+cont);
        }
      });

      var seccion=$("#pregunta-"+id);
      if(cont==0 ){
          seccion.prop('disabled',false);
      }else{
        seccion.prop('disabled',true);
      }
    });
    this.deshabilitarGuardarPregunta();
}

deshabilitarGuardarPregunta(){
  $(document).ready(function(){
    var cont=0;
    var auxBool=true;
    var preguntas=$(".descripcion");
    preguntas.each(function() {
      console.log(".descripcion="+$(this).val());

      if($(this).val()==""){
        cont=cont+1;
        console.log("Contador: "+cont);
      }
      auxBool=false;
    });

    var aceptar =$("#btn-aceptar");

    if(cont==0 && !auxBool){
      aceptar.prop('disabled',false);
    }else{
      aceptar.prop('disabled',true);
    }
  });
}

validacionDescripcionInicial(){
  console.log("validacionDescripcionInicial...",this.crearSeccionList);
  this.crearSeccionList.forEach(element=>{
    $(document).ready(function(){
      var preguntas=$(".descripcion-"+element.sesSeccionPK.idSeccion);
      var seccion=$("#pregunta-"+element.sesSeccionPK.idSeccion);
      console.log("----",$(this).val());
      preguntas.each(function() {
        if($(this).val()==""){
          seccion.prop('disabled',true);
        }
      });
    });
  });
 }

ngOnInit(): void {
  this.getSeccion();
  this.getPreguntas();
 }

  sorteable(tipo,idPregunta,idAux,seccion){
    console.log("#sortable"+tipo+"-"+seccion.idSeccion+"-"+idAux);
    $("#sortable"+tipo+"-"+seccion.idSeccion+"-"+idAux).sortable();    
    $("#sortable"+tipo+"-"+seccion.idSeccion+"-"+idAux).disableSelection();
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

  showModalConfirmacion2(message){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      confirmButtonColor:'#ea792d',
      showConfirmButton: true,
    }).then((result) => {
      if (result.value) {
        this.CierreEncuesta();        
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

  public tipoPreguntas={M:"Multiple",MR:"Multiple Respuesta",SN:"Si o No",A:"Abierta",F:"File"};
  saveTipoPregunta(descripcion,idPregunta,idAux,Seccion){
    var tipo;
    console.log("descripcion",descripcion);
    console.log("idPregunta",idPregunta);
    console.log("IdAux: ",idAux);
    console.log("idSeccion: ",Seccion);
    console.log("Lista Seccion: ",this.crearSeccionList[0]);
    var auxBool=true;

    var label = document.getElementById(descripcion);
    console.log("kjdnjdhnkj",label.innerHTML);

      if(label.innerHTML==this.tipoPreguntas.M){
        tipo="M";
        console.log("Entro al tipo de pregunta ",this.tipoPreguntas.M,tipo);
      }else if(label.innerHTML==this.tipoPreguntas.SN){
        tipo="SN";
        console.log("Entro al tipo de pregunta ",this.tipoPreguntas.SN,tipo);
      }else if(label.innerHTML==this.tipoPreguntas.A){
        tipo="A";
        console.log("Entro al tipo de pregunta ",this.tipoPreguntas.A,tipo);
      }else if(label.innerHTML==this.tipoPreguntas.F){
        tipo="F";
        console.log("Entro al tipo de pregunta ",this.tipoPreguntas.F,tipo);
      }else{
        tipo="MR";
        console.log("Entro al tipo de pregunta ",this.tipoPreguntas.MR,tipo);
      }

    if(idPregunta!=0){
      console.log("idPregunta es diferente a 0: ", idPregunta);
      this.crearPreguntasList.forEach(element => {
          console.log("Si ",element.idPregunta,"=",idPregunta);
          if(element.idPregunta==idPregunta && element.sesSeccion.sesSeccionPK.idSeccion==Seccion.idSeccion){
              console.log("Entro");
              element.tipo=tipo;
              element.regla="N";
              element.requerida="N";
              element.orden= idAux;
              element.tabula="S";
              element.estado="A";
              element.orientacionOpciones="H"; 
              element.esPadre="S";
              element.tipoArea="DEFAULT";  
              localStorage.removeItem('crearPreguntasLista');
              localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
              console.log(this.crearPreguntasList);
              console.log("Lista de Preguntas: "+this.crearPreguntasList);
              this.deshabilitarAgregarPregunta(Seccion.idSeccion);
              this.deshabilitarGuardarPregunta();
          }
        });
    }else{
      console.log("IdPregunta es igual a 0 ", idPregunta);
      this.crearPreguntasList.forEach(element => {
        console.log("Si ",element.idPregunta,"=",idPregunta ,"&&" ,auxBool);

        console.log(element);

        if(element.idAux==idAux && element.sesSeccion.sesSeccionPK.idSeccion==Seccion.idSeccion && auxBool){
            console.log("Entro");
            element.tipo=tipo;
            element.regla="N";
            element.requerida="N";
            element.orden= idAux;
            element.tabula="S";
            element.estado="A";
            element.orientacionOpciones="H"; 
            element.esPadre="S";
            element.tipoArea="DEFAULT";  
            if(tipo == "SN" || tipo == "A"){
              element.opcionRespuestas =  this.opcionRespuestaList=[];
            }
            console.log("Descripcion : ",element.descripcion);
            console.log("Lista de Preguntas: "+this.crearPreguntasList);   
            localStorage.removeItem('crearPreguntasLista');
            localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
            console.log(element);
            auxBool=false;
            this.deshabilitarGuardarPregunta();
            this.deshabilitarAgregarPregunta(Seccion.idSeccion);
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
              elementr.regla="N";
              elementr.requerida="N";
              elementr.orden= idAux;
              elementr.tabula="S";
              elementr.estado="A";
              elementr.orientacionOpciones="H"; 
              elementr.esPadre="S";
              elementr.tipoArea="DEFAULT";  
              if(tipo == "SN" || tipo == "A"){
                elementr.opcionRespuestas =  this.opcionRespuestaList=[];
              }
              console.log(" El nuevo idAux es "+elementr.idAux, "y la descripcion es ", elementr.descripcion)
              console.log("Lista de preguntas: "+this.crearPreguntasList);    
              localStorage.removeItem('crearPreguntasLista');
              localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
              console.log(this.crearPreguntasList);
              auxBool=false;
              this.deshabilitarGuardarPregunta();
              this.deshabilitarAgregarPregunta(Seccion.idSeccion);
          }
        });
      }
    }

  }


  saveTipoPregunta2(descripcion,requerida,orientacion,idPregunta,idAux,Seccion){
    var tipo;
    console.log("descripcion",descripcion);
    console.log("idPregunta",idPregunta);
    console.log("requerida",requerida);
    console.log("orientacion",orientacion);
    console.log("IdAux: ",idAux);
    console.log("idSeccion: ",Seccion);
    console.log("Lista Seccion: ",this.crearSeccionList[0]);
    var auxBool=true;

    var label = document.getElementById(descripcion);
    console.log("kjdnjdhnkj",label.innerHTML);

      if(label.innerHTML==this.tipoPreguntas.M){
        tipo="M";
        console.log("Entro al tipo de pregunta ",this.tipoPreguntas.M,tipo);
      }else if(label.innerHTML==this.tipoPreguntas.SN){
        tipo="SN";
        console.log("Entro al tipo de pregunta ",this.tipoPreguntas.MR,tipo);
      }else if(label.innerHTML==this.tipoPreguntas.A){
        tipo="A";
        console.log("Entro al tipo de pregunta ",this.tipoPreguntas.MR,tipo);
      }else if(label.innerHTML==this.tipoPreguntas.F){
        tipo="F";
        console.log("Entro al tipo de pregunta ",this.tipoPreguntas.MR,tipo);
      }else{
        tipo="MR";
        console.log("Entro al tipo de pregunta ",this.tipoPreguntas.MR,tipo);
      }

    if(idPregunta!=0){
      console.log("idPregunta es diferente a 0: ", idPregunta);
      this.crearPreguntasList.forEach(element => {
          console.log("Si ",element.idPregunta,"=",idPregunta);
          if(element.idPregunta==idPregunta && element.sesSeccion.sesSeccionPK.idSeccion==Seccion.idSeccion){
              console.log("Entro");
              element.tipo=tipo;
              element.regla="N";
              element.requerida="N";
              element.orden= idAux;
              element.tabula="S";
              element.estado="A";
              element.orientacionOpciones="H"; 
              element.esPadre="S";
              element.tipoArea="DEFAULT";  
              localStorage.removeItem('crearPreguntasLista');
              localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
              console.log(this.crearPreguntasList);
              console.log("Lista de Preguntas: "+this.crearPreguntasList);
              this.deshabilitarAgregarPregunta(Seccion.idSeccion);
              this.deshabilitarGuardarPregunta();
          }
        });
    }else{
      console.log("IdPregunta es igual a 0 ", idPregunta);
      this.crearPreguntasList.forEach(element => {
        console.log("Si ",element.idPregunta,"=",idPregunta ,"&&" ,auxBool);

        console.log(element);

        if(element.idAux==idAux && element.sesSeccion.sesSeccionPK.idSeccion==Seccion.idSeccion && auxBool){
            console.log("Entro");
            element.tipo=tipo;
            element.regla="N";
            element.requerida="N";
            element.orden= idAux;
            element.tabula="S";
            element.estado="A";
            element.orientacionOpciones="H"; 
            element.esPadre="S";
            element.tipoArea="DEFAULT";  
            console.log("Descripcion : ",element.descripcion);
            console.log("Lista de Preguntas: "+this.crearPreguntasList);   
            localStorage.removeItem('crearPreguntasLista');
            localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
            console.log(element);
            auxBool=false;
            this.deshabilitarGuardarPregunta();
            this.deshabilitarAgregarPregunta(Seccion.idSeccion);
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
              elementr.regla="N";
              elementr.requerida="N";
              elementr.orden= idAux;
              elementr.tabula="S";
              elementr.estado="A";
              elementr.orientacionOpciones="H"; 
              elementr.esPadre="S";
              elementr.tipoArea="DEFAULT";  
              console.log(" El nuevo idAux es "+elementr.idAux, "y la descripcion es ", elementr.descripcion)
              console.log("Lista de preguntas: "+this.crearPreguntasList);    
              localStorage.removeItem('crearPreguntasLista');
              localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
              console.log(this.crearPreguntasList);
              auxBool=false;
              this.deshabilitarGuardarPregunta();
              this.deshabilitarAgregarPregunta(Seccion.idSeccion);
          }
        });
      }
    }

  }

  //// Pueba de los botones de
  savePregunta2(descripcion,oblitario,orientacion,idPregunta,idAux,Seccion){
    console.log("descripcion",descripcion);
    console.log("idPregunta",idPregunta);
    console.log("IdAux: ",idAux);
    console.log("Obligario",oblitario);
    console.log("Orientacion",orientacion);
    console.log("idSeccion: ",Seccion);
    console.log("Lista Seccion: ",this.crearSeccionList[0]);
    var auxBool=true;
    var orientacionVH = "";
    var obligatoria = "";
    if(oblitario == true){
      obligatoria = 'S';
    }else{
      obligatoria = 'N';
    }
    if(orientacion == true){
      orientacionVH = 'V';
    }else{
      orientacionVH = 'H';
    }

    if(idPregunta!=0){
      console.log("idPregunta es diferente a 0: ", idPregunta);
      this.crearPreguntasList.forEach(element => {
          console.log("Si ",element.idPregunta,"=",idPregunta,"=",idPregunta );
          if(element.idPregunta==idPregunta && element.sesSeccion.sesSeccionPK.idSeccion==Seccion.idSeccion){
              console.log("Entro");
              element.descripcion=descripcion;
              element.regla="N";
              element.orden= idAux;
              element.requerida=obligatoria;
              element.tabula="S";
              element.estado="A";
              element.orientacionOpciones=orientacionVH; 
              element.esPadre="S";
              element.tipoArea="DEFAULT";  
              localStorage.removeItem('crearPreguntasLista');
              localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
              console.log(this.crearPreguntasList);
              console.log("Lista de Preguntas: "+this.crearPreguntasList);
              this.deshabilitarGuardarPregunta();
              this.deshabilitarAgregarPregunta(Seccion.idSeccion);
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
            element.regla="N";
            element.orden= idAux;
            element.requerida=obligatoria;
            element.tabula="S";
            element.estado="A";
            element.orientacionOpciones=orientacionVH; 
            element.esPadre="S";
            element.tipoArea="DEFAULT";  
            localStorage.removeItem('crearPreguntasLista');
            localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
            console.log(element);
            auxBool=false;
            console.log("Lista de Preguntas: "+this.crearPreguntasList);  
            this.deshabilitarGuardarPregunta();
            this.deshabilitarAgregarPregunta(Seccion.idSeccion)
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
              elementr.regla="N";
              elementr.orden= idAux;
              elementr.requerida=obligatoria;
              elementr.tabula="S";
              elementr.estado="A";
              elementr.orientacionOpciones=orientacionVH; 
              elementr.esPadre="S";
              elementr.tipoArea="DEFAULT";
              console.log(" El nuevo idAux es "+elementr.idAux, "y la descripcion es ", elementr.descripcion)   
              localStorage.removeItem('crearPreguntasLista');
              localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
              console.log(this.crearPreguntasList);
              auxBool=false;
              console.log("Lista de Preguntas: "+this.crearPreguntasList); 
              this.deshabilitarGuardarPregunta(); 
              this.deshabilitarAgregarPregunta(Seccion.idSeccion);
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
              element.regla="N";
              element.orden= idAux;
              element.requerida="N";
              element.tabula="S";
              element.estado="A";
              element.orientacionOpciones="H"; 
              element.esPadre="S";
              element.tipoArea="DEFAULT";  
              localStorage.removeItem('crearPreguntasLista');
              localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
              console.log(this.crearPreguntasList);
              console.log("Lista de Preguntas: "+this.crearPreguntasList);
              this.deshabilitarGuardarPregunta();
              this.deshabilitarAgregarPregunta(Seccion.idSeccion);
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
            element.regla="N";
            element.orden= idAux;
            element.requerida="N";
            element.tabula="S";
            element.estado="A";
            element.orientacionOpciones="H"; 
            element.esPadre="S";
            element.tipoArea="DEFAULT";  
            localStorage.removeItem('crearPreguntasLista');
            localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
            console.log(element);
            auxBool=false;
            console.log("Lista de Preguntas: "+this.crearPreguntasList);  
            this.deshabilitarGuardarPregunta();
            this.deshabilitarAgregarPregunta(Seccion.idSeccion)
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
              elementr.regla="N";
              elementr.orden= idAux;
              elementr.requerida="N";
              elementr.tabula="S";
              elementr.estado="A";
              elementr.orientacionOpciones="H"; 
              elementr.esPadre="S";
              elementr.tipoArea="DEFAULT";
              console.log(" El nuevo idAux es "+elementr.idAux, "y la descripcion es ", elementr.descripcion)   
              localStorage.removeItem('crearPreguntasLista');
              localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
              console.log(this.crearPreguntasList);
              auxBool=false;
              console.log("Lista de Preguntas: "+this.crearPreguntasList); 
              this.deshabilitarGuardarPregunta(); 
              this.deshabilitarAgregarPregunta(Seccion.idSeccion);
          }
        });
      }
    }

  }

  CrearPregunta(){
    this.loading(true);
    this.crearP= new CrearPreguntas(this.crearPreguntasList);
    console.log("Crear Preguntas--->",this.crearP);

    this._preguntaService.postCrearPreguntas(this.crearP).subscribe(
      Response=>{
        if(Response.codigo==200){
          console.log(Response);
          this.loading(false);
          this.getPreguntas();
          this.showModalConfirmacion(Response.causa);
        }else{
          console.log(Response);
          this.loading(true);
          this.getPreguntas();
          this.showModalError(Response.causa);
        }
      },
      error=>{
          console.log(<any>error);
      }
    );
  }

  CrearPreguntaYRedirigir(){
    this.loading(true);
    this.crearP= new CrearPreguntas(this.crearPreguntasList);
    console.log("Crear Preguntas--->",this.crearP);

    this._preguntaService.postCrearPreguntas(this.crearP).subscribe(
      Response=>{
        if(Response.codigo==200){
          console.log(Response);
          this.loading(false);
          this.getPreguntas();
          this.showModalConfirmacion2(Response.causa);
        }else{
          console.log(Response);
          this.loading(true);
          this.getPreguntas();
          this.showModalError(Response.causa);
        }
      },
      error=>{
          console.log(<any>error);
      }
    );
  }

  getSeccion(){
    this._seccionService.getListaSecciones(this.idEncuesta).subscribe(
      Response=>{
        if(Response.respuestaProceso.codigo==200){
          this.crearSeccionList=Response.listarSecciones;
        }else{
          console.log(Response);
        }
      },
      error=>{
          console.log(<any>error);
      }
    );
  }


  ordenarEtiquetaV2(tipo,idPregunta,idAux,seccion,aOpciones){
    this.opcionRespuestaList2= aOpciones;
    console.log("tipo",tipo);
    console.log("idPregunta",idPregunta);
    console.log("IdAux: ",idAux);
    console.log("idSeccion: ",seccion);

    console.log('mivalue', this.opcionRespuestaList2);

    
    var auxBool=true;
    if(idPregunta!=0){
      console.log("idPregunta es diferente a 0: ", idPregunta);
      this.crearPreguntasList.forEach(element => {
          console.log("Si ",element.idPregunta,"=",idPregunta,"=",idPregunta );

          if(element.idPregunta==idPregunta && element.sesSeccion.sesSeccionPK.idSeccion==seccion.idSeccion){
              console.log("Entro"); 
                var order = document.getElementsByClassName("ordenar"+tipo+"-"+seccion.idSeccion+"-"+idAux);

                element.opcionRespuestas=[];
 
                for (let i = 0; i < order.length; i++) {
                  
                  //Si la opcion de repestpuesta es a entonces permite odenar y agregra a la lista,
                  if(this.opcionRespuestaList2[i].estado=='A'){
                  var cont=i+1;
                  this.opcionRespuestas=new OpcionRespuestas();
                  this.opcionRespuestas.orden=cont;
                  this.opcionRespuestas.estado=this.opcionRespuestaList2[i].estado;
                  this.opcionRespuestas.etiquetaOpcion=(<HTMLInputElement> order[i]).value;
                  this.opcionRespuestas.sesOpcionesPK.idPregunta=idPregunta;
                  this.opcionRespuestas.sesOpcionesPK.idOpcion = this.opcionRespuestaList2[i].sesOpcionesPK.idOpcion;
                  
                  element.opcionRespuestas.push(this.opcionRespuestas);

                }else{
                  this.opcionRespuestas= new OpcionRespuestas();
                  this.opcionRespuestas.orden=0;
                  this.opcionRespuestas.estado='I';
                  this.opcionRespuestas.etiquetaOpcion=(<HTMLInputElement> order[i]).value;
                  this.opcionRespuestas.sesOpcionesPK.idPregunta=idPregunta;
                  this.opcionRespuestas.sesOpcionesPK.idOpcion = this.opcionRespuestaList2[i].sesOpcionesPK.idOpcion;
                  
                  element.opcionRespuestas.push(this.opcionRespuestas);
                } 
              console.log("Lista de Preguntas: "+this.crearPreguntasList);
              this.deshabilitarGuardarPregunta();
              this.deshabilitarAgregarPregunta(seccion.idSeccion);
              this.deshabilitarAgregarEtiqueta(tipo,idPregunta,idAux,seccion);
                }
          }
        });
    }else{
      console.log("IdPregunta es igual a 0 ", idPregunta);
      this.crearPreguntasList.forEach(element => {
        console.log("Si ",element.idPregunta,"=",idPregunta ,"&&" ,auxBool);

        console.log(element);

        if(element.idAux==idAux && element.sesSeccion.sesSeccionPK.idSeccion==seccion.idSeccion && auxBool ){
            console.log("Entro");
            element.idAux=idAux;
              var order = document.getElementsByClassName("ordenar"+tipo+"-"+seccion.idSeccion+"-"+idAux);
              element.opcionRespuestas=[];
 
               for (let i = 0; i < order.length; i++) {
                var cont=i+1;
                this.opcionRespuestas=new OpcionRespuestas();
                this.opcionRespuestas.orden=cont;
                this.opcionRespuestas.estado='A';
                this.opcionRespuestas.etiquetaOpcion=(<HTMLInputElement> order[i]).value;
                this.opcionRespuestas.sesOpcionesPK.idPregunta=idPregunta;
                this.opcionRespuestas.sesOpcionesPK.idOpcion = this.opcionRespuestaList2[i].sesOpcionesPK.idOpcion;
                element.opcionRespuestas.push(this.opcionRespuestas);
              }  
            console.log(element);
            auxBool=false;
            console.log("Lista de Preguntas: ",this.crearPreguntasList);  
            this.deshabilitarGuardarPregunta();
            this.deshabilitarAgregarPregunta(seccion.idSeccion);
            this.deshabilitarAgregarEtiqueta(tipo,idPregunta,idAux,seccion);
        }
      });

      if(auxBool){
        console.log(" Entro SinId");
        this.crearPreguntasList.forEach(elementr => {
          console.log("Si ",elementr.idAux,"=","0","&&",elementr.sesSeccion.sesSeccionPK.idSeccion,"==",seccion.idSeccion,"&&",auxBool);

         console.log("El id es",elementr.idAux );

          if(elementr.idAux==0 && elementr.sesSeccion.sesSeccionPK.idSeccion==seccion.idSeccion && auxBool ){
              console.log("Entro seccion: "+seccion );
              elementr.idAux=idAux;
                var order = document.getElementsByClassName("ordenar"+tipo+"-"+seccion.idSeccion+"-"+idAux);
                elementr.opcionRespuestas=[];

                  for (let i = 0; i < order.length; i++) {
                  var cont=i+1;
                  this.opcionRespuestas=new OpcionRespuestas();
                  this.opcionRespuestas.orden=cont;
                  this.opcionRespuestas.estado='A';
                  this.opcionRespuestas.etiquetaOpcion=(<HTMLInputElement> order[i]).value;
                  this.opcionRespuestas.sesOpcionesPK.idPregunta=idPregunta;
                  this.opcionRespuestas.sesOpcionesPK.idOpcion = this.opcionRespuestaList2[i].sesOpcionesPK.idOpcion;
                  elementr.opcionRespuestas.push(this.opcionRespuestas);
                }  

              console.log(" El nuevo idAux es "+elementr.idAux, "y la descripcion es ", elementr.descripcion);
              console.log(this.crearPreguntasList);
              auxBool=false;
              console.log("Lista de Preguntas: "+this.crearPreguntasList); 
              this.deshabilitarGuardarPregunta(); 
              this.deshabilitarAgregarPregunta(seccion.idSeccion);
              this.deshabilitarAgregarEtiqueta(tipo,idPregunta,idAux,seccion);
          }
        });
      }
    }
    console.log("Array Opciones---> ", this.crearPreguntasList[1].opcionRespuestas);
    
    this.deshabilitarAgregarEtiqueta(tipo,idPregunta,idAux,seccion);
  }





  //ELIMINAR LA ETIQUEDA -- Inabilita la etiqueta 
  
 //elimina la etiqueta
 eliminarEtiqueta(tipo,idPregunta,pregunta,idAux,seccion,aOpciones,i){
    
  pregunta.opcionRespuestas[i].estado = 'I';

    console.log("id de la opcion a eliminar ", i);
    console.log("Nombre de la etiqueta ->" + pregunta.opcionRespuestas[i].estado);
    console.log("Nombre etiqueda ->" + pregunta.opcionRespuestas[i].etiquetaOpcion);

    var NuevaListaOcpiones = pregunta.opcionRespuestas; 
    pregunta.opcionRespuestas.forEach(element => console.log(element));

    console.log("Elemento borrado " + pregunta.opcionRespuestas[i].etiquetaOpcion);
 
    console.log("Lista de Opciones --->> " ,NuevaListaOcpiones);
    this.ordenarEtiquetaV2(tipo,idPregunta,idAux,seccion,NuevaListaOcpiones);
}

ocultaritem(){
  this.hidden = !this.hidden;
}

CierreEncuesta(){
  return this._router.navigate(['../notisurvey/home/resultado-final']);
}

setOrientacionPregunta(idPregunta,idcheck){
  var elementcheck = <HTMLInputElement> document.getElementById(idcheck);
  var isChecked = elementcheck.checked;
  this.crearPreguntasList.forEach(element => {

    if(element.idPregunta==idPregunta){
      if(isChecked==true){
        console.log('Valor del check TRUE ->', isChecked);
        element.orientacionOpciones ='V'; 
      }else{
        console.log('Valor del check FALSE ->', isChecked);
        element.orientacionOpciones ='H'; 
      }
    }
  });

}
setObligatoriedadPregunta(idPregunta,idcheck){
  var elementcheck = <HTMLInputElement> document.getElementById(idcheck);
  var isChecked = elementcheck.checked;
  this.crearPreguntasList.forEach(element => {

    if(element.idPregunta==idPregunta){
      if(isChecked==true){
        console.log('Valor del check TRUE ->', isChecked);
        element.requerida ='S'; 
      }else{
        console.log('Valor del check FALSE ->', isChecked);
        element.requerida ='N'; 
      }
    }
  });

}

}

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
  public listarPreguntas:ListaPreguntas[];

  /* tipo de preguntas
    M= Multiple
    RM=-Multiple Respuesta 
    SN=Si o no
    A= Abierta
    F=File
  */
  
  constructor(private _preguntaService:PreguntasService) { 
    this.crearPreguntasList=new Array<ListaPreguntas>();
    this.crearSeccion=new ListaSecciones("", this.estado,0,0,new SesSeccionPK(0,0,0),"");
    this.crearSeccionList=JSON.parse(localStorage.getItem("crearSeccionLista"));
    this.idEncuesta=Number(JSON.parse(localStorage.getItem("idEncuesta")));
    this.crearPreguntasList=JSON.parse(localStorage.getItem("crearPreguntasLista"));
    this.idEncuesta=Number(JSON.parse(localStorage.getItem("idEncuesta")));
    console.log(this.crearSeccionList);
    console.log(this.crearPreguntasList);
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
    console.log("Entro: "+seccion);
    this.crearPreguntas=new ListaPreguntas();
    this.crearPreguntas.regla="N";
    this.crearPreguntas.requerida="N";
    this.crearPreguntas.tabula="S";
    this.crearPreguntas.estado="A";
    this.crearPreguntas.esPadre="S";
    this.crearPreguntas.tipoArea="DEFAULT";  
    this.crearPreguntas.sesSeccion=seccion;
    console.log("Entro: ", this.crearPreguntasList);
    this.crearPreguntasList.push(this.crearPreguntas);
    localStorage.removeItem('crearPreguntasLista');
    localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
    console.log(".seccion-",seccion.sesSeccionPK.idEncuesta);

    $(document).ready(function(){
      $(".seccion-"+seccion.sesSeccionPK.idSeccion).css( "border-left", "1px solid #bec3d2" );
      $(".seccion-"+seccion.sesSeccionPK.idSeccion).last().css( "border", "none" );
    });
    console.log(".seccionstep-"+seccion.sesSeccionPK.idSeccion);
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
      this.crearSeccionList.forEach(element=>{
        this._preguntaService.getListaPreguntas(element.sesSeccionPK.idSeccion).subscribe(
          Response=>{
                if(Response.respuestaProceso.codigo==200){
                  console.log(Response);
                  this.listarPreguntas=Response.listaPreguntas;
  
                  console.log("Lenght: ",this.listarPreguntas.length);
                  if(this.listarPreguntas.length==0){
                    console.log("element.sesSeccionPK: ",element.sesSeccionPK.idSeccion);
                    this.agregarPreguntaPorSeccion(element);
                  }

                  this.deshabilitarAgregarPregunta(element.sesSeccionPK.idSeccion);
                  this.deshabilitarGuardarPregunta();

                  console.log("Lista de preguntas servicio get: ",this.listarPreguntas);
                  localStorage.removeItem('crearPreguntasLista');
                  localStorage.setItem("crearPreguntasLista",JSON.stringify(this.listarPreguntas));
  
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
}

deshabilitarGuardarPregunta(){

  var cont=0;
  var auxBool=true;
  var preguntas= document.getElementsByName("pregunta");

  console.log("Lenght "+preguntas.length);
  for (var i = 0; i < preguntas.length; i++) {
    var pre=(preguntas[i]as HTMLInputElement).value;
    if(pre==''){
      console.log("Entro al for"+cont);
      cont++;
    }
    auxBool=false;
  }
  var aceptar = <any> document.getElementById("btn-aceptar");
  if(cont==0 && auxBool==false){
    console.log("Entro al if=0 "+cont);
    aceptar.disabled = false;
  }else{
    console.log("Entro al if!=0 "+cont);
    aceptar.disabled = true;
  }
}

ngOnInit(): void {
  this.getPreguntas();
  this.deshabilitarGuardarPregunta();
  this.validacionDescripcionInicial();
  this.stepProcess();
 }

 validacionDescripcionInicial(){
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
              element.regla="N";
              element.requerida="N";
              element.tabula="S";
              element.estado="A";
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
            //element.idAux=idAux;
            element.tipo=tipo;
            element.regla="N";
            element.requerida="N";
            element.tabula="S";
            element.estado="A"
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
              elementr.tabula="S";
              elementr.estado="A"
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
              element.requerida="N";
              element.tabula="S";
              element.estado="A"
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
            element.requerida="N";
            element.tabula="S";
            element.estado="A"
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
              elementr.requerida="N";
              elementr.tabula="S";
              elementr.estado="A"
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
    console.log("Crear Preguntas",this.crearP);

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

}

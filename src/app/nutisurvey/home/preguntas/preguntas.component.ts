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
    console.log(this.crearSeccionList);

    if(this.crearPreguntasList==null || this.crearPreguntasList.length==0){
      this.crearPreguntasList=[];
      this.agregarPregunta();
    }
  }

  agregarPregunta(){
    this.crearPreguntas=new ListaPreguntas();
    this.crearPreguntasList.push(this.crearPreguntas);
    localStorage.removeItem('crearPreguntasLista');
    localStorage.setItem("crearPreguntasLista",JSON.stringify( this.crearPreguntasList));
  }

  ngOnInit(): void {
  
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

  saveTipoPregunta(descripcion,idPregunta,idAux){
    console.log("descripcion",descripcion);
    console.log("idPregunta",idPregunta);
    console.log("IdAux: ",idAux);

    var auxBool=true;

    var label = document.getElementById(descripcion);
    console.log(label.innerHTML);

    if(idPregunta!=0){
      console.log("idPregunta es diferente a 0: ", idPregunta);
      this.crearPreguntasList.forEach(element => {
          console.log("Si ",element.idPregunta,"=",idPregunta);
          if(element.idPregunta==idPregunta){
              console.log("Entro");
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

        if(element.idPregunta==idAux && auxBool){
            console.log("Entro");
            //element.idAux=idAux;
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
              console.log("Lista de preguntas: "+this.crearPreguntasList);    
              localStorage.removeItem('crearPreguntasLista');
              localStorage.setItem("crearPreguntasLista",JSON.stringify(this.crearPreguntasList));
              console.log(this.crearSeccionList);
              auxBool=false;
              //this.deshabilitarAgregarSeccion();
          }
        });
      }
    }


  }

}

import { Component, OnInit, Input } from '@angular/core';
declare var require: any
var $ = require('jquery');
import 'jquery-ui-dist/jquery-ui';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { Usuario } from 'src/app/models/usuario';
import { CrearEncuesta } from 'src/app/models/crearEncuesta';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
  providers:[EncuestaService]
})
export class ResultadosComponent implements OnInit {
  public crearEncuesta:CrearEncuesta;
  public usuario:Usuario;
  public idEncuesta:number
  public opcionCierreEncuesta:string[]=["Imagen y Texto","Solo texto"];
  public seleccionado:string;
  public ngControl:NgControl;
  
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _encuestaService:EncuestaService
  ) { 
    this.usuario=JSON.parse(localStorage.getItem("usuario"));
    this.crearEncuesta=new CrearEncuesta();
    this.idEncuesta=Number(JSON.parse(localStorage.getItem("idEncuesta")));
    console.log("idEncuesta",this.idEncuesta);

    //Valida la información de la encueta y setea el formulario 
    if(this.idEncuesta!=0){
      this.getEncuestaXId(this.idEncuesta);
      
    }
  }

  ngOnInit(): void {
    $('#btn_enviarfile').on('change',function (e){
      if($(this).val()!=""){
              $("#txt-enviarfile").css("display","none");
              $("#btn_enviarfile").css("display","none");
              $("#btn_eliminarfile").css("display","block");
              $("#img_logo").css("display","block");
              $("#txt_value").css("display","block");
      }
    });

    $('#btn_eliminarfile').on('click',function (){
          $("#btn_enviarfile").val("");
          $("#txt-enviarfile").css("display","block");
          $("#btn_enviarfile").css("display","block");
          $("#btn_eliminarfile").css("display","none");
          $("#img_logo").css("display","none");
          $("#txt_value").css("display","none");
    });
  }

  
  public url:any;
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        //this.crearEncuesta.imagenMedi=this.url;
        $("#img_logo").attr("src",this.url);
      }
    }

    $("#txt_value").text(event.target.files[0].name);
  }

  setIdEncuesta():void{        
    if(this.crearEncuesta.mensaje=="" && this.crearEncuesta.titulo==""){
      localStorage.setItem("idEncuesta",JSON.stringify(0));
      localStorage.removeItem("nombreEncuesta");
    }
  }


  showModalConfirmacion(message){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      confirmButtonColor:'#ea792d',
      showConfirmButton: true,
    });
  }

  showModalError(message){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor:'#ea792d',
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

  //Obtengo el la encuesta de acuerdo al idProporcionado para hacer el update
  getEncuestaXId(idEncuesta){
    this._encuestaService.getEncuestaXId(idEncuesta).subscribe(Response=>{
      console.log(Response);
      if(Response.respuetaProceso.codigo==0){
        console.log(Response);
        this.crearEncuesta=Response.encuesta;
        console.log(this.crearEncuesta);
        localStorage.setItem("nombreEncuesta",JSON.stringify(this.crearEncuesta.titulo));
        this.configurarCierreEncuenta();
        
      }else{
        console.log('Error');
      }
    },
    error=>{
      console.log(<any>error);
    })
  }

  //Actualizo la encuesta
  finalizarInfoEncuesta(){
    this.loading(true);
    console.log("Cierre de encueta" + this.crearEncuesta);
    localStorage.setItem("crearEncuesta",JSON.stringify(this.crearEncuesta));

    let imagenPie = (document.getElementById("btn_enviarfile") as HTMLInputElement).value;

    this.idEncuesta=(JSON.parse(localStorage.getItem("idEncuesta")))==null?0:JSON.parse(localStorage.getItem("idEncuesta"));
    this.crearEncuesta.idEncuesta=this.idEncuesta;
    this.crearEncuesta.imagenPie=imagenPie.split('\\').pop();;
    this.crearEncuesta.correo=this.usuario.correo;
    this.crearEncuesta.unidadNegocio=this.usuario.unidadNegocio;
    console.log(this.crearEncuesta);

    this._encuestaService.postCrearEncuesta(this.crearEncuesta).subscribe( Response=>{
      console.log(Response);
      if(Response.codigo==200){
        console.log(Response.causa);
        localStorage.setItem("idEncuesta",JSON.stringify(Response.causa));
        console.log(this.usuario);
        this.loading(false);
        this.showModalConfirmacion(Response.mensaje);
      }else{
        this.loading(false);
        this.showModalError(Response.mensaje);
      }
    },
      error=>{
        console.log(<any>error);
      }
    );
  }

  configurarCierreEncuenta(){
    if(this.crearEncuesta.imagenPie.length>0){
      this.seleccionado="Imagen y Texto";
      console.log("exite una imagen y texto");
      
    }else{
      this.seleccionado="Solo texto";
      console.log("solo texto");

    }
  }

}

import { Component, OnInit } from '@angular/core';
declare var require: any
var $ = require('jquery');
import 'jquery-ui-dist/jquery-ui';
import { CrearEncuesta } from 'src/app/models/crearEncuesta';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css'],
  providers:[EncuestaService]
})
export class EncuestaComponent implements OnInit {
  public crearEncuesta:CrearEncuesta;
  public usuario:Usuario;
  public nombre:String;
  public idEncuesta:number;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _encuestaService:EncuestaService
  ) {
    this.nombre="";
    this.crearEncuesta=new CrearEncuesta(""," "," "," "," "," ",0," "," "," ","",0);
    this.usuario=JSON.parse(localStorage.getItem("usuario"));
    this.crearEncuesta=JSON.parse(localStorage.getItem("crearEncuesta"));
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
    }
  }

  showModalError(message){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor:'#ea792d',
    });
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

  crearencuesta(){
    this.loading(true);
    console.log("Actualizar"+this.crearEncuesta);
    localStorage.setItem("crearEncuesta",JSON.stringify(this.crearEncuesta));

    let logo = (document.getElementById("btn_enviarfile") as HTMLInputElement).value;

    this.idEncuesta=JSON.parse(localStorage.getItem("idEncuesta"));
    this.crearEncuesta.idEncuesta=this.idEncuesta;
    this.crearEncuesta.imagenCab=logo.split( '\\' ).pop();;
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
}




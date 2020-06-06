import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { CrearEncuesta } from 'src/app/models/crearEncuesta';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public crearEncuesta:CrearEncuesta;
  public usuario:Usuario;
  public nombre:String;

  constructor(
               private _route:ActivatedRoute,
               private _router:Router,
  ) {
    this.nombre="";
    
    //this.usuario=JSON.parse(localStorage.getItem("usuario"));
    this.crearEncuesta=JSON.parse(localStorage.getItem("crearEncuesta"));
    console.log(this.crearEncuesta.imagenCab);
    console.log(this.crearEncuesta);

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
        this.crearEncuesta.imagenMedi=this.url;
        $("#img_logo").attr("src",this.url);
      }
    }

    $("#txt_value").text(event.target.files[0].name);
  }

  crearencuesta(){
    //let logo = (document.getElementById("btn_enviarfile") as HTMLInputElement).value;
    //this.crearEncuesta.imagenCab=logo.split( '\\' ).pop();;
    console.log(this.crearEncuesta);
    localStorage.setItem("crearEncuesta",JSON.stringify(this.crearEncuesta));
  }

  setIdEncuesta(){

  }

}

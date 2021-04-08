import { Component, OnInit } from '@angular/core';
declare var require: any;
var $ = require('jquery');
import 'jquery-ui-dist/jquery-ui';
import { CrearEncuesta } from 'src/app/models/crearEncuesta';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import Swal from 'sweetalert2';
import { stringify } from 'querystring';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css'],
  providers: [EncuestaService],
})
export class EncuestaComponent implements OnInit {
  public crearEncuesta: CrearEncuesta;
  public usuario: Usuario;
  public idEncuesta: number;
  public ulrImagenP: String;
  public fechaImg: String;
  public nickUser: String;
  public urlBase: String = 'http://notify.goitsa.me/uploads/notisurvey/';
  //public urlBase: String = 'C:/opt/payara5/glassfish/domains/Develop/applications/uploads/notisurvey/';

  public fechaActual: String;

  private base64Image: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _encuestaService: EncuestaService
  ) {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.crearEncuesta = new CrearEncuesta();
    this.idEncuesta = Number(JSON.parse(localStorage.getItem('idEncuesta')));
    console.log('idEncuesta', this.idEncuesta);

    this.SetInputDate();


    if (this.idEncuesta != 0) {
      this.getEncuestaXId(this.idEncuesta);
    }

    if (this.crearEncuesta == null) {
      this.crearEncuesta = new CrearEncuesta();
    }
    console.log('Respuesta :', this.crearEncuesta);


  }

  subirImagen(nombreUsuario): String {
    this._encuestaService
      .postSubirImagen(nombreUsuario, this.imageB64)
      .subscribe(
        (Response) => {
          console.log('Response', Response);

          if (Response.codigo == 200) {
            this.ulrpublic = Response.mensaje;
          }
        },
        (error) => {
          console.log(<any>error);
          console.log('Error en el subida de la imagen', error);
        }
      );

    return this.ulrpublic;
  }

  ngOnInit(): void {
    $('#btn_enviarfile').on('change', function (e) {
      if ($(this).val() != '') {
        $('#txt-enviarfile').css('display', 'none');
        $('#btn_enviarfile').css('display', 'none');
        $('#btn_eliminarfile').css('display', 'block');
        $('#img_logo').css('display', 'block');
        $('#txt_value').css('display', 'block');
      }
    });

    $('#btn_eliminarfile').on('click', function () {
      $('#btn_enviarfile').val('');
      $('#txt-enviarfile').css('display', 'block');
      $('#btn_enviarfile').css('display', 'block');
      $('#btn_eliminarfile').css('display', 'none');
      $('#img_logo').css('display', 'none');
      $('#txt_value').css('display', 'none');
    });
  }
  public ulrpublic: String;
  public imageB64: String;
  public url: any;
  onSelectFile(event) {
    // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url = event.target.result;
        // this.imageB64 = this.url.replace(/ /g, '+');
        this.imageB64 = this.url;

        //this.url = "https://www.40defiebre.com/wp-content/uploads/2015/10/imagenes.png";
        //this.crearEncuesta.imagenMedi=this.url;
        $('#img_logo').attr('src', this.url);
      };
    }
  }

  setIdEncuesta(): void {
    if (this.crearEncuesta.mensaje == '' && this.crearEncuesta.titulo == '') {
      localStorage.setItem('idEncuesta', JSON.stringify(0));
      localStorage.removeItem('nombreEncuesta');
    }
  }

  showModalError(message) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor: '#ea792d',
    });
  }

  showModalConfirmacion(message) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      confirmButtonColor: '#ea792d',
      showConfirmButton: true,
    });
    this.Seccion();
  }

  loading(activar) {
    Swal.fire({
      html:
        "<div class='row loading'>" +
        "<div class='col-2'>" +
        "<div class='spinner-border'></div>" +
        '</div>' +
        "<div class='col-10'>" +
        "<p class='text-dark'>Procesando, espere por favor...</p>" +
        '</div>' +
        '</div>',
      showCancelButton: false,
      showConfirmButton: false,
      width: '380px',
    });

    if (!activar) {
      Swal.close();
    }
  }

  getEncuestaXId(idEncuesta) {
    console.log('Valor id encuenta recibida', idEncuesta);
    this._encuestaService.getEncuestaXIdPost(idEncuesta).subscribe(
      (Response) => {
        console.log(Response);
        if (Response.respuestaProceso.codigo == 200) {
          console.log(Response);
          this.crearEncuesta = Response.encuesta;
          console.log(this.crearEncuesta);

          //formatear valor de la fecha
          this.crearEncuesta.fechaInicio = this.crearEncuesta.fechaInicio.substring(0,10);
          this.crearEncuesta.fechaFin = this.crearEncuesta.fechaFin.substring(0,10);
          this.crearEncuesta.imagenCabecera = this.crearEncuesta.imagenCabecera;

          // seteo la imagen con la ul recuperada

          //console.log('REEESSS PUESTAA ', this.crearEncuesta.fechaInicio);
          $('#fecha-inicio').attr('min', this.fechaActual);
          $('#fecha-fin').attr('min',this.fechaActual);

          if (this.crearEncuesta.imagenCabecera.length > 0) {
            console.log(
              'Valor de la imagen guardada es ' +
                this.crearEncuesta.imagenCabecera
            );
            this.url = this.crearEncuesta.imagenCabecera;
            $('#img_logo').attr('src', this.url);

            $('#txt-enviarfile').css('display', 'none');
            $('#btn_enviarfile').css('display', 'none');
            $('#btn_eliminarfile').css('display', 'block');
            $('#img_logo').css('display', 'block');
            $('#txt_value').css('display', 'block');
          } else {
            console.log('Nuevo registro de encusta');
          }

          localStorage.setItem(
            'nombreEncuesta',
            JSON.stringify(this.crearEncuesta.titulo)
          );
        } else {
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  crearencuesta() {

    let fechaIni = (document.getElementById('fecha-inicio') as HTMLInputElement).value;
    let fechaFin =  (document.getElementById('fecha-fin') as HTMLInputElement).value;
    
    console.log('Fecha inicio  validacion' , fechaIni);
    console.log('Fecha fin  validacion' , fechaFin);

    if(Date.parse(fechaFin) < Date.parse(fechaIni)) {
      this.showModalError('La fecha de configuración final debe ser mayor a la fecha inicial');
   }else{
      //alert("Que es ");
    this.loading(true);
    //this.ulrImagenP = this.subirImagen(
      //'ImgCab_' + this.usuario.nick + '_idEnc_' + this.idEncuesta
    //);

    setTimeout(() => {
      console.log('Actualizar' + this.crearEncuesta);
      localStorage.setItem('crearEncuesta', JSON.stringify(this.crearEncuesta));

      let logo = (document.getElementById('btn_enviarfile') as HTMLInputElement).value;

      this.idEncuesta = JSON.parse(localStorage.getItem('idEncuesta')) == null? 0: JSON.parse(localStorage.getItem('idEncuesta'));
      this.crearEncuesta.idEncuesta = this.idEncuesta;
      this.crearEncuesta.imagenCabecera =this.urlBase+'ImgCab_' +this.usuario.nick+'_idEnc_' +this.idEncuesta +'.jpg';
      this.crearEncuesta.correo = this.usuario.correo;
      this.crearEncuesta.unidadNegocio = this.usuario.unidadNegocio;
      console.log(this.crearEncuesta);

      this._encuestaService.postCrearEncuesta(this.crearEncuesta).subscribe(
        (Response) => {
          console.log(Response);
          if (Response.codigo == 200) {
            console.log(Response.causa);
            localStorage.setItem('idEncuesta', JSON.stringify(Response.causa));
            console.log(this.usuario);
            this.loading(false);
            this.showModalConfirmacion(Response.mensaje);
          } else {
            this.loading(false);
            this.showModalError(Response.mensaje);
          }
        },
        (error) => {
          console.log(<any>error);
        }
      );
    }, 1500);
  }
  }

  Seccion() {
    return this._router.navigate(['../notisurvey/home/secciones']);
  }

  SetInputDate() {
    var fecha = new Date();
    var anio = fecha.getFullYear();
    var dia = fecha.getDate();
    var _mes = fecha.getMonth(); //viene con valores de 0 al 11
    _mes = _mes + 1; //ahora lo tienes de 1 al 12
    var mes;
    if (_mes < 10) //ahora le agregas un 0 para el formato date
    {
       mes = "0" + _mes;
    } else {
       mes = _mes.toString;
    }
    this.fechaActual = anio + '-' + mes + '-' + dia; // Nueva variable
  }

  
  SetInputCheck(){
    var element = <HTMLInputElement> document.getElementById("customSwitch1");
    var isChecked = element.checked;
    if(isChecked==true){
      console.log('Valor del check TRUE ->', isChecked);
      this.crearEncuesta.multipleRespuesta = 'S';

    }else{
      console.log('Valor del check FALSE ->', isChecked);
      this.crearEncuesta.multipleRespuesta = 'N';

    }

  }
}

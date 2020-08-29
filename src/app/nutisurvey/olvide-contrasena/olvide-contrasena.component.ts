import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CrearUsuario } from 'src/app/models/crearUsuario';
import { ActivatedRoute, Router } from '@angular/router';
import { CrearUsuarioService } from 'src/app/servicios/crearUsuario.service';


@Component({
  selector: 'app-olvide-contrasena',
  templateUrl: './olvide-contrasena.component.html',
  styleUrls: ['./olvide-contrasena.component.css'],
  providers:[CrearUsuarioService]
})
export class OlvideContrasenaComponent implements OnInit {
  public usuario:CrearUsuario;

  constructor( private _route:ActivatedRoute,
               private _router:Router,
               private _recuperarContra:CrearUsuarioService
               ) {
                 this.usuario= new CrearUsuario("","","","","",""); 
                }

  ngOnInit(): void {
  }

  

  showModalConfirmacion(message){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      confirmButtonColor:'#ea792d',
      showConfirmButton: true,
    }).then((result)=>{
      if(result.value){
        this.redirigirLogin();
      }
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

  recuperarContrasenia(){
    console.log(this.usuario);
    this.loading(true);
    this._recuperarContra.postRecuperarContrasenia(this.usuario).subscribe(
      Response=>{
        console.log(Response);
        if(Response.codigo==200){
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

  redirigirLogin(){
    return this._router.navigate(['/login']);
  }


}

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CrearEncuesta } from 'src/app/models/crearEncuesta';
import { CrearSeccion } from 'src/app/models/crearSeccion';
import { SeccionPk } from 'src/app/models/seccionPk';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public crearEncuesta: CrearEncuesta;
  public crearSeccion:CrearSeccion[]=[
    new CrearSeccion(""," ",0, new SeccionPk(0,0,0)) 
  ];

  constructor() { }

  ngOnInit(): void {
    localStorage.clear();
    this.crearEncuesta=new CrearEncuesta("","","","","","",0,"","","","",0);
    localStorage.setItem("crearEncuesta",JSON.stringify(this.crearEncuesta));
    localStorage.setItem("crearSeccionLista",JSON.stringify(this.crearSeccion));
  }

  loading(){
      Swal.fire({
        html: "<div class='row'>"+
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
  }

}

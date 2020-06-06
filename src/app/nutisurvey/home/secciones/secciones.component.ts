import { Component, OnInit } from '@angular/core';
import { CrearSeccion } from 'src/app/models/crearSeccion';
import { SeccionPk } from 'src/app/models/seccionPk';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.css']
})
export class SeccionesComponent implements OnInit {
  public contador:number;
  public crearSeccion:CrearSeccion;
  public crearSeccionList:CrearSeccion[];


  constructor() {
    this.contador=0;
    this.crearSeccion=new CrearSeccion("","",0,new SeccionPk(0,0,0));
    this.crearSeccionList=JSON.parse(localStorage.getItem("crearSeccionLista"));
    console.log(this.crearSeccionList);
    this.lista=[
      new CrearSeccion("","",0, new SeccionPk(0,0,0)) 
    ];
   }

  ngOnInit(): void {
    $("#btn-agregarSeccion").click(function(){
      $('#li-clonar').clone().removeAttr("id").insertAfter('.ul-step li:last').find('.campo').val("");
    });
  }

  public lista:CrearSeccion[];
  CrearSeccion(){
    var nombres= document.getElementsByName("nombres");
    var descripcion = document.getElementsByName("descripcion"); 
    localStorage.removeItem('crearSeccionLista');
    this.crearSeccionList.splice(this.crearSeccionList.length+1);
      for (var i = 0; i < nombres.length; i++) {
        this.crearSeccion= new CrearSeccion("","",0,new SeccionPk(0,0,0));
        this.crearSeccion.seccionPk.idEncuesta=47;
        this.crearSeccion.seccionPk.idIndice=1;
        this.crearSeccion.seccionPk.idSeccion=47;
        this.crearSeccion.descripcion=(descripcion[i]as HTMLInputElement).value;
        this.crearSeccion.titulo=(nombres[i]as HTMLInputElement).value;
        this.crearSeccion.nroSeccion=1;
        //console.log(this.crearSeccion);
        this.lista.push(this.crearSeccion);
      }

      localStorage.setItem("crearSeccionLista",JSON.stringify(this.lista));
      console.log(this.lista);
  }
}

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
  public list:CrearSeccion[];


  constructor() {
    this.contador=0;
    this.crearSeccion=new CrearSeccion("","",0,new SeccionPk(0,0,0));
    this.list=[new CrearSeccion("","",0,new SeccionPk(0,0,0))]
    this.crearSeccionList=JSON.parse(localStorage.getItem("crearSeccionLista"));
    console.log(this.crearSeccionList);
   }

  ngOnInit(): void {
    $("#btn-agregarSeccion").click(function(){
      $('#li-clonar').clone().removeAttr("id").insertAfter('.ul-step li:last').find('.campo').val("");
    });
  }

  
  CrearSeccion(){
    var nombres= document.getElementsByName("nombres");
    var descripcion = document.getElementsByName("descripcion"); 
  
      this.list=[];
    
      for (var i = 0; i < nombres.length; i++) {
        this.crearSeccion=new CrearSeccion("","",0,new SeccionPk(0,0,0));
        this.crearSeccion.seccionPk.idEncuesta=47;
        this.crearSeccion.seccionPk.idIndice=1;
        this.crearSeccion.seccionPk.idSeccion=47;
        this.crearSeccion.descripcion=(descripcion[i]as HTMLInputElement).value;
        this.crearSeccion.titulo=(nombres[i]as HTMLInputElement).value;
        this.crearSeccion.nroSeccion=1;
        console.log(i+":"+this.crearSeccion);
        this.list.push(this.crearSeccion);
      }

      localStorage.removeItem('crearSeccionLista');
      localStorage.setItem("crearSeccionLista",JSON.stringify(this.list));
      console.log(this.list);
  }
}

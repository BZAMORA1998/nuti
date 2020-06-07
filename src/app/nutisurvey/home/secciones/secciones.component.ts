import { Component, OnInit } from '@angular/core';
import { ListaSecciones } from 'src/app/models/listaSecciones';
import { SesSeccionPK } from 'src/app/models/sesSeccionPK';
import { CrearSeccionService } from 'src/app/servicios/crearSeccion.service';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.css'],
  providers:[CrearSeccionService]
})
export class SeccionesComponent implements OnInit {
  public contador:number;
  public crearSeccion:ListaSecciones;
  public crearSeccionList:ListaSecciones[];
  public list:ListaSecciones[];


  constructor(private _crearSeccionService:CrearSeccionService) {
    this.contador=0;
    this.crearSeccion=new ListaSecciones("","",0,new SesSeccionPK(0,0,0));
    this.list=[new ListaSecciones("","",0,new SesSeccionPK(0,0,0))]
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
        this.crearSeccion=new ListaSecciones("","",0,new SesSeccionPK(0,0,0));
        this.crearSeccion.sesSeccionPK.idEncuesta=47;
        this.crearSeccion.sesSeccionPK.idIndice=1;
        this.crearSeccion.sesSeccionPK.idSeccion=47;
        this.crearSeccion.descripcion=(descripcion[i]as HTMLInputElement).value;
        this.crearSeccion.titulo=(nombres[i]as HTMLInputElement).value;
        this.crearSeccion.nroSeccion=1;
        console.log(i+":"+this.crearSeccion);
        this.list.push(this.crearSeccion);
      }

      localStorage.removeItem('crearSeccionLista');
      localStorage.setItem("crearSeccionLista",JSON.stringify(this.list));
      console.log(this.list);

      this._crearSeccionService.postCrearSeccion(this.list).subscribe(
        Response=>{
            console.log(Response);
        },
        error=>{
          console.log(<any>error);
        }
      );
  }
}

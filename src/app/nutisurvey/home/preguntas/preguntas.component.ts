import { Component, OnInit } from '@angular/core';
declare var require: any
var $ = require('jquery');
import 'jquery-ui-dist/jquery-ui';
import { CrearEncuesta } from 'src/app/models/crearEncuesta';
import { Usuario } from 'src/app/models/usuario';
import { ListaSecciones } from 'src/app/models/listaSecciones';
import { CrearSeccion } from 'src/app/models/crearSeccion';
import { SesSeccionPK } from 'src/app/models/sesSeccionPK';


@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  public crearSeccion:ListaSecciones;
  public crearSeccionList:ListaSecciones[];
  public crearS:CrearSeccion;
  public idEncuesta:number;
  public estado:string="A"
  
  constructor() { 
    this.crearSeccion=new ListaSecciones("", this.estado,0,0,new SesSeccionPK(0,0,0),"");
    this.crearSeccionList=JSON.parse(localStorage.getItem("crearSeccionLista"));
    this.idEncuesta=Number(JSON.parse(localStorage.getItem("idEncuesta")));
    console.log(this.crearSeccionList);
  }

  ngOnInit(): void {
    $('#accordion').accordion();
    var ac=$('#collapse-0');
    ac.removeClass('collapse');
    ac.addClass('collapse show');

  }

}

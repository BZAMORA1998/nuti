import { Component, OnInit } from '@angular/core';
declare var require: any
var $ = require('jquery');
import 'jquery-ui-dist/jquery-ui';


@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(): void {
      $('#accordion').accordion();
  }

}

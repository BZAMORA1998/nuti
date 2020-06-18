import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit {

    page:number = 1;
    totalPaginas:number;



    @Input() totalDatos: number;
    @Input() datosPorpagina: number;

    @Output() paginaSeleccionada:EventEmitter<number>;

  constructor() { 
    this.paginaSeleccionada = new EventEmitter();
  }

  ngOnInit(): void {
  }

  onPageChange(page){
      this.paginaSeleccionada.emit(page);
  }

}

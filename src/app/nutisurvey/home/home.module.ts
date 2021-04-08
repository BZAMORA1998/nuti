import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { SeccionesComponent } from './secciones/secciones.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { FormsModule } from '@angular/forms';
import { ReporteComponent } from './reportes/reporte/reporte.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [EncuestaComponent, SeccionesComponent, PreguntasComponent, ResultadosComponent, ReporteComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,FormsModule,
    MatTableModule,
    MatPaginatorModule
    ],
  exports:[
    MatTableModule,
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { SeccionesComponent } from './secciones/secciones.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [EncuestaComponent, SeccionesComponent, PreguntasComponent, ResultadosComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,FormsModule
  ]
})
export class HomeModule { }

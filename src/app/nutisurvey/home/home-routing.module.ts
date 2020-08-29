import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { SeccionesComponent } from './secciones/secciones.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { AuthGuard } from '../../guards/auth.guard';


const routes: Routes = [
  {
    path: '', 
    component: HomeComponent, 
    canActivate: [ AuthGuard ],
    children: [
    { 
      path: 'diseño-encuesta',  component: EncuestaComponent ,  
    },
    { 
       path: 'secciones',  component: SeccionesComponent,
    },
    { 
      path: 'preguntas',  component: PreguntasComponent,
    },
    { 
      path: 'resultado-final',  component: ResultadosComponent,
    },
    {
      path: '', redirectTo: 'diseño-encuesta', pathMatch: 'full'
    },
    { path: '**', component: EncuestaComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

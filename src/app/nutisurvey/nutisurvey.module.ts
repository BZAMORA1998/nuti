import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NutisurveyRoutingModule } from './nutisurvey-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { OlvideContrasenaComponent } from './olvide-contrasena/olvide-contrasena.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoginComponent, HomeComponent, OlvideContrasenaComponent, CrearUsuarioComponent],
  imports: [
    CommonModule,
    NutisurveyRoutingModule,
    FormsModule, 
    SharedModule
  ]
})
export class NutisurveyModule { }

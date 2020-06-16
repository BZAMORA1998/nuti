import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NutisurveyComponent } from './nutisurvey.component';
import { OlvideContrasenaComponent } from './olvide-contrasena/olvide-contrasena.component';

const routes: Routes = [
  {
     path: '', component: NutisurveyComponent, children: [
      { 
        path: 'login',  component: LoginComponent 
      },
      { 
        path: 'olvide-contraseña',  component: OlvideContrasenaComponent 
      },
      {
        path: 'home' , loadChildren:()=> import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },
      { path: '**', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NutisurveyRoutingModule { }

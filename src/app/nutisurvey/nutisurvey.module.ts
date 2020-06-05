import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NutisurveyRoutingModule } from './nutisurvey-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NutisurveyRoutingModule
  ]
})
export class NutisurveyModule { }

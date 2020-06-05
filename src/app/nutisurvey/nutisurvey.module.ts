import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NutisurveyRoutingModule } from './nutisurvey-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [LoginComponent, HomeComponent],
  imports: [
    CommonModule,
    NutisurveyRoutingModule
  ]
})
export class NutisurveyModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  {
    path: 'notisurvey' , loadChildren:()=> import('./nutisurvey/nutisurvey.module').then(m => m.NutisurveyModule)
  },
  { 
      path: '**', redirectTo: 'notisurvey' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,BrowserModule,BrowserAnimationsModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public usuario:Usuario;
  public nombreEncuesta:String;
  constructor(private auth: LoginService,
            private router: Router) { 
     
  }

  ngOnInit(): void {

     // setInterval(() => {
        this.usuario=JSON.parse(localStorage.getItem("usuario"));
        this.nombreEncuesta=JSON.parse(localStorage.getItem("nombreEncuesta"));
  
        if(this.nombreEncuesta==null){
          this.nombreEncuesta="Nombre de la encuesta que esta realizando...";
        }
      //}, 1000);
        console.log(this.router.url);
    }

    salir(){
      this.auth.logout();
      this.router.navigateByUrl('/login');
    }

    home(){
      return this.router.navigate(['../notisurvey/registro-encuesta']);
    }

    ocultarNavbarR(){
      if(this.router.url=='/notisurvey/home/reportes'){
        return false
      }else{
        return true
      }
    }
}

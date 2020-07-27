import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public usuario:Usuario;
  public nombreEncuesta:String;
  constructor() { 
     
  }

  ngOnInit(): void {

      setInterval(() => {
        this.usuario=JSON.parse(localStorage.getItem("usuario"));
        this.nombreEncuesta=JSON.parse(localStorage.getItem("nombreEncuesta"));
  
        if(this.nombreEncuesta==null){
          this.nombreEncuesta="Nombre de la encuesta que esta realizando...";
        }
      }, 1000);
    }

}

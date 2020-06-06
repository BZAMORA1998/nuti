import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public usuario:Usuario;
  constructor() { }

  ngOnInit(): void {
    this.usuario=JSON.parse(localStorage.getItem("usuario"));
  }

}

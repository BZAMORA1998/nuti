import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { ListaEncuesta } from 'src/app/models/listaEcuesta';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registro-encuesta',
  templateUrl: './registro-encuesta.component.html',
  styleUrls: ['./registro-encuesta.component.css'],
  providers:[EncuestaService]
})
export class RegistroEncuestaComponent implements OnInit {

  public listaEncuesta:ListaEncuesta[];
  public paginas:number;
  public size:number=5;
  public pagina:number;
  public totpaginate:number;
  public usuario:Usuario;
  constructor(
    private _encuestaService:EncuestaService,
    private _route:ActivatedRoute,
    private _router:Router
  ) { 
    this.usuario=JSON.parse(localStorage.getItem("usuario"));
    this.pagina=1;
  }

  ngOnInit(): void {
    this.getListaEncuesta(this.pagina);
  }


  getListaEncuesta(pagina){
    this._encuestaService.getListaEcuesta(this.usuario.correo,this.size,pagina).subscribe(
      Response=>{
        if(Response.respuestaProceso.codigo==200){
          this.paginas=Response.paginas;
          this.listaEncuesta=Response.listarEncuesta;
          for(var i in this.listaEncuesta){
            if(this.listaEncuesta[i].mensaje.length>100){
              this.listaEncuesta[i].mensaje=this.listaEncuesta[i].mensaje.substr(0,99).concat("...")  ;
            }
          }

          console.log(this.listaEncuesta);
        }else{
          console.log(Response.respuestaProceso.mensaje);
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  getpaginacion(pagina){
    console.log("La pagina es ",pagina);
    this.getListaEncuesta(pagina);
  }

  redidirigirPrincipal(){
    setTimeout(()=>{
      window.location.reload();
    }, 100);
    return this._router.navigate(['/principal']);
  }

}

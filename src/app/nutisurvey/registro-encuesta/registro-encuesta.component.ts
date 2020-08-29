import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { ListaEncuesta } from 'src/app/models/listaEcuesta';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-registro-encuesta',
  templateUrl: './registro-encuesta.component.html',
  styleUrls: ['./registro-encuesta.component.css'],
  providers:[EncuestaService]
})
export class RegistroEncuestaComponent implements OnInit {

  public listaEncuesta:ListaEncuesta[];
  public totalEncuesta:number;
  public size:number=5;
  public pagina:number;
  public totpaginate:number;
  public usuario:Usuario;
  constructor(
    private _encuestaService:EncuestaService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _auth:LoginService
  ) { 
    this.usuario=JSON.parse(localStorage.getItem("usuario"));
    this.pagina=1;
  }

  ngOnInit(): void {
    localStorage.setItem("idEncuesta",JSON.stringify(0));
    localStorage.removeItem("nombreEncuesta");
    if(this.usuario!=null){
      this.getListaEncuesta(this.pagina);
    }else{
      this.salir();
    }
  }


  getListaEncuesta(pagina){
    this._encuestaService.getListaEcuesta(this.usuario.correo,this.size,pagina).subscribe(
      Response=>{
        if(Response.respuestaProceso.codigo==200){
          this.totalEncuesta=Response.totalEncuestas;//Response.paginas;
          console.log("Paginas por abrir son " + Response.paginas);
          
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
    /*setTimeout(()=>{
      window.location.reload();
    }, 100); //100 */  
    return this._router.navigate(['../notisurvey/home/diseño-encuesta']);
    //return this._router.navigate(['../notisurvey/home']);
  }

  getIdEncuesta(idEncuesta){
    console.log("idEncuesta es: ",idEncuesta);
    localStorage.setItem("idEncuesta",JSON.stringify(idEncuesta));
    this._router.navigate(['../notisurvey/home']);
  }


  salir(){
    this._auth.logout();
    this._router.navigateByUrl('/login');
  }


}

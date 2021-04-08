import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { RegistroRespuesta } from '../../../../models/respuestaRegistro';
import { ReportesService } from 'src/app/servicios/reporte.service';
import { ExcelService } from '../../../../excel.service';
import { FiltroEncuesta } from '../../../../models/filtroEncuesta';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}




@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
  providers:[ReportesService]
})
export class ReporteComponent implements OnInit {
  displayedColumns: string[] = ['idParticipante','idPregunta','preguntaServicio','idRespuesta','calificacion','respuestaServicio','fechaRegistraEncuesta','datoUnico','datoUnico2','datoUnico3'];
  public filtroEncuesta:FiltroEncuesta;
  public respuestaEncuesta:RegistroRespuesta[];
  public idEncuesta:number;
  public data:RegistroRespuesta[];
  //dataSource = new MatTableDataSource <PeriodicElement>(ELEMENT_DATA);
  public dataSource = new MatTableDataSource<RegistroRespuesta>();
@ViewChild(MatPaginator) paginator : MatPaginator;

  
ngAfterViewInit() {
 //this.dataSource.paginator = this.paginator;
}



  constructor(
    private _reporteService:ReportesService,
    private excelService:ExcelService
  ) { 
    this.filtroEncuesta= new FiltroEncuesta();
    this.idEncuesta=Number(JSON.parse(localStorage.getItem("idEncuesta")));
    
  }

  ///
/*   data: any = [
    {      
        "id_participante": 1,
        "id_pregunta": "BOOKS",
        "pregunta_servicio": "It contains all types of books",
        "id_respuesta": "TRUE",
        "respuesta_serivicio":"NULL",
        "calificacion":"Otros",
        "dato_unico":"03434",
        "fecha_registrada_encuesta":"234",
        "dato_unico_2":23,
        "dato_unico_3":"sdf",
    },
    {      
      "id_participante": 9,
      "id_pregunta": "BOOKS",
      "pregunta_servicio": "It contains all types of books",
      "id_respuesta": "TRUE",
      "respuesta_serivicio":"NULL",
      "calificacion":"Otros",
      "dato_unico":"03434",
      "fecha_registrada_encuesta":"234",
      "dato_unico_2":23,
      "dato_unico_3":"sdf",
  },
  {      
    "id_participante": 2,
    "id_pregunta": "Valor ",
    "pregunta_servicio": "Nuevo Valor ",
    "id_respuesta": "Rs",
    "respuesta_serivicio":"N",
    "calificacion":"Otros",
    "dato_unico":"03434",
    "fecha_registrada_encuesta":"234",
    "dato_unico_2":23,
    "dato_unico_3":"sdf",
}
] */

  ///


  ngOnInit(): void {
    console.log("Id de la encuesta ->" , this.idEncuesta)
    //this.dataSource.paginator = this.paginator;

  }


  getReporteList(){
    console.log("id de la encuesta es -> ", this.idEncuesta , " Inicio ->",this.filtroEncuesta.fechaInicio, "Fin -> ", this.filtroEncuesta.fechaFin)
    this._reporteService.postObtenerReporte(this.idEncuesta,this.filtroEncuesta.fechaInicio,this.filtroEncuesta.fechaFin).subscribe(
      Response=>{
        if(Response.respuestaProceso.codigo==200){
          console.log("Todo bien");
          this.respuestaEncuesta = Response.respuestasEncuesta;
          this.data=this.respuestaEncuesta;
          console.log("Arreglo ", this.respuestaEncuesta);


          this.dataSource = new MatTableDataSource<RegistroRespuesta>(this.respuestaEncuesta);
          
          this.dataSource.paginator = this.paginator;


        }else{
          console.log(Response.resppuestaProceso.mensaje);
        }
      },
      error=>{
        console.log(<any>error);
      }
    );

  }

  
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'Encuesta'+this.idEncuesta);
 }

}

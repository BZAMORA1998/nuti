import { OpcionRespuestas } from './opcionRespuestas';

export class PreguntaHija{

    public descripcion:String;
    public esPadre:string;
    public estado:string;
    public idPregunta:number;
    public idSeccion:number;
    public opcionRespuestas:Array<OpcionRespuestas>;

    constructor(
       
    ){
        this.descripcion="";
        this.esPadre="";
        this.estado="";
        this.idPregunta=0;
        this.idSeccion=0;
        this.opcionRespuestas= new Array<OpcionRespuestas>();
    }
}
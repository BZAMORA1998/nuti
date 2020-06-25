import { OpcionRespuestas } from './opcionRespuestas';
import { ReglasPreguntas } from './reglasPreguntas';
import { SesSeccionPK } from './sesSeccionPK';
import { SesSeccion } from './sesSeccion';


export class ListaPreguntas{

    public descripcion:string;
    public esPadre:String;
    public estado:String;
    public idPregunta:0;
    public opcionRespuestas:Array<OpcionRespuestas>;
    public orden: 0;
    public orientacionOpciones:string;
    public regla:string;
    public reglasPreguntas:Array<ReglasPreguntas>;
    public requerida:string;
    public sesSeccion:SesSeccion;
    public tabula:string;
    public tipo:string;
    public tipoArea:string;
    public idAux:0;
    public auxBool:boolean;

    constructor(){
        this.descripcion="";
        this.esPadre="";
        this.estado="";
        this.idPregunta=0;
        this.opcionRespuestas=new Array<OpcionRespuestas>();
        this.orden=0;
        this.orientacionOpciones="";
        this.regla="";
        this.reglasPreguntas=new Array<ReglasPreguntas>();
        this.requerida="";
        this.sesSeccion=new SesSeccion();
        this.tabula="";
        this.tipo="";
        this.tipoArea="";
        this.idAux=0
        this.auxBool=true;
    }
}
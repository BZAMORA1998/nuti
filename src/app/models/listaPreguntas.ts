import { OpcionRespuestas } from './opcionRespuestas';
import { ReglasPreguntas } from './reglasPreguntas';
import { SesSeccionPK } from './sesSeccionPK';
import { SesSeccion } from './sesSeccion';


export class ListaPreguntas{
    constructor(
        public descripcion:string,
        public esPadre:String,
        public estado:"",
        public idPregunta:0,
        public opcionRespuestas:OpcionRespuestas[],
        public orden: 0,
        public orientacionOpciones:"",
        public regla: "",
        public reglasPreguntas:ReglasPreguntas[],
        public requerida:string,
        public sesSeccion:SesSeccion,
        public tabula:string,
        public tipo:string,
        public tipoArea:string

    ){

    }
}
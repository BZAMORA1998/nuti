import { publicDecrypt } from 'crypto'
import { OpcionRespuestas } from './opcionRespuestas';

export class PreguntaHija{
    constructor(
        public descripcion:string,
        public esPadre:string,
        public estado:string,
        public idPregunta:0,
        public idSeccion:0,
        public opcionRespuestas:OpcionRespuestas[]
    ){
    }
}
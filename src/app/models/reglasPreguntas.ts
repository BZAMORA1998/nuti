import { PreguntaHija } from './preguntaHija';

export class ReglasPreguntas{
    constructor(
        public descripcion:string,
        public estado: string,
        public etiquetaIgual:string,
        public idPregunta:0,
        public idPreguntaHija: 0,
        public idRegla:0,
        public preguntaHija:PreguntaHija
    ){

    }
}
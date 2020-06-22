import { PreguntaHija } from './preguntaHija';

export class ReglasPreguntas{
    public descripcion:string;
    public estado: string;
    public etiquetaIgual:string;
    public idPregunta:number;
    public idPreguntaHija: number;
    public idRegla:number;
    public preguntaHija:PreguntaHija;
    constructor(
    ){
        this.descripcion="";
        this.estado="";
        this.etiquetaIgual="";
        this.idPregunta=0;
        this.idPreguntaHija=0;
        this.idRegla=0;
        this.preguntaHija=new PreguntaHija();
    }
}
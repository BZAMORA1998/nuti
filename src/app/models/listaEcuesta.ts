import{ Encuesta } from './encuesta'
export class ListaEncuesta{
    constructor(
                public estado:String,
                public fechaFin: String,
                public fechaInicio:String,
                public  imagenCabecera:String,
                public  imagenMedicion:String,
                public  link:String,
                public  mensaje:String,
                public sesEncuestaPK: Encuesta,
                public titulo:String
    ){

    }
}
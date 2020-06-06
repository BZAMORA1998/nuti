export class CrearEncuesta{
    constructor(
        public correo:String,
        public titulo:String,
        public mensaje:String,
        public fechaInicio:String,
        public fechaFin:String,
        public link:String,
        public unidadNegocio:number,
        public imagenCab: any,
        public imagenMedi: any,
        public imagenPie: String,
        public notaPie:String,
        public idEncuesta:number
    ){
 
    }
}
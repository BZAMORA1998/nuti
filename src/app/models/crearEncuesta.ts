export class CrearEncuesta{

        public correo:String;
        public titulo:String;
        public mensaje:String;
        public fechaInicio:String;
        public fechaFin:String;
        public link:String;
        public unidadNegocio:number;
        public imagenCabecera: String;
        public imagenMedicion: String;
        public imagenPie: String;
        public notaPie:String;
        public idEncuesta:number;

    constructor(
        
    ){
        this.correo="";
        this.titulo="";
        this.mensaje="";
        this.fechaInicio="";
        this.fechaFin="";
        this.link="";
        this.unidadNegocio=0;
        this.imagenCabecera="";
        this.imagenMedicion="";
        this.imagenPie="";
        this.notaPie="";
        this.idEncuesta=0;
    }
}
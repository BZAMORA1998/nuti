import{SesSeccionPK} from './sesSeccionPK'

export class ListaSecciones{
    public descripcion:string;
    public estado:string;
    public nroSeccion:number;
    public idAux:number;
    public sesSeccionPK:SesSeccionPK;
    public titulo:string;    
    constructor(
    )
    {
        this.descripcion="";
        this.estado="A";
        this.nroSeccion=0;
        this.idAux=0;
        this.sesSeccionPK=new SesSeccionPK();
        this.titulo="";    
    }
}
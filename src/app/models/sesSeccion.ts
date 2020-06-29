import { SesSeccionPK } from './sesSeccionPK';

export class SesSeccion{
    public descripcion:string;
    public estado:string;
    public nroSeccion:number;
    public sesSeccionPK:SesSeccionPK;
    public titulo:string;

    constructor(
    ){
        this.descripcion="";
        this.estado="";
        this.nroSeccion=0;
        this.sesSeccionPK=new SesSeccionPK(0,0,0);
        this.titulo="";
    }
}
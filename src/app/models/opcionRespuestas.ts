import { SesOpcionesPK } from './sesOpcionesPK';

export class OpcionRespuestas{

    public estado:string;
    public etiquetaOpcion:string;
    public likert:number;
    public orden:number;
    public sesOpcionesPK:SesOpcionesPK;

    constructor(
      
    ){
        this.estado="";
        this.etiquetaOpcion="";
        this.likert= 0;
        this.orden=0;
        this.sesOpcionesPK=new SesOpcionesPK();
    }
}
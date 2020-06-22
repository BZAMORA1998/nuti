import { SesSeccionPK } from './sesSeccionPK';

export class SesSeccion{
    constructor(
        public descripcion:string,
        public estado:string,
        public nroSeccion:0,
        public sesSeccionPK:SesSeccionPK,
        public titulo:string
    ){

    }
}
import { SesOpcionesPK } from './sesOpcionesPK';

export class OpcionRespuestas{
    constructor(
        public estado:string,
        public etiquetaOpcion:string,
        public likert: 0,
        public orden: 0,
        public sesOpcionesPK:SesOpcionesPK
    ){

    }
}
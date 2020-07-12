import{SesSeccionPK} from './sesSeccionPK'

export class ListaSecciones{
    constructor(
        public descripcion:string,
        public estado:string,
        public nroSeccion:number,
        public idAux:number,
        public sesSeccionPK:SesSeccionPK,
        public titulo:string,
        )
        {

        }
    }
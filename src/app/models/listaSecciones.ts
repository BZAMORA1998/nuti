import{SesSeccionPK} from './sesSeccionPK'

export class ListaSecciones{
    constructor(
        public descripcion:string,
        public titulo:string,
        public nroSeccion:number,
        public idAux:number,
        public sesSeccionPK:SesSeccionPK
        )
        {

        }
    }
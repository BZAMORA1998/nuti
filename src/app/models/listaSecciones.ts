import{SesSeccionPK} from './sesSeccionPK'

export class ListaSecciones{
    constructor(
        public descripcion:string,
        public titulo:string,
        public nroSeccion:number,
        public sesSeccionPK:SesSeccionPK
        )
        {

        }
    }
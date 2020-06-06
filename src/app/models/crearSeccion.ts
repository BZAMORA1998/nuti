import{SeccionPk} from './seccionPk'

export class CrearSeccion{
    constructor(
        public descripcion:string,
        public titulo:string,
        public nroSeccion:number,
        public seccionPk:SeccionPk
        )
        {

        }
    }
import { Actividad } from './actividad.model'
export class Cit{
    id: Number;
    name: string;
    ape: string;
    tele: string
    creadaEn: Date
    terminadaEn: Date
    completada: boolean
    item: Actividad[] 
    constructor(name: string){
        this.name = name
        this.creadaEn = new Date()
        this.completada = false
        this.item = []
        this.id = new Date().getTime()
    }
}
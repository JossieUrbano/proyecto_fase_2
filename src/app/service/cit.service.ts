import { Injectable } from '@angular/core';
import { IonItem } from '@ionic/angular';
import {Cit} from '../models/Citas.model'

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  public Acri:Cit[] = []
  public Gel:Cit[] = []
  public SP:Cit[] = []
  constructor() { 
    
    this.cargarStorageAcri();
    this.cargarStorageGel();
    this.cargarStorageSP();

   }

  crearCitasAcri(nombreCita:string){
    let ObjetoCitas =new Cit(nombreCita)

    this.Acri.push(ObjetoCitas)

    this.guardarStorageAcri();
    return ObjetoCitas.id;
  }

  guardarStorageAcri(){
    let stringCitas: string = JSON.stringify(this.Acri);
    localStorage.setItem('Acri', stringCitas)

  }

  cargarStorageAcri(){
    const citaStorageAcri = localStorage.getItem('Acri');
    if (citaStorageAcri == null) {
      return 
    }
    let objCitas = JSON.parse(citaStorageAcri) 
    this.Acri = objCitas
  }

  crearCitasGel(nombreCita:string){
    let ObjetoCitas =new Cit(nombreCita)

    this.Gel.push(ObjetoCitas);
    this.guardarStorageGel();
    return ObjetoCitas.id;
  }

  guardarStorageGel(){
    let stringCitas: string = JSON.stringify(this.Gel);
    localStorage.setItem('Gel', stringCitas)
  }

  cargarStorageGel(){
    const citaStorageGel = localStorage.getItem('Gel');
    if (citaStorageGel == null) {
      return 
    }
    let objCitas = JSON.parse(citaStorageGel) 
    this.Gel = objCitas
  }

  crearCitasSP(nombreCita:string){
    let ObjetoCitas =new Cit(nombreCita)
    this.SP.push(ObjetoCitas);
    this.guardarStorageSp();
    return ObjetoCitas.id;
  }
  
  guardarStorageSp(){
      let stringCitas: string = JSON.stringify(this.SP);
      localStorage.setItem('SP', stringCitas)
  }

  cargarStorageSP(){
    const citaStorageSP = localStorage.getItem('SP');
    if (citaStorageSP == null) {
      return 
    }
    let objCitas = JSON.parse(citaStorageSP) 
    this.SP = objCitas
  }

  borrarCita(cita: Cit){
    let newCita = this.Acri.filter((citaItem)=> citaItem.id !== cita.id)
    this.Acri = newCita
    this.guardarStorageAcri()
    let newCit = this.Gel.filter((citaItem)=> citaItem.id !== cita.id)
    this.Gel = newCit
    this.guardarStorageGel()
    let newCi = this.SP.filter((citaItem)=> citaItem.id !== cita.id)
    this.SP = newCi
    this.guardarStorageSp()
  }

  

}

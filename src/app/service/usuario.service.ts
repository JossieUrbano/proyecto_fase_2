import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.URL;

  constructor(private http: HttpClient) { }
  
  agregar(body) {
    return this.http.post(`${this.url}/usuarios`,body)
  }

  agregarCita(body) {
    return this.http.post(`${this.url}/agendars`,body)
  }

  obtenerCitas() {
    return this.http.get(`${this.url}/agendars`)
  }

  actualizarCita(body,id) {
    return this.http.put(`${this.url}/agendars/${id}`,body)
  }

  eliminarCita(id) {
    return this.http.delete(`${this.url}/agendars/${id}`)
  }
  
}

import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  Manicure = [
    {'id':1, 'nombre': 'Manicure', 'precio': '20000'}
  ];
  Pestanas = [
    {'id':2, 'nombre': 'Pestañas', 'precio': '40000'}
  ];
  Limpieza = [
    {'id':3, 'nombre': 'Limpieza Facial', 'precio': '80000'}
  ];
  
  constructor(
    private authService: AuthService,
    private route:Router
    ) {
    /*
    this.usuario.name = 'juan';
    this.usuario.phone = '318';
    this.usuarios.push(this.usuario);
    this.usuario = new User;
    this.usuario.name = 'javier';
    this.usuario.phone = '322';
    this.usuarios.push(this.usuario);*/

  

  }
  
  logout() {
      console.log('eliminando')
    this.authService.eliminarToken()
    this.route.navigate(['/welcome'])
    }

}

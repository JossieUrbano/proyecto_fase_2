import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.URL;

  constructor(private http: HttpClient,
              private cookiesService:CookieService) { }


  obtenerToken() {
    return this.cookiesService.get('token')
  }

  async eliminarToken() {
    await this.cookiesService.deleteAll('/')
    this.cookiesService.delete("token", '/');
  }

  loguearUsuario(body:any,vacio?) {

    this.http.post(`${this.url}/identificar`, body).subscribe((resp: any) => {
      this.http.post(`${this.url}/verificarToken/${resp.token}`,vacio).subscribe((res: any) => {
        let fechaExp = res.datos.exp;
        console.log(res.datos)

        if (res.datos) {     
          this.cookiesService.set('token', resp.token, fechaExp)
        }
      
      })
      console.log(resp)
    })
  }

  crearUsuario(body) {
    return this.http.post(`${this.url}/logins`, body)
  }
  
  verificarUsuario(token,vacio?) {
    return this.http.post(`${this.url}/verificarToken/${token}`, vacio)
  }

}

import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  activated:boolean;
  valueActive: any;
  constructor(private authService: AuthService,
              private router:Router) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any>{
    return await this.token() ;
  }

  async token() {

    let token = this.authService.obtenerToken(); 

    if (token) {
      this.router.navigate['/inicio/tab1']
      return true
    } else {
      this.router.navigate['/welcome']
      return false
    }
  }
 

  
  // private async tokenExiste() {
  //   let token = this.authService.obtenerToken();
  //   console.log(token)
  //   if (token) {
  //     return true
  //   } else {
  //     this.router.navigate(['/home'])
  //     return false
  //   }
  // }

  
}

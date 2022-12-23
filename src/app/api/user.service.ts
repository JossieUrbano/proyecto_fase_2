import { Injectable } from '@angular/core';
import {observable, Subject, of, Observable, pipe} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators'; 

import { User } from '../../intefaz/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usuarios$ = new Subject<User[]>()
  public usuario: User
  public usuarios: User[] = []
  constructor(
    private http: HttpClient
  ) {}

  todos$(): Observable<User[]>{
    return this.usuarios$.asObservable();
  }

  todos():Observable<any>{
    this.usuarios = [];
    return this.http.get<User[]>('https://randomuser.me/api/?results=20')
    .pipe(
      map((res: any) => {
        res.results.forEach((item: { name: { first: string; }; phone: string; picture: { thumbnail: string; }; }) => {
        this.usuario =  new User
        this.usuario.name = item.name.first
        this.usuario.phone = item.phone
        this.usuario.thumb = item.picture.thumbnail
        this.usuarios.push(this.usuario)
        });
        this.usuarios$.next(this.usuarios);
      }),
      
    )
  }
}

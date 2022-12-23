import { Component } from '@angular/core';
import { User } from '../../intefaz/user';
import { UserService } from '../api/user.service'

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public usuario = new User;
  public usuarios: User [] = [];

  usuarioSubscription: Subscription
  constructor(
    private usuarioService: UserService
  ) {
    this.usuarioSubscription = this.usuarioService.todos$().subscribe((items: User[]) =>{
      if(items.length>0){
        this.usuarios = items
      }
      else{
        this.usuarios = []
      }
    });

    this.usuarioService.todos().subscribe();
  }

}

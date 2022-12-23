import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  token: string;

  constructor(
    public modalCtr: ModalController,
    private autService: AuthService,
    private router: Router
  ) { 
    this.constrirFormulario();
    this.token = this.autService.obtenerToken()
  }

  async dismiss(){
    await this.modalCtr.dismiss();
  }

  ngOnInit() {
  }

  logeo() {

    if (this.loginForm.invalid) {
      
    }

    let res = this.autService.loguearUsuario(this.loginForm.value)
    if (this.token) {
      this.router.navigate(['/inicio'])
    }
  }

  constrirFormulario() {
    this.loginForm = new FormGroup({
      correo: new FormControl('', [Validators.required]),
      contrasenia: new FormControl('',[Validators.required])
    })
  }

}

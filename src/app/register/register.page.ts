import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  regitroForm: FormGroup;

  constructor(
    public modalCtr: ModalController,
    private usuarioService: UsuarioService,
    private authService:AuthService
  ) { 
    this.contruirFormulario()
  }

  async dismiss(){
    await this.modalCtr.dismiss();
  }

  ngOnInit() {
  }

  registrar() {
    const {confirmarContrasenia, ...data } = this.regitroForm.value;
    console.log(confirmarContrasenia , data)
    this.usuarioService.agregar(data).subscribe((res: any) => {
   
      const { correo, contrasenia } = res;
      console.log(correo, contrasenia) 
      let usuario = {
        correo,
        contrasenia
      }
      this.authService.crearUsuario(usuario).subscribe((res: any) => {
        console.log(res)
      })
    })
  } 

  contruirFormulario() {
    this.regitroForm = new FormGroup({
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required]),
      usuario: new FormControl('', [Validators.required]),
      contrasenia: new FormControl('', [Validators.required]),
      confirmarContrasenia: new FormControl('',[Validators.required]),
    })
  }

}

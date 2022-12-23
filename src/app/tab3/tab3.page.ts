import { Component } from '@angular/core';
import { AlertController, IonButton, ToastController } from '@ionic/angular';
import { CitasService } from 'src/app/service/cit.service';
import { Cit } from '../models/Citas.model';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  citas: any[] = [];
  mensaje: any;

  constructor(
    public alertcontroller: AlertController,
    public toastcontroller: ToastController,
    public CistasService: CitasService,
    private service: UsuarioService,
  ) {
    this.obtenerCitas()
  }


  obtenerCitas() {
    this.service.obtenerCitas().subscribe((resp: any) => {
      this.citas = resp;
      console.log(this.citas)
    })
  }

  eliminar(id) {
    console.log(id)

    this.service.eliminarCita(id).subscribe((resp: any) => {
      console.log(resp)
      if (resp) {
        this.mensaje = 'Eliminado'
      }
    })
    this.obtenerCitas();
  }

  editar(id?) {
    this.actualizarCita()
    console.log(id)
  }

  validInput(input: any): boolean {
    if (input && input.name && input.ape && input.tele) {
      return true;
    }

    this.presentToast("Cita agendada")
    return false;

  }

  async actualizarCita() {
    let alerta = await this.alertcontroller.create({
      header: "Dia de la cita",
      inputs: [{
        type: "date",
        name: "name",
        placeholder: "Ingresa tu Nombre",
      },
      {
        type: 'text',
        name: 'nombre',
        placeholder: 'Ingresa tu nombre'
        },
        {
          type: 'text',
          name: 'tip de cita',
          placeholder: 'Ingresa El tipo'
        }
      ],
      buttons: [{
        text: "Cancelar",
        role: "cancel"
      },
      {
        text: "crear",
        handler: (data: any) => {
          let isValid: boolean = this.validInput(data);
          if (isValid) {
            console.log('creando')

          }
          this.editar()
          console.log(data);
        }


      }
      ]


    });
    await alerta.present();
    console.log("Cita Agendada")
  }

  async presentToast(message: string) {
    let toast = await this.toastcontroller.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}

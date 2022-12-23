import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonButton, ToastController } from '@ionic/angular';
import { Cit } from 'src/app/models/Citas.model';
import { CitasService } from 'src/app/service/cit.service';
import { UsuarioService } from '../../service/usuario.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  productos = [
    {'id':1, 'nombre': 'tora', 'precio': '10000'},
    {'id':2, 'nombre': 'costilla', 'precio': '10000'},
    {'id':3, 'nombre': 'carne', 'precio': '10000'}
  ];
  private id: any;
  public producto: any; 
  mensajeRegistro: string;
  constructor(
    private route: ActivatedRoute,
    public alertcontroller: AlertController,
    public toastcontroller: ToastController,
    public CistasService: CitasService,
    private usuariosService: UsuarioService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productos.forEach((item)=>{
      if(item.id == this.id){
        this.producto = item;
      }
    });
  }

  /**
   * @function AgregarCitaAcri
   * @description fundion sera ejecutada cuando el usurario le da click al boton
   * agregar, mostrara una alerta donde solicita el nombre de la lista
   */

   async AgendarCitaAcri(){
    let alerta = await this.alertcontroller.create({
      header: "Dia de la cita",
      inputs:[{
        type: "date",
        name: "name",
        placeholder: "Ingresa tu Nombre"
      },
      {
        type: 'text',
        name: 'nombre',
        placeholder:'Ingresa tu nombre'
      }
    ],
    buttons: [{
      text:"Cancelar",
      role:"cancel"
    },
    {
      text:"crear",
      handler: (data: any)=>{
       let isValid: boolean = this.validInput(data);
        if (isValid) {
          let name = [data.name, data.ape, data.tele]
          this.CistasService.crearCitasAcri(data.name)
          
        }
        this.agendarCita('Acrilica',data);
        console.log(data);
      }
      
      
    }
  ]

            
    });
    await alerta.present();
    console.log("Cita Agendada")
  }
  async AgendarCitaGel(){
    let alerta = await this.alertcontroller.create({
      header: "Dia de la cita",
      inputs:[{
        type: "date",
        name: "name",
        placeholder: "Ingresa tu Nombre"
      },
      {
        type: 'text',
        name: 'nombre',
        placeholder:'Ingresa tu nombre'
    }
    ],
    buttons: [{
      text:"Cancelar",
      role:"cancel"
    },
    {
      text:"crear",
      handler: (data: any)=>{
       let isValid: boolean = this.validInput(data);
        if (isValid) {
          let name = [data.name, data.ape, data.tele]
          this.CistasService.crearCitasGel(data.name)
          
        }
        
        this.agendarCita('En Gel',data)
        console.log(data);
      }
      
      
    }
  ]

            
    });
    await alerta.present();
    console.log("Cita Agendada")
  }
  async AgendarCitaSP(){
    let alerta = await this.alertcontroller.create({
      header: "Dia de la cita",
      inputs:[{
        type: "date",
        name: "name",
        placeholder: "Ingresa tu Nombre",
      },
        {
          type: 'text',
          name: 'nombre',
          placeholder:'Ingresa tu nombre'
      }
    ],
    buttons: [{
      text:"Cancelar",
      role:"cancel"
    },
    {
      text:"crear",
      handler: (data: any)=>{
       let isValid: boolean = this.validInput(data);
        if (isValid) {
            console.log('creando')
          
        }
        this.agendarCita('Semi-Permanentes',data)
        console.log(data);
      }
      
      
    }
  ]

            
    });
    await alerta.present();
    console.log("Cita Agendada")
  }

  /**
   * @function validInput
   * @description funcion realiza la validacion del input
   * cuando no fue ongresado ningun valor manda un false (y un toast) y en caso contrario true
   * @param{amy}input
   * @returns{boolean}
   */

  validInput(input:any): boolean{
    if(input && input.name && input.ape && input.tele){
      return true;
    }
    
    this.presentToast("Cita agendada")
    return false;

  }

  /**
   * @function AgregarCitaAcri
   * @description muestra un mensaje el cual fue pasado a parametro
   * duracion 2000 milisegundos
   * @param{string}message mensaje que se mostrara en el toast
   */

  async presentToast(message: string){
    let toast = await this.toastcontroller.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  editarLista(listaItem: any){
    console.log("Editar", listaItem)
  }

  borrarLista(listaItem: Cit){
    this.CistasService.borrarCita(listaItem)
    console.log("Eliminar", listaItem)

  }
  

  agendarCita(cita, fecha?) {
    let data = fecha;
    let tipoCit = cita;
    let idUsuario;

    let infoAgendar;
    console.log(cita)

    let token = this.authService.obtenerToken();
    this.authService.verificarUsuario(token).subscribe((resp: any) => {
      console.log(resp)
      idUsuario = resp.datos.data.id
      infoAgendar = {
       tipoCita: tipoCit,
       nombre: data.nombre,
       fecha : data.name
      }
      console.log(infoAgendar)

      if (infoAgendar) {
        this.usuariosService.agregarCita(infoAgendar).subscribe((resp: any) => {
          console.log(resp)
          if (resp) {
            this.mensajeRegistro = `Cita agendada ${resp}`
          }
        }, (error) => {
          this.mensajeRegistro = 'Error al agendar'
        })
      }

    })



  }

  // "tipoCita": "string",
  // "fecha": "string",
  // "usuarioId": "string"
}

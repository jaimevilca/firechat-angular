import { Component, OnInit } from '@angular/core';
import { ChatService } from "app/services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje: string = "";
  elemento: any;
  constructor(public chatService: ChatService) {
      
  }

  ngOnInit() {
    this.elemento = document.getElementById("app-mensajes");

    this.chatService.cargarMensajes()
        .subscribe( ()=> {
          console.log('Mensajes cargados');

          setTimeout( ()=> {
              this.elemento.scrollTop = this.elemento.scrollHeight;
          }, 0);
          
        });
  }


  enviar(){
    if(this.mensaje.length == 0){
      return;
    }

    this.chatService.agregarMensaje(this.mensaje)
        .then( () => console.log('Realizado'))
        .catch( error => console.log(error));

        this.mensaje = '';

    // console.log(this.mensaje);
  }

}

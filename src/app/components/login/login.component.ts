import { Component, OnInit } from '@angular/core';
import { ChatService } from "app/services/chat.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public chatService: ChatService) { }

  ngOnInit() {
  }

  login(proveedor: string){
    this.chatService.login(proveedor);
  }

}

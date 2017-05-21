import { Component } from '@angular/core';
import { ChatService } from "app/services/chat.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // chats: FirebaseListObservable<any[]>;

  constructor(public chatService: ChatService) {
    // this.chats = db.list('/chats');
  }

}

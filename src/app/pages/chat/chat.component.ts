import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

  users;
  messages = [];
  userLogged : string = ''; // sender
  receiver = ''

  constructor(private chatService : ChatService, private authService: AuthService){
  }

  ngOnInit(){
    this.authService.getSessionUserId().subscribe(id => this.userLogged = id)

    this.loadUsers();
  }

  loadUsers(){
    this.chatService.getUsers().subscribe({
      next: (res) => this.users = res,
      error: (err) => console.error(err)
    })
  }

  loadChat(_receiver){
    this.receiver = _receiver
    this.chatService.getConversation(this.userLogged, _receiver).subscribe(msgs => this.messages = msgs)
  }

  searchUser(event : string){
    this.chatService.getUsers().subscribe({
      next: (res) => {
        this.users = res.filter((user) => `${user?.firstName.toLowerCase()} ${user?.lastName.toLowerCase()}`.includes(event.toLowerCase()))
      },
      error: (err) => console.error(err)
    })
  }
}

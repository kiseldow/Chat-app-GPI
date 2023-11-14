import { Component, Input } from '@angular/core';
import { ChatService } from '../chat.service';
import { Message } from 'src/app/model/message.model';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {
  @Input() sender = '';
  @Input() receiver = '';

  constructor(private chatService: ChatService){}

  msg;

  sendMsg(){
    if(this.msg){
      let msg : Message = {
        message : this.msg,
        sender: this.sender,
        receiver: this.receiver,
        date: new Date()
      }
      this.chatService.sendMessage(msg).subscribe({
        next: (res)=> this.msg = '',
        error: (err) => err
      })      
    }
  }
}

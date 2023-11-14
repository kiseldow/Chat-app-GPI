import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { Message } from 'src/app/model/message.model';

@Injectable()
export class ChatService {

  constructor(private api: ApiService) { }

  getUsers() {
    return this.api.getUsers().pipe(
      map(user => {
        const ids = Object.keys(user);
        const res = ids.map(id => {
          return {
            ...user[id],
            id: id
          }
        })
        return res
      })
    );
  }

  deleteUser(id) {
    return this.api.deleteUser(id)
  }

  getConversation(sender, receiver){
    if(sender && receiver){
      return this.api.getMessages().pipe(
        map(msg => {
          const ids = Object.keys(msg);
          const res = ids.map(id => {
            return {
              ...msg[id]
            }
          })
          return res
        }),
        map(msgs => msgs.filter(msg => 
          (msg.sender == sender && msg.receiver == receiver)
          ||
          (msg.receiver == sender && msg.sender == receiver)
        ))
      )
    } else console.error('Manca un ID')
  }

  sendMessage(message : Message){
    return this.api.sendMessage(message)
  }
}
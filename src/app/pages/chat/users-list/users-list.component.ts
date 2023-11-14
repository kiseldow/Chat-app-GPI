import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  isAdmin = false;

  @Input() users;
  @Output() userSelected = new EventEmitter<any>();

  constructor(private router: Router, private chatService: ChatService){
    // this.isAdmin = true; // Attivare per eliminare dati sporchi
  }

  ngOnInit(){
  }


  // Per Admin, solo per ripulire i dati
  deleteUser(id){
    this.chatService.deleteUser(id).subscribe({
      next: () => {
      },
      error: () => {
        alert('Errore: utente non cancellato')
      }
    })
  }

  goToProfile(id){
    this.router.navigate(['profile', id])
  }

  openChat(id:string){
    this.userSelected.emit(id)
  }
}

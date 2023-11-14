import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss']
})
export class UsersSearchComponent {
  @Output() startUserSearch = new EventEmitter<string>();

  searchUser(event : string){
    this.startUserSearch.emit(event)
  }
}

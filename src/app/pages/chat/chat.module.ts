import { NgModule } from '@angular/core';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatService } from './chat.service';
import { UsersSearchComponent } from './users-search/users-search.component';


@NgModule({
  declarations: [
    ChatComponent,
    UsersListComponent,
    ChatInputComponent,
    ChatWindowComponent,
    UsersSearchComponent
  ],
  imports: [
    ChatRoutingModule,
    SharedModule
  ],
  providers: [ChatService]
})
export class ChatModule { }

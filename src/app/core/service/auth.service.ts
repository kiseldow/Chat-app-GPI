import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { BehaviorSubject, map } from 'rxjs';
import { ProfileService } from 'src/app/pages/profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sessionUserId = new BehaviorSubject<string>('');

  getSessionUserId() {
    return this.sessionUserId.asObservable();
  }

  constructor(private api: ApiService) { }

  getOfflineUsers() {
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
      }),
      map(users => users.filter(user => !user.isLogged))
    );
  }

  setSessionStatus(_id: string, _status: boolean) {
    return this.api.updatePartialUser({ id: _id, isLogged: _status })
  }

  setSession(id: string) {
    if(id){
      this.setSessionStatus(id, true).subscribe({
        next: (res) => this.sessionUserId.next(id),
        error: (err) => console.error('Impossibile aggiornare l\'utente: ', err)
      })
    }
  }

  resetSession(id: string) {
    if(id){
      this.setSessionStatus(id, false).subscribe({
        next: (res) => this.sessionUserId.next(''),
        error: (err) => console.error('Impossibile aggiornare l\'utente: ', err)
      })
    }
  }

  // Funzionalità da admin per settare tutti ad offline
  setOfflineUsers() {
    this.api.getUsers().pipe(
      map(user => {
        const ids = Object.keys(user);
        const res = ids.map(id => {
          return {
            ...user[id],
            id: id
          }
        })
        return res
      }),
      map(users => users.filter(user => user.isLogged))
    ).subscribe(users => {
      users.forEach(user => this.resetSession(user.id))
    })
  }
}

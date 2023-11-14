import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { ApiService } from './../api/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedUserId: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private api: ApiService) {}

  getUsers(): Observable<any[]> {
    return this.api.getUsers().pipe(
      map((user) => {
        const ids = Object.keys(user);
        const res = ids.map((id) => {
          return {
            ...user[id],
            id: id,
          };
        });
        return res;
      })
    );
  }

  getOfflineUsers(): Observable<any[]> {
    return this.getUsers().pipe(
      map((users) => users.filter((user) => !user.isLogged))
    );
  }

  setLogged(id) {
    this.getUsers().subscribe((users) => {
      const userLogged = users.find((user) => user.id === id);

      if (userLogged) {
        userLogged.isLogged = true;
        this.api.updateUser(userLogged).subscribe(() => {
          this.loggedUserId.next(id);
        });
      } else {
        console.error('Utente non trovato');
      }
    });
  }

  resetSession() {
    this.getUsers().subscribe((users) => {
      const userLogged = users.find(
        (user) => user.id === this.loggedUserId.getValue()
      );

      if (userLogged) {
        userLogged.isLogged = false;
        this.api.updateUser(userLogged).subscribe(() => {
          this.loggedUserId.next(null);
        });
      } else {
        console.error('Utente non trovato');
      }
    });
  }
}

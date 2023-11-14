import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userId;
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router){
    // this.isAdmin = true; // Attivare per eliminare dati sporchi
  }

  ngOnInit(){
    this.authService.getSessionUserId().subscribe(id =>
      this.userId = id
    )
  }

  logout(){
    this.authService.resetSession(this.userId)
    this.router.navigate([''])
  }

  setOffline(){
    this.authService.setOfflineUsers()
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  users = [];

  selectedUser = new FormControl<string>('', Validators.required);

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.authService.getOfflineUsers().subscribe((res) => this.users = res)
  }

  login(){
    if(this.selectedUser.valid){
      this.authService.setSession(this.selectedUser.value)
      this.router.navigate(['profile', this.selectedUser.value])
    }
  }

  newUser(){
    this.router.navigate(['profile'])
  }
}

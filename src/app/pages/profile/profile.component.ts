import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/model/contact';
import { User } from 'src/app/model/user';
import { ProfileService } from './profile.service';
import { ActivatedRoute, Router } from '@angular/router';

interface UserFormType {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  birthDate: FormControl<string | null>;
  isLogged: FormControl<boolean | null>;
  job: FormControl<string | null>;
  email: FormControl<string | null>;
  telephoneNumber: FormControl<string | null>;
  mobileNumber: FormControl<string | null>;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  // gestione apertura accordion
  public datiPersonaliOpenState: boolean;
  public datiContattoOpenState: boolean;

  photoUrl : string = './assets/user-profile.png';

  userId : string = '';

  public user: User = new User();
  // public contact: Contact = new Contact();

  userForm : FormGroup<UserFormType>;

  constructor(private profileService: ProfileService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params.id;

    // this.activatedRoute.params.subscribe(parameters =>{
      //   this.userId = parameters.id;
      // })

    this.userForm = new FormGroup<UserFormType>({
      firstName: new FormControl<string | null>('', Validators.required),
      lastName: new FormControl<string | null>('', Validators.required),
      birthDate: new FormControl<string | null>(''),
      isLogged: new FormControl<boolean | null>(false),
      job: new FormControl<string | null>(''),
      email: new FormControl<string | null>(''),
      telephoneNumber: new FormControl<string | null>(''),
      mobileNumber: new FormControl<string | null>('')
    })

    if(this.userId){
      this.profileService.getUser(this.userId).subscribe({
        next: (res) => {
          this.userForm.patchValue(res)
        },
        error: (err) => console.error(err)
      })
    }

    // Alternativa
    // if(this.userId){
    //   this.profileService.getUser(this.userId).subscribe({
    //     next: (res) => {
    //       this.initForm(res);
    //     },
    //     error: (err) => console.error(err)
    //   })
    // } else {
    //   this.initForm()
    // }

    /* dati per accordion */
    this.datiPersonaliOpenState = true;
    this.datiContattoOpenState = true;
  }

  initForm(res?){
    this.userForm = new FormGroup<UserFormType>({
      firstName: new FormControl<string | null>(this.userId ? res?.firstName : '', Validators.required),
      lastName: new FormControl<string | null>(this.userId ? res?.lastName : '', Validators.required),
      birthDate: new FormControl<string | null>(this.userId ? res?.birthDate : ''),
      isLogged: new FormControl<boolean | null>(this.userId ? res?.isLogged : false),
      job: new FormControl<string | null>(this.userId ? res?.job : ''),
      email: new FormControl<string | null>(this.userId ? res?.email : ''),
      telephoneNumber: new FormControl<string | null>(this.userId ? res?.telephoneNumber : ''),
      mobileNumber: new FormControl<string | null>(this.userId ? res?.mobileNumber : '')
    })
  }

  saveUser(){
    if(this.userId){
      this.profileService.updateUser({...this.userForm.value, id : this.userId}).subscribe({
        next: () => {
          console.log('ok')
        },
        error: () => {
          alert('Errore: utente non modifca')
        }
      })
    } else {
      this.profileService.createUser(this.userForm.value).subscribe({
        next: (res) => {
          this.router.navigate(['profile', res.name])
          // this.router.navigate(['chat'])
        },
        error: () => {
          alert('Errore: utente non creato')
        },
        complete: () => {
          console.log('Completato')
        }
      })
    }
  }

  deleteUser(){
    this.profileService.deleteUser(this.userId).subscribe({
      next: () => {
        console.log('ok')
        // TODO
      },
      error: () => {
        alert('Errore: utente non cancellato')
      }
    })
  }
}

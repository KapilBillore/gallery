import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ProfileUser } from 'src/app/models/profileUser';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    displayName : new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private usersService: UsersService ,private authService: AuthService,
    private router : Router) { }

  ngOnInit(): void {
  }

  submit(){

    if(!this.signUpForm.valid) return

    const { displayName , email , password } = this.signUpForm.value;

    this.authService.signUp(email, password).pipe(
      switchMap( creds =>
        this.usersService.createUser({ uid: creds.user.uid , email , displayName}))
    ).subscribe(
      () => this.router.navigate(['/gallery'])
    )


  }

}

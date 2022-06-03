import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService,
    private router : Router) { }

  ngOnInit(): void {
  }

  submit(){

    if(!this.loginForm.valid) return

    const { email , password} = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      () => {
        this.router.navigate(['/gallery'])
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authState$ = this.authService.currentUser$

  constructor(private authService: AuthService,
    private router:Router) { }

  ngOnInit(): void {
    console.log(this.authService.currentUser$)
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["/"]);
  }

}

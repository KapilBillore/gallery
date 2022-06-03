import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  login(email:string, password:any): Observable<any>{
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
    )
  }

  logout(){
    return this.auth.signOut();
  }

  signUp(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)) ;
  }
}

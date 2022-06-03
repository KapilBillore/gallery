import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { ProfileUser } from 'src/app/models/profileUser';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl(''),
    displayName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl('')
  });

  user$ = this.usersService.currentUser$;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.currentUser$
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });

      // Code to check if the user is logged in or not.
      // authState(this.auth).subscribe(res => {
      //   if (res && res.uid) {
      //     console.log('user is logged in');
      //   } else {
      //     console.log('user not logged in');
      //   }
      // });
  }

  submit(){
    const profileData = this.profileForm.value;
    this.usersService.updateUser(profileData).subscribe();
  }

  uploadFile(event: any, { uid }: ProfileUser) {
    this.usersService
      .updateProfileImage(event.target.files[0], `images/profile/${uid}`)
      .pipe(
        switchMap((photoURL) =>
          this.usersService.updateUser({
            uid,
            photoURL,
          })
        )
      )
      .subscribe();
  }
}

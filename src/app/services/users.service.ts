import { Injectable } from '@angular/core';
import  { doc, docData, Firestore, setDoc} from '@angular/fire/firestore'
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { updateDoc } from '@firebase/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { ProfileUser } from '../models/profileUser';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor( private firestore: Firestore , private authService : AuthService,
    private storage: Storage){
  }

  createUser(user : ProfileUser){
    const ref = doc(this.firestore , `users/${user.uid}`);
    return from(setDoc(ref , user));
  }

  updateUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }

  get currentUser$ () : Observable<ProfileUser | null> {
     return this.authService.currentUser$.pipe(
       switchMap(user => {
         if(!user?.uid) return of(null)

         // to get the user for particular uid
         const ref = doc(this.firestore , `users/${user.uid}`)
         return docData(ref) as Observable<ProfileUser>
       })
     )
  }

  updateProfileImage(image: File , path:string) : Observable<string>{
    const storageRef = ref(this.storage , path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap(
      (result) => getDownloadURL(result.ref)
    ))
  }
}

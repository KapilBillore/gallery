import { Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import {  from, Observable, switchMap } from 'rxjs';
import { GalleryImage } from '../models/galleryimage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  images$: Observable<GalleryImage[]>;

  constructor(private firestore: Firestore,
    private storage: Storage) {

      const collections = collection(firestore, 'gallery');
      this.images$ = collectionData(collections);


  }

  createImageRecord(image: GalleryImage) {
    const ref = doc(this.firestore, `gallery/${image.name}`);
    setDoc(ref, {
      name: image.name,
      photoURL: image.photoURL
    });
  }



  uploadFile(image: GalleryImage): Observable<string> {

    const storageRef = ref(this.storage, `images/gallery/${image.file.name}`);
    const uploadTask = from(uploadBytes(storageRef, image.file));

    return from(uploadTask.pipe(
      switchMap(result => getDownloadURL(result.ref))
    ))





  }
}

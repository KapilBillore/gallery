import { Component, OnInit } from '@angular/core';
import { concatMap, Observable, switchMap } from 'rxjs';
import { GalleryImage } from 'src/app/models/galleryimage';
import { ImageService } from 'src/app/services/image.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  galleryImage? : GalleryImage;
  files? : FileList;

  user$ = this.usersService.currentUser$
  images$ = this.imageService.images$

  constructor(private usersService : UsersService, private imageService : ImageService) { }

  ngOnInit(): void {

    this.images$.subscribe(data => console.log(data))
  }

  handleFiles(event: any){
    this.files =event.target.files;

  }


  uploadImages() {

    const filesToUpload = this.files;

    for (let i = 0; i < filesToUpload!.length; i++) {
      let file = filesToUpload!.item(i) ;

      this.galleryImage= new GalleryImage(file);

      this.imageService.uploadFile(this.galleryImage).subscribe(
        (photoURL) => {
          console.log(photoURL)
          this.galleryImage.photoURL=photoURL;
          this.galleryImage.name = file.name;

          this.imageService.createImageRecord(this.galleryImage)
        }
      )
  }

  }

}

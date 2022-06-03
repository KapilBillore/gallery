export class GalleryImage{
  name?:string;
  photoURL?:string;
  file?:File

  constructor(file:File){
    this.file=file;
  }

}

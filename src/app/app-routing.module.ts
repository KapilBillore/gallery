import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    component:LoginComponent
  },
  {
    path:"gallery",
    component:GalleryComponent
  },
  {
    path:"sign-up",
    component:SignUpComponent
  },
  {
    path:"profile",
    component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

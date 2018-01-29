import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotLoggedHomePage } from './not-logged-home';

@NgModule({
  declarations: [
    NotLoggedHomePage,
  ],
  imports: [
    IonicPageModule.forChild(NotLoggedHomePage),
  ],
})
export class NotSingedHomePageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotSingedHomePage } from './not-singed-home';

@NgModule({
  declarations: [
    NotSingedHomePage,
  ],
  imports: [
    IonicPageModule.forChild(NotSingedHomePage),
  ],
})
export class NotSingedHomePageModule {}

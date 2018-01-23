import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlesViewPage } from './articles-view';

@NgModule({
  declarations: [
    ArticlesViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticlesViewPage),
  ],
})
export class ArticlesViewPageModule {}

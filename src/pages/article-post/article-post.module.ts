import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlePostPage } from './article-post';

@NgModule({
  declarations: [
    ArticlePostPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticlePostPage),
  ],
})
export class ArticlePostPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserArticlesViewPage } from './user-articles-view';

@NgModule({
  declarations: [
    UserArticlesViewPage,
  ],
  imports: [
    IonicPageModule.forChild(UserArticlesViewPage),
  ],
})
export class UserArticlesViewPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssetsViewPage } from './assets-view';

@NgModule({
    declarations: [
        AssetsViewPage,
    ],
    imports: [
        IonicPageModule.forChild(AssetsViewPage),
    ],
})
export class AssetsViewPageModule {
}

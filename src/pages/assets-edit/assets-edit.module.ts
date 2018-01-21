import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssetsEditPage } from './assets-edit';

@NgModule({
    declarations: [
        AssetsEditPage,
    ],
    imports: [
        IonicPageModule.forChild(AssetsEditPage),
    ],
})
export class AssetsEditPageModule {
}

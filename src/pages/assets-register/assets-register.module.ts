import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssetsRegisterPage } from './assets-register';

@NgModule({
    declarations: [
        AssetsRegisterPage,
    ],
    imports: [
        IonicPageModule.forChild(AssetsRegisterPage),
    ],
})
export class AssetsRegisterPageModule {
}

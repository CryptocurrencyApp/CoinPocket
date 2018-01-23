import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AssetsViewPage } from "../pages/assets-view/assets-view";
import { AssetsEditPage } from "../pages/assets-edit/assets-edit";
import { ArticlesViewPage } from "../pages/articles-view/articles-view";
import { HttpClientModule } from "@angular/common/http";
import { RestProvider } from '../providers/rest/rest';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        AssetsViewPage,
        AssetsEditPage,
        ArticlesViewPage,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        AssetsViewPage,
        AssetsEditPage,
        ArticlesViewPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        RestProvider
    ]
})
export class AppModule {
}

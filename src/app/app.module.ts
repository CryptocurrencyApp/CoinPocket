import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'

import { MyApp } from './app.component'
import { HomePage } from '../pages/home/home'
import { ListPage } from '../pages/list/list'
import { NotSingedHomePage } from "../pages/not-singed-home/not-singed-home"
import { AssetsViewPage } from "../pages/assets-view/assets-view"
import { AssetsEditPage } from "../pages/assets-edit/assets-edit"

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { HttpClientModule } from "@angular/common/http"
import { RestProvider } from '../providers/rest/rest'
import { IonicStorageModule } from "@ionic/storage"

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        NotSingedHomePage,
        ListPage,
        AssetsViewPage,
        AssetsEditPage,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        NotSingedHomePage,
        ListPage,
        AssetsViewPage,
        AssetsEditPage,
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

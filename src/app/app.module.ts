import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'

import { MyApp } from './app.component'
import { HomePage } from '../pages/home/home'
import { ListPage } from '../pages/list/list'
import { NotLoggedHomePage } from "../pages/not-logged-home/not-logged-home"
import { AssetsViewPage } from "../pages/assets-view/assets-view"
import { AssetsEditPage } from "../pages/assets-edit/assets-edit"
import { ArticlesViewPage } from "../pages/articles-view/articles-view"
import { ArticlePostPage } from "../pages/article-post/article-post"
import { SignUpPage } from "../pages/sign-up/sign-up";
import { UrlProvider } from '../providers/url/url'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { HttpClientModule } from "@angular/common/http"
import { RestProvider } from '../providers/rest/rest'
import { IonicStorageModule } from "@ionic/storage"
import { AboutPage } from "../pages/about/about"
import { ToHashProvider } from "../providers/toHash/toHash"

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        NotLoggedHomePage,
        AboutPage,
        ListPage,
        AssetsViewPage,
        AssetsEditPage,
        ArticlesViewPage,
        ArticlePostPage,
        SignUpPage,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot({
            name: '__coin-pocket-storage',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        NotLoggedHomePage,
        AboutPage,
        ListPage,
        AssetsViewPage,
        AssetsEditPage,
        ArticlesViewPage,
        ArticlePostPage,
        SignUpPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        RestProvider,
        UrlProvider,
        ToHashProvider
    ]
})
export class AppModule {
}

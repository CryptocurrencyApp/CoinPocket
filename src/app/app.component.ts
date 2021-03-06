import { Component, ViewChild } from '@angular/core'
import { MenuController, Nav, Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

import { HomePage } from '../pages/home/home'
import { AssetsViewPage } from "../pages/assets-view/assets-view"
import { ArticlesViewPage } from "../pages/articles-view/articles-view"
import { AboutPage } from "../pages/about/about"
import { UserDetailPage } from "../pages/user-detail/user-detail"
import { UserArticlesViewPage } from "../pages/user-articles-view/user-articles-view"
import { Storage } from "@ionic/storage"

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav
    rootPage: any = HomePage
    userPages: Array<{ title: string, component: any }>
    mainPages: Array<{ title: string, component: any }>
    aboutPages: Array<{ title: string, component: any }>

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
                private storage: Storage, public menuCtrl: MenuController) {
        this.initializeApp()

        // used for an example of ngFor and navigation
        this.mainPages = [
            {title: 'Home', component: HomePage},
            {title: '総資産', component: AssetsViewPage},
            {title: 'キャッチアップ', component: ArticlesViewPage},
        ]

        this.userPages = [
            {title: 'プロフィール', component: UserDetailPage},
            {title: 'あなたの投稿一覧', component: UserArticlesViewPage},
        ]

        this.aboutPages = [
            {title: 'このアプリについて', component: AboutPage}
        ]
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault()
            this.splashScreen.hide()
        })
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component)
    }

    logout() {
        this.storage.set('isLogin', false)
        this.storage.set('userId', '')
        this.storage.set('evaluation', 	{"good":[],"bad":[]})

        this.menuCtrl.toggle()
        this.nav.setRoot(HomePage)
    }
}

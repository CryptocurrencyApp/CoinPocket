import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { Storage } from "@ionic/storage"

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
})
export class AboutPage {
    private isLogin: boolean

    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
        this.storage.set('isLogin', true)
        this.storage.get('isLogin').then(data => {
            this.isLogin = data
        })
    }

}

import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { AboutPage } from "../about/about"

/**
 * Generated class for the NotLoggedHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-not-singed-home',
    templateUrl: 'not-logged-home.html',
})
export class NotLoggedHomePage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    goSignUpPage() {
        // this.navCtrl.push(SignUpPage)
    }

    goHowToUsePage() {
        this.navCtrl.push(AboutPage)
    }
}

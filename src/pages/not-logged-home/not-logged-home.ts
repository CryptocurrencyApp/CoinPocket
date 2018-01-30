import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { AboutPage } from "../about/about"
import { ToHashProvider } from "../../providers/toHash/toHash"
import { RestProvider } from "../../providers/rest/rest"
import { Storage } from "@ionic/storage"
import { HomePage } from "../home/home"

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
    private email: string = ''
    private inputPassword: string = ''
    private hashedPassword: string
    private isError: boolean = false

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private toHashProvider: ToHashProvider, private restProvider: RestProvider,
                private storage: Storage) {
    }

    goSignUpPage() {
        // this.navCtrl.push(SignUpPage)
    }

    goHowToUsePage() {
        this.navCtrl.push(AboutPage)
    }

    login() {
        if (this.email == '' || this.inputPassword == '') {
            this.isError = true
            return
        }
        if (this.email.match(/.+@.+\..+/) == null) {
            this.isError = true
            return false
        }

        this.isError = false

        this.hashedPassword = this.toHashProvider.toSHA256(this.inputPassword)
        this.restProvider.postLogin(this.email, this.hashedPassword)
            .then(data => {
                this.storage.set('userId', data.userId)
                this.storage.set('isLogin', true)
                this.navCtrl.setRoot(HomePage)
            })
            .catch(err => {
                this.inputPassword = ''
                this.isError = true
            })
    }
}

import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { Storage } from "@ionic/storage"
import { NotSingedHomePage } from "../not-singed-home/not-singed-home"

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, private storage: Storage) {
        this.storage.set('isLogin', true)
        this.storage.get('isLogin').then(data => {
            if (!data) {
                this.navCtrl.push(NotSingedHomePage)
            }
        })
    }

}

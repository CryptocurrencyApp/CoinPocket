import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { RestProvider } from "../../providers/rest/rest"
import { Storage } from "@ionic/storage"

/**
 * Generated class for the UserDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-user-detail',
    templateUrl: 'user-detail.html',
})
export class UserDetailPage {
    private userId: string
    private userData: UserData

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private restProvider: RestProvider, private storage: Storage) {
        this.storage.set('userId', '123456') // TODO: いらなくなったら消す
        this.storage.get('userId').then(data => {
            this.userId = data
        }).then(() => {
            this.restProvider.getUserData(this.userId)
                .then((data) => {
                    this.userData = new UserData(data)
                })
        })

    }
}

class UserData {
    name: string
    userId: string
    mail: string
    sex: string
    birthday: string

    constructor(data: any) {
        this.name = data.name
        this.userId = data.user_id
        this.mail = data.mail
        this.sex = data.sex
        this.birthday = data.birthday
    }
}
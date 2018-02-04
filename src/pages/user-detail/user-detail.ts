import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { RestProvider } from "../../providers/rest/rest"
import { Storage } from "@ionic/storage"
import { UserData } from "../../interfaces/UserData"
import { UserEditPage } from "../user-edit/user-edit"

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
    private userData: UserData = {
        name: null,
        user_id: null,
        mail: null,
        sex: null,
        birthday: null
    }
    private userId: string

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private restProvider: RestProvider, private storage: Storage) {
    }

    ionViewDidLoad() {
        this.storage.set('userId', '123456') // TODO: いらなくなったら消す
        this.storage.get('userId').then(data => {
            this.userId = data
        }).then(() => {
            this.restProvider.getUserData(this.userId)
                .then((data) => {
                    this.userData = <UserData>data[0]
                    this.userData.sex = this.userData.sex == 'man' ? '男性' : '女性'
                })
        })
    }

    goUserEditPage() {
        this.navCtrl.push(UserEditPage)
    }
}

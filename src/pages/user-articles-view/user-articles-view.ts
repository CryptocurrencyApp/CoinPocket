import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { RestProvider } from "../../providers/rest/rest"
import { Storage } from "@ionic/storage"

/**
 * Generated class for the UserArticlesViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-user-articles-view',
    templateUrl: 'user-articles-view.html',
})
export class UserArticlesViewPage {
    private userId: string
    private articles: Array<any>

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private restProvider: RestProvider, private storage: Storage) {
        this.storage.set('userId', 'gatcha2') // TODO: いらなくなったら消す
        this.storage.get('userId').then(data => {
            this.userId = data
        }).then(() => {
            this.restProvider.getArticlesOfUser(this.userId)
                .then(data => {
                    this.articles = data
                    this.articles = this.articles.map(element => {
                        element.reliability = Math.round(element.good / (element.good + element.bad) * 100)
                        return element
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }
}

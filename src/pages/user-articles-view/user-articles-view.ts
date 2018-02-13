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
    private articles: Array<any> = []
    private isNetworkError: boolean

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private restProvider: RestProvider, private storage: Storage) {
        this.storage.get('userId').then(data => {
            this.userId = data
        }).then(() => {
            this.restProvider.getArticlesOfUser(this.userId)
                .then(data => {
                    this.articles = data
                    this.articles = this.articles.map(element => {
                        element.didGoodPush = false
                        element.didBadPush = false
                        let date = new Date(element.created_at)
                        element.created_at = date.toLocaleString()

                        // 表示される時間を加工 TODO: メソッドに詰めたい
                        let now = new Date().getTime()
                        let postedTime = new Date(element.created_at).getTime()
                        element.howLongAgo = Math.floor((now - postedTime) / (1000 * 60 * 60))
                        element.unitOfTime = '時間前'

                        if (element.howLongAgo <= 0) {
                            element.howLongAgo = 1
                            element.unitOfTime = '時間以内'
                        }
                        else if (element.howLongAgo > 24) {
                            element.howLongAgo = Math.floor(element.howLongAgo / 24)
                            element.unitOfTime = '日前'
                        }

                        // Good/Bad比率の計算
                        // 0除算防止
                        if (element.good + element.bad == 0) {
                            element.reliability = 50
                        } else {
                            element.reliability = Math.round(element.good / (element.good + element.bad) * 100)
                        }
                        return element
                    })
                })
                .catch(err => {
                    this.isNetworkError = true
                })
        })
    }
}

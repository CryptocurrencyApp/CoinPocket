import { Component } from '@angular/core'
import { IonicPage, NavController, ToastController } from 'ionic-angular'
import { ArticlePostPage } from "../article-post/article-post"
import { RestProvider } from "../../providers/rest/rest"
import { UrlProvider } from "../../providers/url/url"
import { Storage } from "@ionic/storage"

@IonicPage()
@Component({
    selector: 'page-articles-view',
    templateUrl: 'articles-view.html',
})
export class ArticlesViewPage {
    articles: any
    evaluation: any
    isNetworkError: boolean = false

    constructor(public navCtrl: NavController, private storage: Storage, private restProvider: RestProvider, private urlProvider: UrlProvider, private toastCtrl: ToastController) {
    }

    ionViewWillEnter() {
        this.storage.get('evaluation').then(data => {
            // storage['evaluation']がない場合新規作成
            if (data == null) {
                this.storage.set('evaluation', {'good': [], 'bad': []})
            }
        }).then( () => {
            this.storage.get('evaluation').then(data => {
                this.evaluation = data
            }).then( () => {
                this.restProvider.getArticles()
                    .then(data => {
                        this.articles = data
                    })
                    .then(() => {
                        this.articles = this.articles.map(element => {
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
                    .catch(() => {
                        this.isNetworkError = true
                    })
            })
        })
    }

        goArticlePostPage() {
        this.navCtrl.push(ArticlePostPage)
    }

    openUrl(url: string) {
        this.urlProvider.openUrl(url)
    }

    toggleGood(article: any) {
        let id = article.id
        article.didGoodPush = !article.didGoodPush

            this.storage.get('evaluation').then(data => {
            // goodの追加か取り消しかを判断
            let is_add = data['good'].indexOf(id) == -1
            this.restProvider.toggleGood(id, is_add)
                .then(() => {
                    let toast
                    if (is_add) {
                        toast = this.toastCtrl.create({
                            message: "Goodしました",
                            duration: 2000
                        })
                        data['good'].push(id)
                    } else {
                        toast = this.toastCtrl.create({
                            message: "Goodを取り消しました",
                            duration: 2000
                        })
                        data['good'].splice([data['good'].indexOf(id)], 1)
                    }
                    article.good += is_add ? 1 : -1
                    this.storage.set('evaluation', data)
                    this.evaluation = data
                    toast.present()
                })
                .catch(() => {
                    let toast = this.toastCtrl.create({
                        message: "Goodに失敗しました。通信環境をご確認ください",
                        duration: 2000
                    })
                    toast.present()
                })
        })
    }

    toggleBad(article: any) {
        let id = article.id
        article.didBadPush = !article.didBadPush

        this.storage.get('evaluation').then(data => {
            // badの追加か取り消しかを判断
            let is_add = data['bad'].indexOf(id) == -1
            this.restProvider.toggleBad(id, is_add)
                .then(() => {
                    let toast
                    if (is_add) {
                        toast = this.toastCtrl.create({
                            message: "Badしました",
                            duration: 2000
                        })
                        data['bad'].push(id)
                    } else {
                        toast = this.toastCtrl.create({
                            message: "Badを取り消しました",
                            duration: 2000
                        })
                        data['bad'].splice([data['bad'].indexOf(id)], 1)
                    }
                    article.bad += is_add ? 1 : -1
                    this.storage.set('evaluation', data)
                    this.evaluation = data
                    toast.present()
                })
                .catch(() => {
                    let toast = this.toastCtrl.create({
                        message: "Badに失敗しました。通信環境をご確認ください",
                        duration: 2000
                    })
                    toast.present()
                })
        })
    }
}

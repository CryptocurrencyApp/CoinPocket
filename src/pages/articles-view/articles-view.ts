import {Component} from '@angular/core'
import {IonicPage, NavController, ToastController} from 'ionic-angular'
import {ArticlePostPage} from "../article-post/article-post"
import {RestProvider} from "../../providers/rest/rest"
import {UrlProvider} from "../../providers/url/url"
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
    selector: 'page-articles-view',
    templateUrl: 'articles-view.html',
})
export class ArticlesViewPage {
    articles: any

    constructor(public navCtrl: NavController, private storage: Storage, private restProvider: RestProvider, private urlProvider: UrlProvider, private toastCtrl: ToastController) {
        // storage['evaluation']がない場合新規作成
        if (!!this.storage.get('evalueation')) {
            this.storage.set('evaluation', {'good': [], 'bad': []})
        }
        this.restProvider.getArticles()
            .then(data => {
                this.articles = data
            })
            .then( () => {
                this.articles = this.articles.map(element => {
                    element.reliability = Math.round(element.good / (element.good + element.bad) * 100)
                    return element
                })
            })
    }

    goArticlePostPage() {
        this.navCtrl.push(ArticlePostPage)
    }

    openUrl(url: string) {
        this.urlProvider.openUrl(url)
    }

    toggleGood(id: string) {
        this.storage.get('evaluation').then(data => {
            // goodの追加か取り消しかを判断
            let is_add = data['good'].indexOf(id) == -1
            this.restProvider.toggleGood(id, is_add)
                .then(() => {
                    let toast
                    if(is_add) {
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
                    this.storage.set('evaluation', data)
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

    toggleBad(id: string) {
        this.storage.get('evaluation').then(data => {
            // badの追加か取り消しかを判断
            let is_add = data['bad'].indexOf(id) == -1
            this.restProvider.toggleBad(id, is_add)
                .then(() => {
                    let toast
                    if(is_add) {
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
                    this.storage.set('evaluation', data)
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

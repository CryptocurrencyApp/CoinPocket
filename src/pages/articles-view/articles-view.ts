import {Component} from '@angular/core'
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular'
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
        if (this.storage.get('evalueation')) {
            this.storage.set('evaluation', {'good': [], 'bad': []})
        }
        this.restProvider.getArticles()
            .then(data => {
                this.articles = data
            })
    }

    goArticlePostPage() {
        this.navCtrl.push(ArticlePostPage)
    }

    openUrl(url: string) {
        this.urlProvider.openUrl(url)
    }

    changeGood(id: string) {
        this.storage.get('evaluation').then(data => {
            // 投稿に対して新規のgood
            if (!data['good'][id]) {
                this.restProvider.addGood(id)
                    .then(() => {
                        let toast = this.toastCtrl.create({
                            message: "Goodしました",
                            duration: 2000
                        })
                        toast.present()
                    })
                    .catch(() => {
                        let toast = this.toastCtrl.create({
                            message: "Goodに失敗しました。通信環境をご確認ください",
                            duration: 2000
                        })
                        toast.present()
                    })
            // goodの変更時(1つの投稿に対してgoodが2回以上押された時)
            } else {
                this.restProvider.toggleGood(id)
                    .then((data) => {
                        var toast
                        if(data['is_add'] == true) {
                            toast = this.toastCtrl.create({
                                message: "Goodしました",
                                duration: 2000
                            })
                        } else {
                            toast = this.toastCtrl.create({
                                message: "Goodを取り消しました",
                                duration: 2000
                            })
                        }
                        toast.present()
                    })
                    .catch(() => {
                        let toast = this.toastCtrl.create({
                            message: "Goodに失敗しました。通信環境をご確認ください",
                            duration: 2000
                        })
                        toast.present()
                    })
            }
        })
    }

    toggleBad(id: string) {
        this.restProvider.toggleBad(id)
            .then(() => {
                let toast = this.toastCtrl.create({
                    message: "Badしました",
                    duration: 2000
                })
                toast.present()
            })
            .catch(() => {
                let toast = this.toastCtrl.create({
                    message: "Badに失敗しました。通信環境をご確認ください",
                    duration: 2000
                })
                toast.present()
            })
    }
}

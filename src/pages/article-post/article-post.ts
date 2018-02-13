import { Component } from '@angular/core'
import { IonicPage, NavController, ToastController } from 'ionic-angular'
import { RestProvider } from "../../providers/rest/rest"
import { ArticlesViewPage } from "../articles-view/articles-view"
import { Storage } from "@ionic/storage"

@IonicPage()
@Component({
    selector: 'page-article-post',
    templateUrl: 'article-post.html',
})
export class ArticlePostPage {
    url: string = ''
    comment: string = ''
    userId: string = ''
    count: number = 0
    isError: boolean = false

    constructor(public navCtrl: NavController, private restProvider: RestProvider, private toastCtrl: ToastController, private storage: Storage) {
        this.storage.get('userId').then(data => {
            this.userId = data
        })
    }

    changeCount() {
        this.count = this.comment.length
    }

    postArticle() {
        this.isError = false
        if (this.url == '' || this.comment == ''
            || this.url.match('http(s)?://([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?') == null
            || this.comment.length > 100) {
            this.isError = true
            return
        }

        this.restProvider.postArticle(this.url, this.comment, this.userId)
            .then(() => {
                let toast = this.toastCtrl.create({
                    message: "投稿に成功しました。",
                    duration: 2000
                })
                toast.present()
            })
            .then(() => {
                this.navCtrl.setRoot(ArticlesViewPage)
            })
            .catch(() => {
                let toast = this.toastCtrl.create({
                    message: "投稿に失敗しました。通信環境をご確認ください",
                    duration: 2000
                })
                toast.present()
            })
    }
}

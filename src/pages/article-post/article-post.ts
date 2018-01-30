import {Component} from '@angular/core'
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular'
import {RestProvider} from "../../providers/rest/rest";
import {ArticlesViewPage} from "../articles-view/articles-view";

@IonicPage()
@Component({
    selector: 'page-article-post',
    templateUrl: 'article-post.html',
})
export class ArticlePostPage {
    url: string
    comment: string
    count: number
    constructor(public navCtrl: NavController, private restProvider: RestProvider, private toastCtrl: ToastController) {
        this.count = 0
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ArticlePostPage');
    }

    changeCount() {
        this.count = this.comment.length
    }

    postArticle() {
        this.restProvider.postArticle(this.url, this.comment)
            .then(() => {
                let toast = this.toastCtrl.create({
                    message: "投稿に成功しました。",
                    duration: 2000
                })
                toast.present()
            })
            .then( () => {
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

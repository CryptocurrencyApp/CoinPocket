import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ArticlePostPage } from "../article-post/article-post";
import { RestProvider } from "../../providers/rest/rest";
import { UrlProvider } from "../../providers/url/url";

/**
 * Generated class for the ArticlesViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-articles-view',
  templateUrl: 'articles-view.html',
})
export class ArticlesViewPage {
  articles: any;
  sortMode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private restProvider: RestProvider, private urlProvider: UrlProvider, private toastCtrl: ToastController) {
    this.restProvider.getArticles()
        .then(data => {
          this.articles = data;
        })
  }

  goArticlePostPage() {
    this.navCtrl.push(ArticlePostPage)
  }

  openUrl(url: string) {
    this.urlProvider.openUrl(url)
  }

  toggleGood(id: string) {
    this.restProvider.toggleGood(id)
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

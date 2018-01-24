import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private restProvider: RestProvider, private urlProvider: UrlProvider) {
    this.restProvider.getArticles()
        .then(data => {
          this.articles = data;
        }).then(() => {
          console.dir(this.articles);
        })
  }
  goArticlePostPage() {
    this.navCtrl.push(ArticlePostPage)
  }
  openUrl(url: string) {
    this.urlProvider.openUrl(url)
  }
}

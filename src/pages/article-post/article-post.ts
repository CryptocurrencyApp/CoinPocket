import {Component} from '@angular/core'
import {IonicPage, NavController, NavParams} from 'ionic-angular'

@IonicPage()
@Component({
    selector: 'page-article-post',
    templateUrl: 'article-post.html',
})
export class ArticlePostPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ArticlePostPage');
    }

}

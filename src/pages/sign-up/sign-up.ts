import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ArticlesViewPage} from "../articles-view/articles-view";

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  name: string = ''
  sex: string = ''
  birthday: string = ''
  email: string = ''
  password: string = ''
  confirmationPassword = ''
  isError: boolean = false
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signUp() {
      this.isError = false
      if(this.name == '' || this.sex == '' || this.birthday == '' || this.email == '' || this.password == ''
          || this.url.match('https?://[\w/:%#\$&\?\(\)~\.=\+\-]+') == null
          || this.comment.length > 100) {
          this.isError = true
          return
      }
      let hasshedPassword = "" //passwordをhashする
      this.restProvider.signUp(this.name, this.sex, this.birthday, this.email, hashedPassword)
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

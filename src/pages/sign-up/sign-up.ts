import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ArticlesViewPage} from "../articles-view/articles-view";
import {ToHashProvider} from "../../providers/toHash/toHash";
import {RestProvider} from "../../providers/rest/rest";

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
  confirmationPassword: string = ''
  errorList: string[] = []
  constructor(public navCtrl: NavController, public navParams: NavParams, private restProvider: RestProvider, private toastCtrl: ToastController, private toHashProvider: ToHashProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signUp() {
      this.errorList = []
      if(this.name == '' || this.sex == '' || this.birthday == '' || this.email == '' || this.password == '' || this.confirmationPassword == '') {
          this.errorList.push('未入力項目があります。')
      }
      if(this.email.match(/.+@.+\..+/) == null) {
          this.errorList.push('メールアドレスが不正です。')
      }
      if(this.password != this.confirmationPassword) {
          this.errorList.push('確認パスワードが不正です。')
      }
      if(this.errorList.length != 0) {
          return
      }
      let hashedPassword = this.toHashProvider.toSHA256(this.password)
      this.restProvider.signUp(this.name, this.sex, this.birthday, this.email, hashedPassword)
          .then(() => {
              let toast = this.toastCtrl.create({
                  message: "ユーザ作成に成功しました。",
                  duration: 2000
              })
              toast.present()
          })
          .then( () => {
              this.navCtrl.setRoot(ArticlesViewPage)
          })
          .catch(() => {
              let toast = this.toastCtrl.create({
                  message: "ユーザ登録に失敗しました。通信環境をご確認ください",
                  duration: 2000
              })
              toast.present()
          })
  }
}

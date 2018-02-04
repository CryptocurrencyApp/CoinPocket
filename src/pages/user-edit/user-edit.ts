import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {ToHashProvider} from "../../providers/toHash/toHash";
import {RestProvider} from "../../providers/rest/rest";
import { Storage } from "@ionic/storage"
import {UserData} from "../../interfaces/UserData";
import {ArticlesViewPage} from "../articles-view/articles-view";

@IonicPage()
@Component({
  selector: 'page-user-edit',
  templateUrl: 'user-edit.html',
})
export class UserEditPage {
    user_id: string
    userData: UserData = {
        name: null,
        user_id: null,
        mail: null,
        sex: null,
        birthday: null
    }
    password: string = ''
    confirmationPassword: string = ''
    errorList: string[] = []

    constructor(public navCtrl: NavController, private restProvider: RestProvider, private toastCtrl: ToastController, private toHashProvider: ToHashProvider, private storage: Storage) {
        this.storage.set('userId', '123456') // TODO: いらなくなったら消す
        this.storage.get('userId').then(data => {
            this.user_id = data
        }).then(() => {
            this.restProvider.getUserData(this.user_id)
                .then((data) => {
                    this.userData = <UserData>data[0]
                    // 時差修正
                    let birthday: Date = new Date(this.userData.birthday)
                    birthday.setHours(birthday.getHours() + 9)
                    this.userData.birthday = birthday.toISOString()
                })
        })
    }

    putUser() {
        this.errorList = []
        if(this.userData.name == '' || this.userData.sex == '' || this.userData.birthday == '' || this.userData.mail == '') {
            this.errorList.push('未入力項目があります。')
        }
        if(this.userData.mail.match(/.+@.+\..+/) == null) {
            this.errorList.push('メールアドレスが不正です。')
        }
        if(this.password != this.confirmationPassword) {
            this.errorList.push('確認パスワードが不正です。')
        }
        if(this.errorList.length != 0) {
            return
        }
        // password更新がない場合はnull
        let hashedPassword = this.password != '' ? this.toHashProvider.toSHA256(this.password) : null
        this.restProvider.putUser(this.user_id, this.userData.name, this.userData.sex, this.userData.birthday, this.userData.mail, hashedPassword)
            .then(() => {
                let toast = this.toastCtrl.create({
                    message: "ユーザ編集に成功しました。",
                    duration: 2000
                })
                toast.present()
            })
            .then( () => {
                this.navCtrl.setRoot(ArticlesViewPage)
            })
            .catch(() => {
                let toast = this.toastCtrl.create({
                    message: "ユーザ編集に失敗しました。通信環境をご確認ください",
                    duration: 2000
                })
                toast.present()
            })
    }
}
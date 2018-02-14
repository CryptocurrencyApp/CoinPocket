import {Component} from '@angular/core'
import {IonicPage, NavController, ToastController} from 'ionic-angular'
import {ArticlesViewPage} from '../articles-view/articles-view'
import {ToHashProvider} from '../../providers/toHash/toHash'
import {RestProvider} from '../../providers/rest/rest'
import {UserData} from '../../interfaces/UserData'
import {Storage} from '@ionic/storage'

@IonicPage()
@Component({
    selector: 'page-sign-up',
    templateUrl: 'sign-up.html',
})
export class SignUpPage {
    userData: UserData = {
        name: '',
        user_id: '',
        mail: '',
        sex: '',
        birthday: null
    }
    password: string = ''
    confirmationPassword: string = ''
    errorList: string[] = []

    constructor(public navCtrl: NavController, private restProvider: RestProvider, private toastCtrl: ToastController, private toHashProvider: ToHashProvider, private storage: Storage) {
    }

    signUp() {
        this.errorList = []
        if (this.userData.name == '' || this.userData.sex == '' || this.userData.birthday == null || this.userData.mail == '' || this.password == '' || this.confirmationPassword == '') {
            this.errorList.push('未入力項目があります。')
        }
        if (this.userData.mail.match(/.+@.+\..+/) == null) {
            this.errorList.push('メールアドレスが不正です。')
        }
        if (this.password != this.confirmationPassword) {
            this.errorList.push('確認パスワードが不正です。')
        }
        if (this.errorList.length != 0) {
            return
        }
        let hashedPassword = this.toHashProvider.toSHA256(this.password)
        this.userData.birthday = new Date(this.userData.birthday)
        this.restProvider.signUp(this.userData, hashedPassword)
            .then(() => {
                this.restProvider.postLogin(this.userData.mail, hashedPassword)
                    .then(data => {
                        this.storage.set('userId', data.id)
                        this.storage.set('isLogin', true)
                        let toast = this.toastCtrl.create({
                            message: 'ユーザ作成に成功しました。',
                            duration: 2000
                        })
                        toast.present()
                        this.navCtrl.setRoot(ArticlesViewPage)
                    })
                    .catch(() => {
                        let toast = this.toastCtrl.create({
                            message: 'ユーザ登録に失敗しました。通信環境をご確認ください',
                            duration: 2000
                        })
                        toast.present()
                    })
            })
    }
}

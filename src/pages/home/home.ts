import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { Storage } from "@ionic/storage"
import { RestProvider } from "../../providers/rest/rest"

import { NotLoggedHomePage } from "../not-logged-home/not-logged-home"
import { AssetsViewPage } from "../assets-view/assets-view"
import { ArticlesViewPage } from "../articles-view/articles-view"

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    private isNetworkError: boolean = false

    private userHasCoins: Array<any> = []
    private userId: string

    private compareModeList: string[] = ['1h', '24h', '7d']
    private compareModeIndex: number = 0
    private compareMode: string = this.compareModeList[this.compareModeIndex]

    constructor(public navCtrl: NavController, private storage: Storage, private restProvider: RestProvider) {
        this.storage.get('isLogin').then(data => {
            if (!data) {
                this.navCtrl.push(NotLoggedHomePage)
            }
        })
        this.storage.get('userId').then(data => {
            this.userId = data
        })
    }

    ionViewWillEnter() {
        Promise.all([this.restProvider.getRates(), this.restProvider.getAssets(this.userId)])
            .then(data => {
                let rates: Array<any> = data[0]
                let assets: Array<any> = data[1]

                this.userHasCoins = assets.map(element => {
                    return rates.find(rate => {
                        return element.id == rate.id
                    })
                })

                this.userHasCoins = this.formatUserHasCoins(this.userHasCoins)
            })
            .catch(err => {
                this.isNetworkError = true
            })
    }

    changeCompareMode() {
        if (this.compareModeIndex < 2) {
            this.compareModeIndex++
        } else {
            this.compareModeIndex = 0
        }
        this.compareMode = this.compareModeList[this.compareModeIndex]

        this.userHasCoins = this.formatUserHasCoins(this.userHasCoins)
    }

    goAssetsView() {
        this.navCtrl.setRoot(AssetsViewPage)
    }

    goCatchUp() {
        this.navCtrl.setRoot(ArticlesViewPage)
    }

    private formatUserHasCoins(userHasCoins: Array<any>) {
        return userHasCoins.map(element => {
            element.price_jpy = Math.round(element.price_jpy * 100) / 100

            switch (this.compareMode) {
                case '1h':
                    element.percent = element.percent_change_1h
                    break
                case '24h':
                    element.percent = element.percent_change_24h
                    break
                case '7d':
                    element.percent = element.percent_change_7d
                    break
            }
            return element
        })
    }
}

import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { Storage } from "@ionic/storage"
import { RestProvider } from "../../providers/rest/rest"

import { NotSingedHomePage } from "../not-singed-home/not-singed-home"
import { AssetsViewPage } from "../assets-view/assets-view"

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    private userHasCoins: Array<any> = []
    private compareModeList: string[] = ['1h', '24h', '7d']
    private compareModeIndex: number = 0
    private compareMode: string = this.compareModeList[this.compareModeIndex]

    constructor(public navCtrl: NavController, private storage: Storage, private restProvider: RestProvider) {
        this.storage.set('isLogin', true)
        this.storage.get('isLogin').then(data => {
            if (!data) {
                this.navCtrl.push(NotSingedHomePage)
            }
        })
    }

    ionViewWillEnter() {
        Promise.all([this.restProvider.getRates(), this.restProvider.getAssets()])
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
        this.navCtrl.push(AssetsViewPage)
    }

    goCatchUp() {
        // this.navCtrl.push()
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

import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { RestProvider } from "../../providers/rest/rest"

/**
 * Generated class for the AssetsEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-assets-edit',
    templateUrl: 'assets-edit.html',
})
export class AssetsEditPage {
    private selectableCoinList: any
    private matchedCoinList: any
    private timeoutId: number
    private isInput: boolean

    constructor(public navCtrl: NavController, public navParams: NavParams, private restProvider: RestProvider) {
        this.restProvider.getSelectableCoinList()
            .then(data => {
                this.selectableCoinList = data
            })
    }

    getInputCoinName(coinName: string) {
        const timeoutMS = 400
        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(() => {
            // timeoutMS秒間の入力待機後、画面に描画される
            this.filteringCoinList(coinName.toLowerCase())
            this.isInput = coinName != ""
        }, timeoutMS)
    }

    private filteringCoinList(input: string) {
        const rawCoinList = this.selectableCoinList

        this.matchedCoinList = rawCoinList.filter(element => {
            return element.id.toLowerCase().indexOf(input) > -1 ||
                element.name.toLowerCase().indexOf(input) > -1 ||
                element.symbol.toLowerCase().indexOf(input) > -1
        })
    }
}

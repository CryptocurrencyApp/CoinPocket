import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { AssetsEditPage } from "../assets-edit/assets-edit"
import { RestProvider } from "../../providers/rest/rest"

/**
 * Generated class for the AssetsViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-assets-view',
    templateUrl: 'assets-view.html',
})
export class AssetsViewPage {
    information: any
    total: number
    viewMode: string

    constructor(public navCtrl: NavController, public navParams: NavParams, private restProvider: RestProvider) {
        this.restProvider.getAssets()
            .then(data => {
                this.information = data
            }).then(() => {
            this.information = this.information.map(element => {
                let temp = element.amount * element.price_jpy * 100
                element.jpy = Math.round(temp) / 100
                return element
            })

            this.total = 0
            this.information.forEach(element => {
                this.total += element.jpy
            })
            this.total = Math.round(this.total)

            this.viewMode = 'jpy'
        })
    }

    addComma(value: number) {
        return String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    goAssetsEditPage() {
        this.navCtrl.push(AssetsEditPage)
    }

    switchAssets() {
        this.viewMode == 'jpy' ? this.viewMode = 'coin' : this.viewMode = 'jpy'
    }
}

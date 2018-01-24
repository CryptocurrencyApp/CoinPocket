import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
    baseUrl = 'http://localhost:3000'

    constructor(public http: HttpClient) {
        console.log('Hello RestProvider Provider')
    }

    getAssets() {
        return new Promise(resolve => {
            this.http.get(this.baseUrl + '/assets')
                .subscribe(data => {
                    resolve(data)
                }, err => {
                    console.log(err)
                })
        })
    }

    deleteAsset(id: string) {
        return new Promise((resolve, reject) => {
            this.http.delete(this.baseUrl + '/assets/' + id)
                .subscribe(data => {
                    resolve(data)
                }, err => {
                    reject(err)
                })
        })
    }

    getSelectableCoinList() {
        return new Promise(resolve => {
            this.http.get(this.baseUrl + '/coinIds')
                .subscribe(data => {
                    resolve(data)
                }, err => {
                    console.log(err)
                })
        })
    }
}

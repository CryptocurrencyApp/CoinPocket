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
    }

    getAssets() {
        let promise: Promise<Array<any>>

        promise = new Promise((resolve, reject) => {
            this.http.get(this.baseUrl + '/assets' + '?_sort=amount&_order=asc') // FIXME: ここのQueryStringはMock用
                .subscribe(data => {
                    resolve(<Array<any>>data)
                }, err => {
                    reject(err)
                })
        })

        return promise
    }

    postAsset(id: string, amount: number) {
        return new Promise((resolve, reject) => {
            this.http.post(this.baseUrl + '/assets', {
                amount: amount,
                id: id,
            })
                .subscribe(data => {
                    resolve(data)
                }, err => {
                    reject(err)
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

    putAsset(id: string, amount: number) {
        return new Promise((resolve, reject) => {
            this.http.put(this.baseUrl + '/assets/' + id, {
                amount: amount,
                id: id,
            }).subscribe(() => {
                resolve()
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

    getRates() {
        let promise: Promise<Array<any>>

        promise = new Promise((resolve, reject) => {
            this.http.get(this.baseUrl + '/rates')
                .subscribe(data => {
                    resolve(<Array<any>>data)
                }, err => {
                    reject(err)
                })
        })

        return promise
    }

    getArticles() {
        return new Promise((resolve, reject) => {
            this.http.get(this.baseUrl + '/articles')
                .subscribe(data => {
                    resolve(data)
                }, err => {
                    reject(err)
                })
        })
    }

    postLogin(email: string, hashedPassword: string) {
        let promise: Promise<any>

        promise = new Promise((resolve, reject) => {
            this.http.post(this.baseUrl + '/login', {
                email: email,
                password: hashedPassword
            }).subscribe(data => {
                resolve(data)
            }, err => {
                reject(err)
            })
        })

        return promise
    }

    toggleGood(id: string, is_add: boolean) {
        return new Promise((resolve, reject) => {
            this.http.put(this.baseUrl + '/articles/' + id + '/good', {
                id: id,
                is_add: is_add,
            })
                .subscribe(data => {
                    resolve(data)
                }, err => {
                    reject(err)
                })
        })
    }

    toggleBad(id: string, is_add: boolean) {
        return new Promise((resolve, reject) => {
            this.http.put(this.baseUrl + '/articles/' + id + '/bad', {
                id: id,
                is_add: is_add,
            })
                .subscribe(data => {
                    resolve(data)
                }, err => {
                    reject(err)
                })
        })
    }

    // PostArticlePage

    postArticle(url: string, comment: string) {
        return new Promise((resolve, reject) => {
            this.http.post(this.baseUrl + '/articles', {
                url: url,
                comment: comment,
            })
                .subscribe(data => {
                    resolve(data)
                }, err => {
                    reject(err)
                })
        })
    }
}

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {UserData} from "../../interfaces/UserData";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
    baseUrl = 'http://localhost:8080'

    constructor(public http: HttpClient) {
    }

    getUserData(userId: string) {
        let promise: Promise<Array<any>>

        promise = new Promise((resolve, reject) => {
            this.http.get(this.baseUrl + '/users/' + userId)
                .subscribe(data => {
                    resolve(<Array<any>>data)
                }, err => {
                    reject(err)
                })
        })

        return promise
    }

    putUser(user_id: string, name: string, sex: string, birthday: Date, mail: string, hashedPassword: string) {
        return new Promise((resolve, reject) => {
            this.http.put(this.baseUrl + '/users/' + user_id, {
                name: name,
                sex: sex,
                birthday: birthday,
                mail: mail,
                password: hashedPassword
            })
                .subscribe(() => {
                    resolve()
                }, err => {
                    reject(err)
                })
        })
    }

    getAssets(userId: string) {
        let promise: Promise<Array<any>>

        promise = new Promise((resolve, reject) => {
            this.http.get(this.baseUrl + '/assets/' + userId)
                .subscribe(data => {
                    resolve(<Array<any>>data)
                }, err => {
                    reject(err)
                })
        })

        return promise
    }

    postAsset(userId: string, coinId: string, amount: string) {
        return new Promise((resolve, reject) => {
            this.http.post(this.baseUrl + '/assets', {
                user_id: userId,
                coin_id: coinId,
                amount: amount,
            })
                .subscribe(data => {
                    resolve(data)
                }, err => {
                    reject(err)
                })
        })
    }

    deleteAsset(userId: string, coinId: string) {
        return new Promise((resolve, reject) => {
            this.http.delete(this.baseUrl + '/assets/' + userId + "/" + coinId)
                .subscribe(data => {
                    resolve(data)
                }, err => {
                    reject(err)
                })
        })
    }

    putAsset(userId: string, coinId: string, amount: number) {
        return new Promise((resolve, reject) => {
            this.http.put(this.baseUrl + '/assets', {
                user_id: userId,
                coin_id: coinId,
                amount: amount,
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

    getArticlesOfUser(userId: string) {
        let promise: Promise<Array<any>>

        promise = new Promise((resolve, reject) => {
            this.http.get(this.baseUrl + '/users/' + userId + '/articles')
                .subscribe(data => {
                    resolve(<Array<any>>data)
                }, err => {
                    reject(err)
                })
        })

        return promise
    }

    signUp(userData: UserData, hashedPassword: string) {
        return new Promise((resolve, reject) => {
            this.http.post(this.baseUrl + '/users', {
                name: userData.name,
                sex: userData.sex,
                birthday: userData.birthday,
                mail: userData.mail,
                password: hashedPassword
            })
                .subscribe(() => {
                    resolve()
                }, err => {
                    reject(err)
                })
        })
    }

    postLogin(mail: string, hashedPassword: string) {
        let promise: Promise<any>

        promise = new Promise((resolve, reject) => {
            this.http.post(this.baseUrl + '/login', {
                mail: mail,
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

    postArticle(url: string, comment: string, userId: string) {
        return new Promise((resolve, reject) => {
            this.http.post(this.baseUrl + '/articles', {
                url: url,
                comment: comment,
                user_id: userId
            })
                .subscribe(data => {
                    resolve(data)
                }, err => {
                    reject(err)
                })
        })
    }
}

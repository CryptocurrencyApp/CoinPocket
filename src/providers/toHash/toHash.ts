import * as jsSHA from 'jssha'
import { Injectable } from '@angular/core'

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToHashProvider {
    constructor() {
    }

    toSHA256(rawValue :string) {
        let shaObj = new jsSHA('SHA-256', "TEXT")
        shaObj.update(rawValue)
        return shaObj.getHash("HEX")
    }
}
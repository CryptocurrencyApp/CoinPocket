import { Injectable } from '@angular/core'

@Injectable()
export class UrlProvider {
  constructor() {
    console.log("created url")
  }

  openUrl(url: string) {
    window.open(url, '_system');
  }
}

import { Injectable } from '@angular/core'

@Injectable()
export class UrlProvider {
  constructor() {
  }

  openUrl(url: string) {
    window.open(url, '_system');
  }
}

import { Injectable } from '@angular/core'

@Injectable()
export class UrlProvider {
  openUrl(url: string) {
    window.open(url, '_system');
  }
}

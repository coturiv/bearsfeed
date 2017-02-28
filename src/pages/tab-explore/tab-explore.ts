import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';

import { GallerySearchPage } from '../gallery-search/gallery-search';
import { GameProvider } from '../../providers/game';

@Component({
  selector: 'page-tab-explore',
  templateUrl: 'tab-explore.html'
})
export class TabExplorePage {

  constructor(
    public modalCtrl : ModalController, 
    public navParams : NavParams,
    public gameProvider : GameProvider
  ) {}

  ionViewDidLoad() {}

  doPageSearch() {
    let modal = this.modalCtrl.create(GallerySearchPage);
    modal.present();
  }

  doJoin() {
    this.gameProvider.join().then(_=> {
      alert('Joined successfully!');
    }, (error) => {
      alert(error.message);
    });
  }

  doShopping() {
    console.log('Open Shopping Page.');
    let browser = new InAppBrowser('https://www.berkshire-store.com', '_system');
    // browser.show();
  }
}
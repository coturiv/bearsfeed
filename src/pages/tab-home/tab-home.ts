import { Component } from '@angular/core';
import { ModalController, NavParams, /*Events*/ } from 'ionic-angular';

import { GallerySearchPage } from '../gallery-search/gallery-search';

@Component({
  selector: 'page-tab-home',
  templateUrl: 'tab-home.html'
})
export class TabHomePage {

  constructor(
    public modalCtrl : ModalController, 
    public navParams : NavParams,
    // public events: Events
  ) {}

  ionViewDidLoad() {}

  doPageSearch() {
    let modal = this.modalCtrl.create(GallerySearchPage);
    modal.present();
  }

  // doRefresh(refresher) {
  //   this.events.publish('gallery:reload', refresher);
  // }
}
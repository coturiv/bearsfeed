import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';

import { GallerySearchPage } from '../gallery-search/gallery-search';

@Component({
  selector: 'page-tab-explore',
  templateUrl: 'tab-explore.html'
})
export class TabExplorePage {

  constructor(
    public modalCtrl : ModalController, 
    public navParams : NavParams) {}

  ionViewDidLoad() {}

  doPageSearch() {
    let modal = this.modalCtrl.create(GallerySearchPage);
    modal.present();
  }
}
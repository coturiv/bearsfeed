import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';

import { SearchPage } from '../search/search';

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
    let modal = this.modalCtrl.create(SearchPage);
    modal.present();
  }
}
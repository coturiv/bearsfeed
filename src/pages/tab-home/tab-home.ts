import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';

import { SearchPage } from '../search/search';

@Component({
  selector: 'page-tab-home',
  templateUrl: 'tab-home.html'
})
export class TabHomePage {

  constructor(
    public modalCtrl : ModalController, 
    public navParams : NavParams) {}

  ionViewDidLoad() {}

  doPageSearch() {
    let modal = this.modalCtrl.create(SearchPage);
    modal.present();
  }
}

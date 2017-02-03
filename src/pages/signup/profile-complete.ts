import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-profile-complete',
  templateUrl: 'profile-complete.html',
})
export class ProfileCompletePage {

  constructor(
    public navCtrl   : NavController, 
    public navParams : NavParams
  ) {}

  ionViewDidLoad() {}

  goHome() {
    this.navCtrl.setRoot(TabsPage);
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProfileCompletePage } from './profile-complete';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {}

  doContinue() {
    this.navCtrl.push(ProfileCompletePage);
  }
  
  doLogin() {
    this.navCtrl.pop();
  }
}

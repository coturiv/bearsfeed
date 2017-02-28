import { Component } from '@angular/core';
import { NavParams, ViewController, LoadingController } from 'ionic-angular';

import { UserProvider } from '../../providers/user';

@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html'
})
export class ProfileEditPage {
  bio ?: string;

  constructor(
    public viewCtrl: ViewController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public userProvider: UserProvider
  ) {
    this.userProvider.currentUser.subscribe(user => {
      this.bio = user.bio;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }

  doSave() {
    let loading = this.loadingCtrl.create();
    loading.onDidDismiss(()=>{this.viewCtrl.dismiss();});
    loading.present();
    this.userProvider.updateBio(this.bio).then(_=> loading.dismiss());
  }

  doCancel() {
    this.viewCtrl.dismiss();
  }

}

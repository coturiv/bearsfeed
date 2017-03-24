import { Component } from '@angular/core';
import { 
  ModalController, 
  NavParams, 
  NavController, 
  App,
  LoadingController,
  ToastController,
} from 'ionic-angular';

import { InAppBrowser} from 'ionic-native';

import { GallerySearchPage } from '../gallery-search/gallery-search';
import { GameManagementPage } from '../game-management/game-management';
import { GameProvider } from '../../providers/game';
import { GameMainPage } from '../game-main/game-main';
import { GameEliminatePage } from '../game-eliminate/game-eliminate';
import { GameEliminateTargetPage } from '../game-eliminate-target/game-eliminate-target';
import { UserProvider, UserModel } from '../../providers/user';
import { GameEliminateSuccessPage } from '../game-eliminate-success/game-eliminate-success';

@Component({
  selector: 'page-tab-explore',
  templateUrl: 'tab-explore.html'
})
export class TabExplorePage {
  currentUser: UserModel;

  constructor(
    public modalCtrl : ModalController, 
    public navParams : NavParams,
    public gameProvider : GameProvider,
    public app: App,
    public userProvider : UserProvider,
    public loadingCtrl  : LoadingController,
    public toastCtrl    : ToastController,

  ) {
      this.userProvider.currentUser.subscribe(user => {
        this.currentUser = user;
      });
  }

  ionViewDidLoad() {}

  doPageSearch() {
    let modal = this.modalCtrl.create(GallerySearchPage);
    modal.present();
  }

  doJoinGame() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.gameProvider.checkGameStarted().then(started => {
      loading.dismiss();
      if (started == true) {
        this.app.getRootNav().push(GameMainPage, {
          "currentUser" : this.currentUser,
        });
      } else {
        this.toastCtrl.create({message: "Game hasn\'t Started yet.", 
                               duration: 4500})
              .present();
      }
    })
  }

  doShopping() {
    console.log('Open Shopping Page.');
    let option = 'location=no,toolbarposition=top';

    let browser = new InAppBrowser('https://www.berkshire-store.com', '_blank', option);
    // browser.show();
  }

  pressGameAdmin() {
    this.app.getRootNav().push(GameManagementPage);
  }

  gotoEliminateSuccessPage() {
    let modal = this.modalCtrl.create(GameEliminateSuccessPage, {targetName: "User"});
    modal.present();
  }

}
import { Component } from '@angular/core';
import { 
  NavController, 
  NavParams, 
  LoadingController, 
  ModalController,
  Platform
} from 'ionic-angular';
import { EmailComposer } from 'ionic-native';

import { GameProvider } from '../../providers/game';
import { UserProvider, UserModel } from '../../providers/user';

import { GameEliminateTargetPage } from '../game-eliminate-target/game-eliminate-target';
import { GameEliminatePage } from '../game-eliminate/game-eliminate';
import { GameEliminateSuccessPage } from '../game-eliminate-success/game-eliminate-success';

/*
  Generated class for the GameMain page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-game-main',
  templateUrl: 'game-main.html'
})
export class GameMainPage {
  currentUser: any;
  targetUser: any;
  isEliminatedMe: boolean = false;
  isWinner: boolean = false;

  score: number = 0;
  targetLeft: number = 0;
  targetName: string = "";

  subscriberEliminatedChecker: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl    : ModalController,
    public gameProvider : GameProvider,
    public loadingCtrl  : LoadingController,
    public platform: Platform
  ) {
    this.currentUser = navParams.get("currentUser");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameMainPage');
    this.getEliminateTarget();
    this.checkingEliminateMe();
  }

  getEliminateTarget() {
    this.gameProvider.getEliminateTarget(this.currentUser.$key).then(result => {
      console.log(result);
      if (result != null) {
        this.targetUser = result.user;
        this.score = result.score;
        this.targetLeft = result.leftCount;
        this.targetName = this.targetUser.username;
      } else {
        this.isWinner = true;
      }
    })

  }

  pressTrophy() {
    this.navCtrl.push(GameEliminateTargetPage, {
      currentUser: this.currentUser,
    });
  }

  pressEliminate() {
    let loading = this.loadingCtrl.create();
    loading.present();
    console.log(this.targetUser);
    this.gameProvider.elimate(this.targetUser, this.currentUser.$key).then(response => {
      loading.dismiss();
      this.targetUser = null;
      this.getEliminateTarget();
      this.gotoEliminateSuccessPage();
    })
  }

  pressEmail() {
    if(!this.platform.is('cordova')) {
      return;
    }
    console.log("open email box");
    EmailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        let email = {
          to: 'max@mustermann.de',
          subject: 'Question from BearsFeed app',
          body: 'abc abc abc',
          isHtml: true
        };
        EmailComposer.open(email);
      }
    });
  }

  checkingEliminateMe() {
    console.log("subscribe realtime checing eliminate me");
    this.subscriberEliminatedChecker = this.gameProvider.realtimeCheckEliminateMe(this.currentUser.$key).subscribe(result => {
      console.log("eliminated realtime check");
      console.log(result);
      this.isEliminatedMe = (result.$value != null);
    })
  }

  gotoEliminateSuccessPage() {
    this.subscriberEliminatedChecker && this.subscriberEliminatedChecker.unsubscribe();
    let modal = this.modalCtrl.create(GameEliminateSuccessPage, {targetName: this.targetName});
    modal.present();
  }
}

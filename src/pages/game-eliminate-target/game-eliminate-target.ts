import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { GameProvider } from '../../providers/game';
import { TabProfilePage } from '../../pages/tab-profile/tab-profile';

/*
  Generated class for the GameEliminateTarget page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-game-eliminate-target',
  templateUrl: 'game-eliminate-target.html'
})
export class GameEliminateTargetPage {

  users: Array<any>;
  currentUser: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public gameProvider: GameProvider,
    public app: App,
  ) {
    this.currentUser = navParams.get('currentUser');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameEliminateTargetPage');

    this.loadUserList();
  }

  loadUserList() {
    this.gameProvider.getEliminatedTargets(this.currentUser.$key).subscribe(result => {
      console.log(result);
      this.users = result;
    }, error => {
      console.log(error);
    })
  }

  pressUser(user: any)  {
    this.app.getRootNav().push(TabProfilePage, {user: user});
  }

}

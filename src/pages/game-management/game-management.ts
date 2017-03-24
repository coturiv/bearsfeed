import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GameProvider } from '../../providers/game';

/*
  Generated class for the GameManagement page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-game-management',
  templateUrl: 'game-management.html'
})
export class GameManagementPage implements OnInit, OnDestroy {

  userCount: number;
  subscriber: any;
  isGameStarted: boolean = false;
  users: Array<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public gameProvider : GameProvider,
  ) {

  }

  ngOnInit() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameManagementPage');
    this.loadGameUserCount();
    this.gameProvider.checkGameStarted().then(result => {
      this.isGameStarted = result;
    })
  }

  loadGameUserCount() {
    this.subscriber = this.gameProvider.getGameUserCount().subscribe(result => {
      this.userCount = result.length;
      this.users = result;
    }, error => {

    })
  }

  pressStartGame() {
    this.subscriber && this.subscriber.unsubscribe();
    this.subscriber = null;
    this.gameProvider.startGame(this.users).then(result => {
      this.isGameStarted = result;
      if (result == false) {
        this.loadGameUserCount();
      }
    })
  }

  pressStopGame() {
    this.gameProvider.stopGame().then(result => {
      this.isGameStarted = !result;
      if (result == true) {
        this.loadGameUserCount();
      }
    })
  }

  ngOnDestroy() {
    this.subscriber && this.subscriber.unsubscribe();
  }

}

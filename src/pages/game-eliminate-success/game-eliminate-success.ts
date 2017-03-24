import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the GameEliminateSuccess page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-game-eliminate-success',
  templateUrl: 'game-eliminate-success.html'
})
export class GameEliminateSuccessPage {
  targetName: string = "";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController, 
  ) {
    this.targetName = navParams.get("targetName");
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameEliminateSuccessPage');
    console.log(this.targetName);
  }

  pressClose() {
    this.viewCtrl.dismiss();
  }
}

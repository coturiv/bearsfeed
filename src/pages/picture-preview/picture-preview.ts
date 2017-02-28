import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the PicturePreview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-picture-preview',
  templateUrl: 'picture-preview.html'
})
export class PicturePreviewPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController, 
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PicturePreviewPage');
  }

  pressClose() {
    this.viewCtrl.dismiss();
  }
}

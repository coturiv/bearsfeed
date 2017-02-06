import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {}

  ionViewDidLoad() {}

  doPost() {
    /**
     * do post....
     */
    this.viewCtrl.dismiss();
  }

  doCancel() {
    this.viewCtrl.dismiss();
  }

}

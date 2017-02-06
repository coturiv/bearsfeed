import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-gallery-comment',
  templateUrl: 'gallery-comment.html'
})
export class GalleryCommentPage {

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {}

  ionViewDidLoad() {}

  doCancel() {
    this.viewCtrl.dismiss();
  }

}

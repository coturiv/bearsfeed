import { Component } from '@angular/core';
import { ViewController, NavParams, ActionSheetController } from 'ionic-angular';


@Component({
  selector: 'page-gallery-post',
  templateUrl: 'gallery-post.html'
})
export class GalleryPostPage {

  constructor(
    public viewCtrl        : ViewController, 
    public navParams       : NavParams,
    public actionSheetCtrl : ActionSheetController
  ) {}

  ionViewDidLoad() {}

  doPost() {

  }

  doCapture() {

  }
  
  doCancel() {
    this.viewCtrl.dismiss();
  }
}

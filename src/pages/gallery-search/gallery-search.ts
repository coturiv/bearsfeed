import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-gallery-search',
  templateUrl: 'gallery-search.html'
})
export class GallerySearchPage {
  side: string = 'post';

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {}

  ionViewDidLoad() {}

  onSegmentSelected(side: string) {
    this.side = side;
  }

  doCancel() {
    this.viewCtrl.dismiss();
  }
}


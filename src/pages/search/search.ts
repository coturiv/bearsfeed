import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {}

  ionViewDidLoad() {}

  doCancel() {
    this.viewCtrl.dismiss();
  }
}

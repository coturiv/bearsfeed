import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { NotificationModel, NotificationProvider } from '../../providers/notification';
import { GalleryPostPage } from '../gallery-post/gallery-post';

@Component({
  selector: 'page-tab-notification',
  templateUrl: 'tab-notification.html'
})
export class TabNotificationPage {
  data: Array<NotificationModel>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl : ModalController,
) {}

  ionViewDidLoad() {}

  pressPostAMoment() {
    console.log("Pressed Post a Moment");
    let modal = this.modalCtrl.create(GalleryPostPage);
    modal.present();
  }
}

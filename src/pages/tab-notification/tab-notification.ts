import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { NotificationModel, NotificationProvider } from '../../providers/notification';
import { GalleryPostPage } from '../gallery-post/gallery-post';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-tab-notification',
  templateUrl: 'tab-notification.html'
})
export class TabNotificationPage {
  data: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl : ModalController,
    private notifyProvider : NotificationProvider,
    public alertCtrl: AlertController
) {
      this.notifyProvider.getAllNotifications().map(notis => notis.reverse()).subscribe(res => {
        this.data = res;
      }, error => {
        console.log("ERROR  +_+_++_+_+_++_+_+_+_+_+_++++_+_+_+");
      })

}

  ionViewDidLoad() {}

  pressPostAMoment() {
    console.log("Pressed Post a Moment");
    let modal = this.modalCtrl.create(GalleryPostPage);
    modal.present();
  }

  selectNotification(item) {
    
  }

  clearNotification() {
    let prompt = this.alertCtrl.create({
      title: 'Clear Notifications',
      message: "Would you clear all notifications?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.notifyProvider.clearNotification();
          }
        }
      ]
    });
    prompt.present();
  }
}

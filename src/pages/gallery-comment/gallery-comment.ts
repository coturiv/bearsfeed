import { Component } from '@angular/core';
import { ViewController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { GalleryProvider } from '../../providers/gallery';
import { NotificationProvider } from '../../providers/notification';
@Component({
  selector: 'page-gallery-comment',
  templateUrl: 'gallery-comment.html'
})
export class GalleryCommentPage {
  gallery : any;
  comment?: string;

  constructor(
    public viewCtrl: ViewController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl : ToastController,
    public galleryProvider : GalleryProvider,
    public notificationProvier : NotificationProvider,
  ) {
    this.gallery = this.navParams.get('gallery');
  }

  ionViewDidLoad() {}

  doSave() {
    if (!this.gallery.title)
      return;
      
    let loading = this.loadingCtrl.create();
    loading.present();
    this.galleryProvider.galleryComment(this.comment, this.gallery)
      .then(_=> {
        loading.dismiss();
        let toast = this.toastCtrl.create({message: 'Commented successfully !', duration: 1500});
        toast.present();
        toast.onDidDismiss(() => this.viewCtrl.dismiss());
        this.sendNotification();
      }, (error) => {
        loading.dismiss();
        this.toastCtrl.create({message: error.message, duration: 1500}).present();
      });
  }

  sendNotification() {
    console.log('send notification +__+++_+_+_+_+_+_+_+_+_+_+_++_+_+_');
    console.log(this.gallery);
    this.notificationProvier.addNotification(this.gallery.userId, this.gallery.$key, 10);
  }

  doCancel() {
    this.viewCtrl.dismiss();
  }

}

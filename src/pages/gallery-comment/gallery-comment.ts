import { Component } from '@angular/core';
import { ViewController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { GalleryProvider } from '../../providers/gallery';

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
      }, (error) => {
        loading.dismiss();
        this.toastCtrl.create({message: error.message, duration: 1500}).present();
      });
  }

  doCancel() {
    this.viewCtrl.dismiss();
  }

}

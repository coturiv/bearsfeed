import { Component } from '@angular/core';
import { 
  ViewController, 
  NavParams, 
  ActionSheetController, 
  Platform,
  LoadingController, 
  ToastController } from 'ionic-angular';
import { Camera } from 'ionic-native';

import { GalleryProvider, GalleryModel } from '../../providers/gallery';
import { UserProvider, UserModel } from '../../providers/user';

@Component({
  selector: 'page-gallery-post',
  templateUrl: 'gallery-post.html'
})
export class GalleryPostPage {
  gallery   : GalleryModel = new GalleryModel();
  user      : UserModel    = new UserModel();

  constructor(
    public viewCtrl        : ViewController, 
    public navParams       : NavParams,
    public actionSheetCtrl : ActionSheetController,
    public loadingCtrl     : LoadingController,
    public toastCtrl       : ToastController,
    public platform        : Platform,
    public galleryProvider : GalleryProvider,
    public userProvider    : UserProvider
  ) {}

  ionViewDidLoad() {
    this.userProvider.currentUser.subscribe(user => this.user = user);
  }

  doPost() {
    if (!this.gallery.title)
      return;
      
    let loading = this.loadingCtrl.create();
    loading.present();
    this.userProvider.getAuth()
          .subscribe(user => {
            this.gallery.userId = user.uid;
            this.galleryProvider.postGallery(this.gallery)
          .then(_=> {
            loading.dismiss();
            let toast = this.toastCtrl.create({message: 'Posted successfully !', duration: 1500});
            toast.present();
            toast.onDidDismiss(() => this.viewCtrl.dismiss());
          }, (error) => {
            loading.dismiss();
            this.toastCtrl.create({message: error.message, duration: 1500}).present();
          });
      });
  }

  doCapture() {
    if (this.platform.is('cordova')) {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Take a photo from...',
        buttons: [
          {
            text : 'Camera',
            icon :'camera',
            handler : ()=> {
              this.photoFromCamera().then(imgData => this.gallery.photo = imgData);
            }
          },
          {
            text : 'Library',
            icon :'images',
            handler : ()=> {
              this.photoFromLibrary().then(imgData => this.gallery.photo = imgData);
            }
          },{
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      }).present();
    }
  }

  photoFromCamera() {
    return Camera.getPicture({sourceType: Camera.PictureSourceType.CAMERA});
  }

  photoFromLibrary() {
    return Camera.getPicture({sourceType: Camera.PictureSourceType.PHOTOLIBRARY});
  }
  
  doCancel() {
    this.viewCtrl.dismiss();
  }
}
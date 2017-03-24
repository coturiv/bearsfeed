import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ActionSheetController, App } from 'ionic-angular';

import { SocialSharing, PhotoViewer } from 'ionic-native';

import { GalleryCommentPage } from '../../pages/gallery-comment/gallery-comment';
import { GalleryProvider } from '../../providers/gallery';
import { UserProvider, UserModel } from '../../providers/user';
import { NotificationProvider } from '../../providers/notification';
import { PicturePreviewPage } from '../../pages/picture-preview/picture-preview';
import { TabProfilePage } from '../../pages/tab-profile/tab-profile';

@Component({
  selector: 'gallery-card',
  templateUrl: 'gallery-card.html'
})
export class GalleryCardComponent implements OnInit {
  @Input() item: any;
  
  user: any;
  commentCount: Number = 0;

  constructor(
    public modalCtrl       : ModalController,
    public actionSheetCtrl : ActionSheetController,
    public galleryProvider : GalleryProvider,
    public userProvider    : UserProvider,
    public notificationProvider : NotificationProvider,
    public app: App
  ) {
  }

  ngOnInit() {
    this.user = this.userProvider.getUser(this.item.userId);
    this.getCommentCount();
  }

  upVote(item: any) {
    item.id = item.$key;
    this.galleryProvider.likeGallery(item).then(res => {
      console.log(res);
      
    }, (error) => {
      console.log(error);
    });
  }

  downVote(item: any) {
    item.id = item.$key;
    this.galleryProvider.unLikeGallery(item).then(res => {
      console.log(res);
      // this.notificationProvider.addNotification(item.userId, item.$key, 21);
    }, (error) => {
      console.log(error);
    });;
    
  }

  onProfile() {
    this.app.getRootNav().push(TabProfilePage, {user: this.user});
  }

  doComment(item: any) {
    let modal = this.modalCtrl.create(GalleryCommentPage, {gallery: item});
    modal.present();
  }

  doShare(item: any) {
    this.actionSheetCtrl.create({
      title: 'Social sharing...',
      buttons: [
        {
          text: 'Share via WhatsApp',    icon: 'whatsapp',    handler: ()=>{
            SocialSharing.shareViaWhatsApp('Sharing via WhatsApp.', item.photo, 'http://test.url.com');
          }
        }, {
          text: 'Share via Facebook',    icon: 'facebook',    handler: ()=>{
            SocialSharing.shareViaFacebook('Sharing via Facebok.', item.photo, 'http://test.url.com');
          }
        }, {
          text: 'Share via other ways',  icon: 'reddit',      handler: ()=>{
             SocialSharing.share('Other ways...', 'Awesome gallery', item.photo, 'http://test.url.com');
          }
        }, {
          text: 'Cancel',  role: 'cancel',      handler: ()=> {}
        }
      ]
    }).present();
  }

  pressPhoto(item: any) {
    // console.log("clicked picture");
    // let modal = this.modalCtrl.create(PicturePreviewPage, {gallery: item});
    // modal.present();
    console.log(item);
    PhotoViewer.show(
      item.photo, 
      'Preview', 
      {share: false}
    );
  }

  getCommentCount() {
    this.galleryProvider.getCommentCount(this.item).subscribe( res => {
      this.commentCount = res != null && res.length;
    });
  }
}

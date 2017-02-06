import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ActionSheetController } from 'ionic-angular';

import { GalleryCommentPage } from '../../pages/gallery-comment/gallery-comment';

@Component({
  selector: 'gallery-card',
  templateUrl: 'gallery-card.html'
})
export class GalleryCardComponent {
  @Input() item: any;
  
  data: any = {
    text      :  'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.',
    likeCount : 54
  };
  constructor(
    public modalCtrl       : ModalController,
    public actionSheetCtrl : ActionSheetController
  ) {
  }

  upVote(item: any) {
    item.likeCount ++;
  }

  downVote(item: any) {
    item.likeCount --;
  }

  doComment(item: any) {
    let modal = this.modalCtrl.create(GalleryCommentPage);
    modal.present();
  }

  doShare(item: any) {
    this.actionSheetCtrl.create({
      title: 'Social sharing...',
      buttons: [
        {
          text: 'Share via WhatsApp',    icon: 'whatsapp',    handler: ()=>{}
        }, {
          text: 'Share via Facebook',    icon: 'facebook',    handler: ()=>{}
        }, {
          text: 'Share via Twitter',     icon: 'twitter',     handler: ()=>{}
        }, {
          text: 'Share via other ways',  icon: 'reddit',      handler: ()=>{}
        }, {
          text: 'Cancel',  role: 'cancel',      handler: ()=> {}
        }
      ]
    }).present();
  }

}

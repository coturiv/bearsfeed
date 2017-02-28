import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { GalleryPostPage } from '../../pages/gallery-post/gallery-post';
import { UserProvider, UserModel } from '../../providers/user';

@Component({
  selector: 'gallery-poster',
  templateUrl: 'gallery-poster.html'
})
export class GalleryPosterComponent {
  user: UserModel = new UserModel();
  constructor(
    public modalCtrl : ModalController,
    public userProvider : UserProvider,
  ) {
    this.userProvider.currentUser.subscribe(user => this.user = user);
  }

  onPagePost() {
    let modal = this.modalCtrl.create(GalleryPostPage);
    modal.present();
  }
}

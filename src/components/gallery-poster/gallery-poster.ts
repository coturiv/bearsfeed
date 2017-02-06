import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { PostPage } from '../../pages/post/post';


@Component({
  selector: 'gallery-poster',
  templateUrl: 'gallery-poster.html'
})
export class GalleryPosterComponent {

  constructor(
    public modalCtrl : ModalController
  ) {}

  onPagePost() {
    let modal = this.modalCtrl.create(PostPage);
    modal.present();
  }
}

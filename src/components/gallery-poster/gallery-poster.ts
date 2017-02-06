import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { GalleryPostPage } from '../../pages/gallery-post/gallery-post';


@Component({
  selector: 'gallery-poster',
  templateUrl: 'gallery-poster.html'
})
export class GalleryPosterComponent {

  constructor(
    public modalCtrl : ModalController
  ) {}

  onPagePost() {
    let modal = this.modalCtrl.create(GalleryPostPage);
    modal.present();
  }
}

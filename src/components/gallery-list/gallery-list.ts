import { Component, Input, OnInit } from '@angular/core';

import { GalleryProvider, GalleryModel } from '../../providers/gallery';

@Component({
  selector: 'gallery-list',
  templateUrl: 'gallery-list.html'
})
export class GalleryListComponent implements OnInit {
  @Input() eventName ?: string;

  loading : boolean;
  data    : Array<GalleryModel>;

  constructor(
    public galleryProvider: GalleryProvider
  ) {
    this.data = [];
    for (let i=0; i<10; i++) {
      let gallery = {
        user: 'Benny',
        avatar: 'assets/img/profile.png',
        description: 'I \'m benny, experienced cross-platform mobile app developer.',
      };
      this.data.push(gallery);
    }
  }

  ngOnInit() {

  }

}

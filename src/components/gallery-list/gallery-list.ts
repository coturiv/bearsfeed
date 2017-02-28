import { Component, Input, OnInit } from '@angular/core';

import { GalleryProvider, GalleryModel } from '../../providers/gallery';

@Component({
  selector: 'gallery-list',
  templateUrl: 'gallery-list.html'
})
export class GalleryListComponent implements OnInit {
  @Input() eventName ?: string;
  @Input() user      ?: any;

  loading : boolean;
  data    : any;

  constructor(
    public galleryProvider: GalleryProvider
  ) {}

  ngOnInit() {
    this.data = this.galleryProvider.getGalleries(this.user && this.user.uid);
    this.loading = true;
    this.data.subscribe(_=>this.loading = false);
  }

}

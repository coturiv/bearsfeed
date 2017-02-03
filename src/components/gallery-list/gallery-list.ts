import { Component, Input, OnInit } from '@angular/core';

import { GalleryProvider, GalleryModel } from '../../providers/gallery';

@Component({
  selector: 'gallery-list',
  templateUrl: 'gallery-list.html'
})
export class GalleryListComponent implements OnInit {
  @Input() eventName ?: string;
  @Input() isVotable ?: boolean = false;

  loading : boolean;
  data    : Array<GalleryModel>;

  constructor(
    public galleryProvider: GalleryProvider
  ) {
    this.data = [];
  }

  ngOnInit() {

  }

}

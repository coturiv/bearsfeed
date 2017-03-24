import { Component, Input, OnInit } from '@angular/core';
// import { Events } from 'ionic-angular';
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
    public galleryProvider: GalleryProvider,
    // public events: Events,
  ) {}

  ngOnInit() {
    this.loadDatas();

    /*
    this.events.subscribe('gallery:reload', (refresher)=> {
      this.data = this.galleryProvider.getGalleries(this.user && this.user.$key);
      this.data.subscribe(_=> refresher.complete());
    }) */
  }

  loadDatas() {
    this.data = this.galleryProvider.getGalleries(this.user && this.user.$key).map((res) => res.reverse());
    this.loading = true;
    this.data.subscribe(_=> this.loading = false);
  }

  doRefresh(refresher) {
    // console.log('Begin async operation', refresher);
    this.data = this.galleryProvider.getGalleries(this.user && this.user.$key).map((res) => res.reverse());
    this.data.subscribe(_=> {
      refresher.complete();
    });
  }


}

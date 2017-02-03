import { Component } from '@angular/core';

/*
  Generated class for the GalleryCard component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'gallery-card',
  templateUrl: 'gallery-card.html'
})
export class GalleryCardComponent {

  text: string;

  constructor() {
    console.log('Hello GalleryCard Component');
    this.text = 'Hello World';
  }

}

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


export class GalleryModel {
  id       ?: string;
  title    ?: string;
  photo    ?: any;
  category ?: string;
  location ?: string;
}


@Injectable()
export class GalleryProvider {

  constructor() {}

}

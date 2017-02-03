import { Component } from '@angular/core';

/*
  Generated class for the ReadMore component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'read-more',
  templateUrl: 'read-more.html'
})
export class ReadMoreComponent {

  text: string;

  constructor() {
    console.log('Hello ReadMore Component');
    this.text = 'Hello World';
  }

}

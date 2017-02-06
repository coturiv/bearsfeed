import { Component } from '@angular/core';

/*
  Generated class for the UserCard component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'user-card',
  templateUrl: 'user-card.html'
})
export class UserCardComponent {

  text: string;

  constructor() {
    console.log('Hello UserCard Component');
    this.text = 'Hello World';
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../../providers/user';
import { ActivityModel, activityList } from '../../providers/notification';

@Component({
  selector: 'user-card',
  templateUrl: 'user-card.html'
})
export class UserCardComponent implements OnInit {
  @Input() item      : any;
  @Input() eventName : string;

  user     ?: UserModel;
  activity ?: ActivityModel;
  notification ?: any;

  constructor() {
  }

  ngOnInit() {
    if (this.eventName === 'notification') {
      this.notification = this.item;
      // this.user     = this.item.user;
      // this.activity = activityList.filter(activity => activity.name == this.item.activity)[0];
      
    }

    if (this.eventName === 'people') {
      this.user = this.item;
    }
  }
}

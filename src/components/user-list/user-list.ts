import { Component, Input, OnInit } from '@angular/core';

import { UserProvider } from '../../providers/user';
import { NotificationProvider } from '../../providers/notification';


@Component({
  selector: 'user-list',
  templateUrl: 'user-list.html'
})
export class UserListComponent implements OnInit {
  @Input() eventName ?: string; 

  loading : boolean;
  data    : Array<any>;

  constructor(
    private userProvider   : UserProvider,
    private notifyProvider : NotificationProvider
  ) {
    this.data = [];
  }

  ngOnInit() {
    if (this.eventName == 'people') {
      this.userProvider.allUsers.subscribe((users) => {
        this.data = users;
      });
    }

    if (this.eventName == 'notification') {
      this.data = this.notifyProvider.allNotifications;
    }
  }
}

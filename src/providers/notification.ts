import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { UserModel } from './user';

export class NotificationModel {
  id        ?: string;
  activity  ?: string;
  user      ?: UserModel;
  createdAt ?: string;
}

export const ActivityList = {
  upvoted   : 'Upvoted your post!',
  downvoted : 'Downvoted your post!',
  commented : 'Commented your post!',
}


@Injectable()
export class NotificationProvider {

  constructor() {}

  get allNotifications(): Array<NotificationModel> {
    return []; 
  }

}

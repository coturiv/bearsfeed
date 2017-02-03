import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { UserModel } from './user';


export class ChannelModel {
  id        ?: string;
  users     ?: Array<UserModel>;
  message   ?: MessageModel;
  createdAt ?: string;
}

export class MessageModel {
  id         ?: string;
  channelId  ?: string;
  text       ?: string;
  user       ?: UserModel;
  attachment ?: any;
  createdAt  ?: string;
}


@Injectable()
export class ChatProvider {

  constructor() {}

}

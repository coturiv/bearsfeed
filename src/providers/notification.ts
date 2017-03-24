import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { OneSignal } from 'ionic-native';

import { UserModel, UserProvider } from './user';
import { Observable } from 'rxjs/Rx';
import { Platform } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

export class NotificationModel {
  id        ?: string;
  activity  ?: string;
  user      ?: UserModel;
  createdAt ?: string;
}

export class ActivityModel {
  name        ?: string;
  description ?: string;
  icon        ?: string;
}

export const activityList = [
  { name: 'like',    description: 'Upvoted your post!',   icon: 'arrow-round-up' },
  { name: 'unlike',  description: 'Downvoted your post!', icon: 'arrow-round-down' },
  { name: 'comment', description: 'Commented your post!', icon: 'chatboxes' }
];


@Injectable()
export class NotificationProvider {
  data: Array<NotificationModel>;
  currentUser: any;
  
  constructor(
    private userProvider : UserProvider,
    public af: AngularFire,
    public platform: Platform,
  ) {
    if (!this.currentUser) {
      this.userProvider.currentUser.subscribe(user => {
        this.currentUser = user;
      });
    }
  }

  get allNotifications(): Array<NotificationModel> {
    this.data = [];
    for (let i=0; i< 10; i++) {
      let user = this.userProvider.allUsers[i];

      if (!user)    
        continue;
      let notification = new NotificationModel();
      notification.user = user;
  
      notification.activity = activityList[Math.floor(Math.random() * 3)].name;
      this.data.push(notification);
    }
    
    return this.data;
  }

  get badgeCounts() {
    return this.userProvider.currentUser.flatMap(user => {
      return this.af.database.list('notifications/' + user.$key).map(notifications =>{
        return notifications.filter(notification => notification.hasRead != true);
      });
    });
  }

  getAllNotifications() : Observable<any> {
    if (this.currentUser) {
      let path = 'notifications/' + this.currentUser.uid + '/';
      console.log(path);
      return this.af.database.list(path);
    } else {
      return null
    }
  }

  addNotification(toUserId: string, gallerId: string, type: number) {
    if (this.currentUser) {
      var message: string = "";
      if (type == 10) {
        message = "Commented on your post!";
      } else if (type == 20) {
        message = "Upvoted your post!";
      } else if (type == 21) {
        message = "Downvoted your post!";
      } 
      console.log('%s %s %s %s', toUserId, gallerId, message, this.currentUser.username);
      this.af.database.list('notifications/' + toUserId).push({
        gallerId : gallerId,
        senderUsername: this.currentUser.username,
        type: type,
        hasRead : false,
        photo : this.currentUser.photo || '',
        message : message,
        createdAt: firebase.database['ServerValue']['TIMESTAMP']
      }).then(_=>{
        console.log('Added Notification');
        message = this.currentUser.username + ' ' + message;
        this.userProvider.getUser(toUserId).first().subscribe(user => {
          console.log('*&**^*&^*&^*&^*&*&^*&**&^*&^*&^*&*&^*&^');
          console.log(user);
          if (user.oneSignalId) {
            this.sendPushNotification(user.oneSignalId, message);
          }
        })
        
      }, error=> {
        console.log('Failed add Notification');
      });
    }
  }

  markAsReadNotification(notifications: Array<string>) {
    notifications.map(notificationId => {
      
    })
  }

  clearNotification(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.af.database.list('notifications/').remove(this.currentUser.uid).then(_=> {
          resolve(true);
        }, error => {
          resolve(false);
        });
    });
  }

  sendPushNotification(userOneSignalId: string, message: string) {
    // if (this.platform.is('cordova')) {
      this.platform.ready().then(_=> {
        var notificationObj = { contents: {en: message},
                                include_player_ids: [userOneSignalId]};
        
        window["plugins"].OneSignal.postNotification(notificationObj,
          function(successResponse) {
            console.log("Notification Post Success:", successResponse);
          },
          function (failedResponse) {
            console.log("Notification Post Failed: ", failedResponse);
            // alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
          }
        );
      })
      
    // }
  }
}

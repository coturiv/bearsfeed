import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';

import { UserProvider } from '../providers/user';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(public platform: Platform, public userProvider: UserProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.initializeApp();
    });

    this.userProvider.getAuth().first().subscribe(user => {
      this.rootPage = (!!user) ? TabsPage : WelcomePage;
      // console.log('========= Current User ===========');
      // console.log(user);
    }, (error) => {
      this.rootPage = WelcomePage;
    })
  }

  initializeApp() {
    if (this.platform.is('cordova')) {
      // this.platform.ready().then(() => {
          // Enable to debug issues.
        // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
        
        // Define settings for iOS
        var iosSettings = {};
        iosSettings["kOSSettingsKeyAutoPrompt"] = true;
        iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;


        var notificationOpenedCallback = function(jsonData) {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        window["plugins"].OneSignal
          .startInit("5edcb12a-c59f-4a1f-a02b-bb9bfdad1ffe")
          .iOSSettings(iosSettings)
          .handleNotificationOpened(notificationOpenedCallback)
          .endInit();

        let that = this;

        window["plugins"].OneSignal
          .getIds(function(ids) {
            console.log('getIds: ' + JSON.stringify(ids));
            // alert("userId = " + ids.userId + ", pushToken = " + ids.pushToken);
            that.userProvider.updateOneSignalId(ids.userId);
          });

    };

    // }
  }
}
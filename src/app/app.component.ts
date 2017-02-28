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

  constructor(platform: Platform, public userProvider: UserProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.userProvider.getAuth().first().subscribe(user => {
      this.rootPage = (!!user) ? TabsPage : WelcomePage;
      console.log('========= Current User ===========');
      console.log(user);
    }, (error) => {
      this.rootPage = WelcomePage;
    })
  }
}
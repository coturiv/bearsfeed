import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabHomePage } from '../tab-home/tab-home';
import { TabExplorePage } from '../tab-explore/tab-explore';
import { TabNotificationPage } from '../tab-notification/tab-notification';
import { TabProfilePage } from '../tab-profile/tab-profile';



@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = TabHomePage;
  tab2Root: any = TabExplorePage;
  tab3Root: any = TabNotificationPage;
  tab4Root: any = TabProfilePage;

  notifyCount = 0;

  constructor(public navCtrl: NavController) {

  }

}
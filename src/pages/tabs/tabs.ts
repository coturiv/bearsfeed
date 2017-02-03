import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabHomePage } from '../tab-home/tab-home'
import { TabSearchPage } from '../tab-search/tab-search'
import { TabChatsPage } from '../tab-chats/tab-chats'
import { TabActivityPage } from '../tab-activity/tab-activity'
import { TabProfilePage } from '../tab-profile/tab-profile'



@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = TabHomePage;
  tab2Root: any = TabSearchPage;
  tab3Root: any = TabChatsPage;
  tab4Root: any = TabActivityPage;
  tab5Root: any = TabProfilePage;

  constructor(public navCtrl: NavController) {

  }

}
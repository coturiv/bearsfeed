import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//pages
import { TabsPage } from '../pages/tabs/tabs';
import { TabHomePage } from '../pages/tab-home/tab-home';
import { TabExplorePage } from '../pages/tab-explore/tab-explore';
import { TabNotificationPage } from '../pages/tab-notification/tab-notification';
import { TabProfilePage } from '../pages/tab-profile/tab-profile';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfileCompletePage } from '../pages/signup/profile-complete';
import { PostPage } from '../pages/post/post';
import { SearchPage } from '../pages/search/search';

//components
import { GalleryListComponent } from '../components/gallery-list/gallery-list';
import { GalleryCardComponent } from '../components/gallery-card/gallery-card';
import { ReadMoreComponent } from '../components/read-more/read-more';

//providers
import { GalleryProvider } from '../providers/gallery';
import { UserProvider } from '../providers/user';

let appPages = [
  MyApp,
  TabsPage,
  TabHomePage,
  TabExplorePage,
  TabNotificationPage,
  TabProfilePage,
  LoginPage,
  SignupPage,
  ProfileCompletePage,
  PostPage,
  SearchPage,
  GalleryListComponent,
  GalleryCardComponent,
  ReadMoreComponent
];

@NgModule({
  declarations: appPages,
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: appPages,
  providers: [
    GalleryProvider,
    UserProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

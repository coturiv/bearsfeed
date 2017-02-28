import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';

//pages
import { TabsPage } from '../pages/tabs/tabs';
import { TabHomePage } from '../pages/tab-home/tab-home';
import { TabExplorePage } from '../pages/tab-explore/tab-explore';
import { TabNotificationPage } from '../pages/tab-notification/tab-notification';
import { TabProfilePage } from '../pages/tab-profile/tab-profile';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { ProfileCompletePage } from '../pages/signup/profile-complete';
import { GalleryPostPage } from '../pages/gallery-post/gallery-post';
import { GallerySearchPage } from '../pages/gallery-search/gallery-search';
import { GalleryCommentPage } from '../pages/gallery-comment/gallery-comment';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ChangeProfilePicturePage } from '../pages/change-profile-picture/change-profile-picture';
import { PicturePreviewPage} from '../pages/picture-preview/picture-preview';

//components
import { GalleryListComponent } from '../components/gallery-list/gallery-list';
import { GalleryCardComponent } from '../components/gallery-card/gallery-card';
import { GalleryPosterComponent } from '../components/gallery-poster/gallery-poster';
import { UserListComponent } from '../components/user-list/user-list';
import { UserCardComponent } from '../components/user-card/user-card';
import { LoaderComponent } from '../components/loader/loader';
import { ReadMoreComponent } from '../components/read-more/read-more';

// directive
import {FocusDirective} from "../directives/focus/focus";

//providers
import { GalleryProvider } from '../providers/gallery';
import { NotificationProvider } from '../providers/notification';
import { UserProvider } from '../providers/user';
import { GameProvider } from '../providers/game';

import { AngularFireModule } from 'angularfire2';

const firebaseConfig = {
    apiKey: "AIzaSyCEu6DQteiQJeHB6aE0mNb2bjswvqyQFP8",
    authDomain: "bfeed-app.firebaseapp.com",
    databaseURL: "https://bfeed-app.firebaseio.com",
    storageBucket: "bfeed-app.appspot.com",
    messagingSenderId: "44392317767"
}

let appPages = [
  MyApp,
  TabsPage,
  TabHomePage,
  TabExplorePage,
  TabNotificationPage,
  TabProfilePage,
  WelcomePage,
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
  ProfileEditPage,
  ProfileCompletePage,
  GalleryPostPage,
  GallerySearchPage,
  GalleryCommentPage,
  
  GalleryListComponent,
  GalleryCardComponent,
  GalleryPosterComponent,
  UserListComponent,
  UserCardComponent,
  LoaderComponent,
  ReadMoreComponent,

  ChangePasswordPage,
  ChangeProfilePicturePage,
  PicturePreviewPage,
];

@NgModule({
  declarations: [
    appPages,
    FocusDirective,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: appPages,
  providers: [
    Storage,
    GalleryProvider,
    NotificationProvider,
    UserProvider,
    GameProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

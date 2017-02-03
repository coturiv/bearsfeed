import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//pages
import { TabsPage } from '../pages/tabs/tabs';
import { TabHomePage } from '../pages/tab-home/tab-home';
import { TabSearchPage } from '../pages/tab-search/tab-search';
import { TabChatsPage } from '../pages/tab-chats/tab-chats';
import { TabActivityPage } from '../pages/tab-activity/tab-activity';
import { TabProfilePage } from '../pages/tab-profile/tab-profile';
import { AboutPage } from '../pages/about/about';
import { CategoryPage } from '../pages/category/category';
import { ChatChannelPage } from '../pages/chat-channel/chat-channel';
import { ChatFormPage } from '../pages/chat-form/chat-form';
import { ChatMessagePage} from '../pages/chat-message/chat-message';
import { PostPage } from '../pages/post/post';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';

//components
import { GalleryListComponent } from '../components/gallery-list/gallery-list';
import { GalleryCardComponent } from '../components/gallery-card/gallery-card';

//providers
import { CategoryProvider } from '../providers/category';
import { ChatProvider } from '../providers/chat';
import { GalleryProvider } from '../providers/gallery';
import { UserProvider } from '../providers/user';

let appPages = [
  MyApp,
  TabsPage,
  TabHomePage,
  TabSearchPage,
  TabChatsPage,
  TabActivityPage,
  TabProfilePage,
  AboutPage,
  CategoryPage,
  ChatChannelPage,
  ChatFormPage,
  ChatMessagePage,
  PostPage,
  WalkthroughPage,
  GalleryListComponent,
  GalleryCardComponent,
];

@NgModule({
  declarations: appPages,
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: appPages,
  providers: [
    CategoryProvider,
    ChatProvider,
    GalleryProvider,
    UserProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

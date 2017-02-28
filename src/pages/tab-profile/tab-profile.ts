import { Component } from '@angular/core';
import { ModalController, App, NavParams, NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

import { UserProvider, UserModel } from '../../providers/user';

import { ProfileEditPage } from '../profile-edit/profile-edit';
import { WelcomePage } from '../welcome/welcome';
import { ChangePasswordPage } from '../change-password/change-password';
import { ChangeProfilePicturePage } from '../change-profile-picture/change-profile-picture';

@Component({
  selector: 'page-tab-profile',
  templateUrl: 'tab-profile.html'
})
export class TabProfilePage {
  isBioEditing: boolean = false;
  user: UserModel = new UserModel();
  isMe: boolean = false;

  constructor(
    public modalCtrl: ModalController, 
    public app: App,
    public navParams: NavParams,
    public userProvider : UserProvider,
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController
  ) {
    this.user = this.navParams.get('user');
    if (!this.user) {
      this.userProvider.currentUser.subscribe(user => {
        this.user = user;
        this.isMe = true;
      });
    }
  }

  ionViewDidLoad() {}

  editBio() {
    let modal = this.modalCtrl.create(ProfileEditPage);
    modal.present();
  }

  doLogout() {
    this.userProvider.logout().then(_=>{
      this.app.getRootNav().setRoot(WelcomePage);
    })
  }

  pressEditProfile() {
    this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Change Profile Picture',
          handler: () => {
            console.log('Change Profile Picture clicked');
            this.gotoChangeProfile();
          }
        },{
          text: 'Change Password',
          handler: () => {
            console.log('Change Password clicked');
            this.gotoChangePassword();
          }
        },{
          text: 'Help',
          handler: () => {
            console.log('Help clicked');
            this.gotoHelp();
          }
        },{
          text: 'Sign out',
          handler: () => {
            console.log('Cancel clicked');
            this.signout();
          }
        }
      ]
    }).present();
  }

  gotoChangeProfile() {
    this.app.getRootNav().push(ChangeProfilePicturePage);
  }

  gotoChangePassword() {
    this.app.getRootNav().push(ChangePasswordPage);
  }

  gotoHelp() {

  }

  signout() {
    this.userProvider.logout().then(_=>{
      this.app.getRootNav().setRoot(WelcomePage);
    })
  }

}

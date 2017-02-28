import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { 
  NavController, 
  NavParams, 
  LoadingController,
  ToastController,
} from 'ionic-angular';
import { 
  FormGroup, 
  FormControl, 
  Validators } from '@angular/forms';

import { UserProvider } from '../../providers/user';

/*
  Generated class for the ChangePassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage {
  form      : FormGroup;
  submitted : boolean = false;
  currentPassword: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl  : LoadingController,
    public toastCtrl    : ToastController,
    public userProvider : UserProvider,
    public storage      : Storage
) {
    this.form = new FormGroup({
      currentpassword : new FormControl('', Validators.required),
      password        : new FormControl('', Validators.required),
      passwordconfirm : new FormControl('', Validators.required)
    });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
    this.storage.ready().then(() => {
      this.storage.get('password').then((value) => {
        this.currentPassword = value;
      })
    });
  }

  pressSave(form: FormGroup) {
    if (form.valid) {
      if (form.value.currentpassword != this.currentPassword) {
        this.toastCtrl.create({
          message: 'Current Password is incorrect. Confirm your password again.', 
          duration: 4500
        }).present();
        return;
      }
      if (form.value.password != form.value.passwordconfirm) {
        this.toastCtrl.create({
          message: 'New Password is incorrect. Confirm your password again.', 
          duration: 4500
        }).present();
        return;
      }
      let loading = this.loadingCtrl.create();
      loading.present();

      this.userProvider.changePassword(form.value.password).then((value) => {
        loading.dismiss();
        this.toastCtrl.create({
          message: 'Your password changed successfully.', 
          duration: 4500
        }).present();
        this.navCtrl.pop();
      }, (error) => {
        loading.dismiss();
        this.toastCtrl.create({
          message: error.message || JSON.stringify(error), 
          duration: 4500
        }).present();
      });
    }
  }


}

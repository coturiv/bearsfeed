import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { 
  FormGroup, 
  FormControl, 
  Validators } from '@angular/forms';

import { UserProvider } from '../../providers/user';
import { ProfileCompletePage } from './profile-complete';

@Component({
  selector: 'page-signup-password',
  templateUrl: 'signup-password.html'
})
export class SignupPasswordPage {
  form      : FormGroup;
  username  : string = '';
  email     : string = '';

  constructor(
    public navCtrl      : NavController, 
    public navParams    : NavParams,
    public loadingCtrl  : LoadingController,
    public toastCtrl    : ToastController,
    public userProvider : UserProvider
  ) {
    this.form = new FormGroup({
      password        : new FormControl('', Validators.required),
      confirmpassword : new FormControl('', Validators.required),
    });
    this.username = navParams.get('username');
    this.email    = navParams.get('email');
  }

  ionViewDidLoad() {}

  pressBack() {
    this.navCtrl.pop();
  }

  pressNext(form: FormGroup) {
    if (form.valid) {
      if (form.value.password != form.value.confirmpassword) {
        this.toastCtrl.create({message: 'Password is incorrect. Confirm your password again.', duration: 4500})
             .present();
        return;
      }
      this.navCtrl.push(ProfileCompletePage, {
        username: this.username,
        email   : this.email,
        password : form.value.password,
      })
    } else {
      this.toastCtrl.create({message: 'Please input your password.', duration: 4500})
      .present();
    }
  }
}

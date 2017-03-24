import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { 
  FormGroup, 
  FormControl, 
  Validators } from '@angular/forms';

import { SignupEmailPage } from './signup-email';
import { TabsPage } from '../tabs/tabs';

import { UserProvider } from '../../providers/user';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  form      : FormGroup;

  constructor(
    public navCtrl      : NavController, 
    public navParams    : NavParams,
    public loadingCtrl  : LoadingController,
    public toastCtrl    : ToastController,
    public userProvider : UserProvider
  ) {
    this.form = new FormGroup({
      username        : new FormControl('', Validators.required),
    });
  }

  ionViewDidLoad() {}

  doPageLogin() {
    this.navCtrl.pop();
  }

  pressBack() {
    this.navCtrl.pop();
  }

  pressNext(form: FormGroup) {
    if (form.valid) {
      this.navCtrl.push(SignupEmailPage, {
        username: this.form.value.username,
      })
    } else {
      this.toastCtrl.create({message: 'Please input your full name.', duration: 4500})
      .present();
    }
  }
}

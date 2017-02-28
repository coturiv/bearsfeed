import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { 
  FormGroup, 
  FormControl, 
  Validators } from '@angular/forms';

import { ProfileCompletePage } from './profile-complete';
import { TabsPage } from '../tabs/tabs';

import { UserProvider } from '../../providers/user';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  form      : FormGroup;
  submitted : boolean = false;

  constructor(
    public navCtrl      : NavController, 
    public navParams    : NavParams,
    public loadingCtrl  : LoadingController,
    public toastCtrl    : ToastController,
    public userProvider : UserProvider
  ) {
    this.form = new FormGroup({
      email           : new FormControl('', Validators.required),
      username        : new FormControl('', Validators.required),
      password        : new FormControl('', Validators.required),
      passwordconfirm : new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {}

  doSignup(form: FormGroup) {
    this.submitted = true;
    if (form.valid) {
      if (form.value.password != form.value.passwordconfirm) {
        this.toastCtrl.create({message: 'Password is incorrect. Confirm your password again.', duration: 4500})
             .present();
        return;
      }
        

        /*
        if ((form.value.email as string).indexOf('@berkshireschool.org') < 0) {
          this.toastCtrl.create({message: 'Invaild email format. Email should be has domain @berkshireschool.org.', duration: 4500})
             .present();
          return;
        } */
        
        // this.userProvider.signUpWithEmail(form.value).then((res : any) => {
        //   res.sendEmailVerification();
        //   this.navCtrl.setRoot(TabsPage)
        // });

      this.navCtrl.push(ProfileCompletePage, {user: form.value});
    } else {
      this.toastCtrl.create({message: 'Incorrect user information.', duration: 4500});
    }
  }

  doPageLogin() {
    this.navCtrl.pop();
  }
}

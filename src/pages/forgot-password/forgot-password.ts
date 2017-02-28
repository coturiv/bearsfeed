import { Component } from '@angular/core';
import { EmailComposer } from 'ionic-native';

import { NavController, 
         NavParams, 
         ToastController, 
         LoadingController,
         AlertController,
         Platform } from 'ionic-angular';
import { 
  FormGroup, 
  FormControl, 
  Validators } from '@angular/forms';

  import { UserProvider } from '../../providers/user';


@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  form      : FormGroup;
  submitted : boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userProvider: UserProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public platform: Platform
  ) {
    this.form = new FormGroup({
      email     : new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  onSubmit(form: FormGroup) {
    this.submitted = true;
    console.log(form);
    if (form.valid) {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.userProvider.resetPassword(form.value.email)
        .then(_=> {
          loading.dismiss();
          this.alertCtrl.create({
            title: 'Sent Mail',
            subTitle: 'Check your email for a link to reset your password. If it doesn\'t appear within a few minutes, check your spam folder.',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.doPageLogin();
                }
              },
            ]
          }).present();
        }, (error)=> {
          loading.dismiss();
          this.toastCtrl.create({message: error.message, duration: 4500})
            .present();
        });
    }
  }

  doPageLogin() {
    this.navCtrl.pop();
  }

  doEmailUs() {
    if(!this.platform.is('cordova')) {
      this.toastCtrl.create({
        message:'You can\'t open Email composer. You can only open this on mobile devices',
        duration:4500}
      ).present()
      return;
    }
    console.log("open email box");
    EmailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
    });

    let email = {
      to: 'max@mustermann.de',
      subject: 'There is a issue to login on BearsFeed iOS app',
      body: 'I can\'t login to app.',
      isHtml: true
    };

    // Send a text message using default options
    EmailComposer.open(email);
  }

}

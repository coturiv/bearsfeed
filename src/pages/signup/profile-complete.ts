import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ActionSheetController, LoadingController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { 
  FormGroup, 
  FormControl, 
  Validators } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';

import { UserProvider } from '../../providers/user';

@Component({
  selector: 'page-profile-complete',
  templateUrl: 'profile-complete.html',
})
export class ProfileCompletePage {
  form      : FormGroup;
  submitted : boolean = false;
  base64Image: any;

  user      : any;

  constructor(
    public navCtrl   : NavController, 
    public navParams : NavParams,
    public platform  : Platform,
    public loadingCtrl  : LoadingController,
    public userProvider : UserProvider,
    public actionSheetCtrl : ActionSheetController,
    public storage      : Storage
  ) {
    this.user = this.navParams.get('user');

    this.form = new FormGroup({
      photo : new FormControl(null),
      bio   : new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {}

  onSubmit(form: FormGroup) {
    this.submitted = true;
    if (form.valid && this.user) {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.user.photo = form.value.photo;
      this.user.bio   = form.value.bio;
      
      this.userProvider.completeProfile(this.user)
        .then(res=> {
          loading.dismiss();
          res.sendEmailVerification();
          this.navCtrl.setRoot(TabsPage);
          this.storage.ready().then(() => {
            this.storage.set('password', form.value.password);
          });

        })
        .catch((error)=> {
            loading.dismiss();
            console.log('Error: ' + JSON.stringify(error));
        });
    }
  }

  onUploadProfile() {
    if (this.platform.is('cordova')) {
      this.actionSheetCtrl.create({
        title: 'Take a photo from...',
        buttons: [
          {
            text : 'Camera',
            icon :'camera',
            handler : ()=> {
              this.photoFromCamera().then(imgData => this.form.controls['photo'].setValue(imgData));
            }
          },
          {
            text : 'Library',
            icon :'images',
            handler : ()=> {
              this.photoFromCamera().then(imgData => this.form.controls['photo'].setValue(imgData));
            }
          },{
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      }).present();
    }
  }

  photoFromCamera() {
    return Camera.getPicture({sourceType: Camera.PictureSourceType.CAMERA});
  }

  photoFromLibrary() {
    return Camera.getPicture({sourceType: Camera.PictureSourceType.PHOTOLIBRARY});
  }
}

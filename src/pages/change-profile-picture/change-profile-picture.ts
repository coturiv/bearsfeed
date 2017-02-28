import { Component } from '@angular/core';
import { 
  NavController, 
  NavParams, 
  Platform, 
  ActionSheetController, 
  LoadingController,
  ToastController } from 'ionic-angular';
import { 
  FormGroup, 
  FormControl, 
  Validators } from '@angular/forms';
import { Camera } from 'ionic-native';

import { UserProvider } from '../../providers/user';

/*
  Generated class for the ChangeProfilePicture page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-change-profile-picture',
  templateUrl: 'change-profile-picture.html'
})
export class ChangeProfilePicturePage {

  form      : FormGroup;
  submitted : boolean = false;
  base64Image: any;

  user      : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform  : Platform,
    public loadingCtrl  : LoadingController,
    public userProvider : UserProvider,
    public actionSheetCtrl : ActionSheetController,
    public toastCtrl    : ToastController

  ) {
    this.user = this.navParams.get('user');

    this.form = new FormGroup({
      photo : new FormControl(null),
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeProfilePicturePage');
  }

  onSubmit(form: FormGroup) {
    this.submitted = true;
    if (form.valid && this.user) {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.user.photo = form.value.photo;
      
      this.userProvider.completeProfile(this.user)
        .then(res=> {
          loading.dismiss();
          this.navCtrl.pop();
        })
        .catch((error)=> {
            loading.dismiss();
            let errorMessage = 'Error: ' + JSON.stringify(error);
            this.toastCtrl.create({message: errorMessage, duration: 4500})
              .present();
        });
    }
  }

  pressSelectPhoto() {
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

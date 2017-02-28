import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import * as firebase from 'firebase'

declare var window: any;

export class UserModel {
  uid       ?: string;
  username  ?: string;
  fullname  ?: string;
  password  ?: string;
  email     ?: string;
  avatar    ?: string;
  gender    ?: string;
  birthday  ?: string;
  language  ?: string;
  phone     ?: string;
  aboutme   ?: string;
  status    ?: string;
}


@Injectable()
export class UserProvider {
  data : Array<UserModel>;
  user : any;

  constructor( private af: AngularFire ) {

  }

  getAuth() {
    return this.af.auth.first();
  }

  // get currentUser(): Observable<any> {
  //   return Observable.create(observer => {
  //     this.af.auth.subscribe(auth => {
  //       this.af.database.object('users/' + auth.uid)
  //         .subscribe(user => observer.next(user), (error)=> observer.error(error));
  //     }, (error)=> observer.error(error));
  //   });
  // }

  get currentUser() {
    return this.getAuth().flatMap(auth => {
      return this.af.database.object('users/' + auth.uid)
    });
  }

  getUser(uid?: string) {
    console.log(uid);
    return this.af.database.object('users/' + uid);
  }

  signInWithEmail(user: UserModel): firebase.Promise<any> {
    return this.af.auth.login({
      email: user.email, 
      password: user.password
    }, {
      provider: AuthProviders.Password, method: AuthMethods.Password
    });
  }

  signUpWithEmail(user: UserModel) {
    return new Promise((resolve, reject) => {
      this.af.auth.createUser({
        email    : user.email,
        password : user.password
      }).then(authData => {
        this.af.database.object('users/' + authData.uid)
          .set({
            uid         : authData.uid || authData.auth.uid,
            email       : user.email,
            password    : user.password,
            username    : user.username,
            createdAt   : firebase.database['ServerValue']['TIMESTAMP']
          }).then(_=> resolve(authData.auth))
            .catch(error => reject(error));
      }).catch(error => reject(error));
    })
  }

  completeProfile(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.af.auth.createUser({
        email    : user.email,
        password : user.password
      }).then(authData => {
        this.uploadFile(user.photo).then(res => {
          this.af.database.object('users/' + authData.uid).set({
            email    : user.email,
            username : user.username,
            password : user.password,
            bio  : user.bio,
            photo: res.downloadURL,
            createdAt: firebase.database['ServerValue']['TIMESTAMP']
          }).then(_=>resolve(), error=> reject(error));
        });
      });
    });
  }

  changePassword(password: string): firebase.Promise<void> {
      let currentUser = firebase.auth().currentUser;
      return currentUser.updatePassword(password);
  }

  updateBio(bio: string) {
    return new Promise((resolve, reject) => {
      this.getAuth().subscribe(auth => {
        this.af.database.object('users/' + auth.uid).update({bio: bio})
          .then(_=>resolve(), (error)=>reject(error));
      }, (error) => reject(error));
    });
  }
  
  uploadFile(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getBlob(path).then(blob => {
        let filename = path.split('/').pop();
        console.log(blob);
        firebase.storage().ref()
                          .child('profiles/' + filename)
                          .put(blob)
                          .then(res =>resolve(res))
                          .catch(error => reject(error));
      })
    })
  }

  getBlob(path: string): Promise<any> {
    return new Promise((resolve, reject)=>{
      window.resolveLocalFileSystemURL(path, (fileEntry)=> {
        fileEntry.file(file => {
          const fileReader = new FileReader();
          fileReader.onloadend = (res: any) => resolve(new Blob([new Uint8Array(res.target.result)], {type: file.type}));
          fileReader.onerror = (error: any) => reject(error);
          fileReader.readAsArrayBuffer(file);
        });
      });
    });
  }

  logout() {
    return this.af.auth.logout();
  }

  get allUsers() {    
    return this.af.database.list('users/');
  }

  resetPassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

}

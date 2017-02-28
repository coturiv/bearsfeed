import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { UserProvider } from './user';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

declare var window: any;

export class GalleryModel {
  id       ?: string;
  title    ?: string;
  photo    ?: string;
  userId   ?: string;
  location ?: string;
}


@Injectable()
export class GalleryProvider {

  constructor(public af: AngularFire, public userProvider: UserProvider) {}

  getGalleries( uid?: string ) {
    let galleries = this.af.database.list('galleries');
    if (!uid)
      return galleries;
    
    return galleries.map(items => {
      return items.filter(item => item.userId === uid);
    });
  }
  
  postGallery(gallery: GalleryModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.uploadFile(gallery.photo).then(res => {
        this.af.database.list('galleries/').push({
          title: gallery.title,
          photo: res.downloadURL,
          userId: gallery.userId,
          createdAt: firebase.database['ServerValue']['TIMESTAMP']
        }).then(_=>resolve(), error=> reject(error));
      });
    });
  }
  
  uploadFile(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getBlob(path).then(blob => {
        let filename = path.split('/').pop();
        firebase.storage().ref()
                          .child('gallery/' + filename)
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

  //like gallery
  likeGallery(gallery: any) {
    return new Promise((resolve, reject) => {
      this.userProvider.getAuth().subscribe(auth=> {
        this.af.database.object('gallery_likes/' + gallery.$key + '/' + auth.uid).first().subscribe(res=> {
          // console.log(res);
          if (res.$value !== null) {
            reject(res);
          } else {
            this.af.database.object('galleries/' + gallery.$key).first().subscribe(gallery => {
              console.log(gallery);
              let like = {};
              like[auth.uid] = true;
              let newCount = (gallery.likeCount ? gallery.likeCount : 0) + 1
              Promise.all([
                this.af.database.object('galleries/' + gallery.$key).update({likeCount: newCount}),
                this.af.database.object('gallery_likes/' + gallery.$key).update(like)
              ]).then(_=> resolve(), (error)=>reject(error));
            });
          }
        });
      });
    });
  }

  //unlike gallery
  unLikeGallery(gallery: any) {
    return new Promise((resolve, reject) => {
      this.userProvider.getAuth().subscribe(auth=> {
        this.af.database.object('gallery_likes/' + gallery.$key + '/' + auth.uid).first().subscribe(res=> {
          if (res.$value === null) {
            reject(null);
          } else {
            this.af.database.object('galleries/' + gallery.$key).first().subscribe(gallery => {
              let newCount = (gallery.likeCount ? gallery.likeCount : 0) - 1
              console.log(gallery.likeCount);
              Promise.all([
                this.af.database.object('galleries/' + gallery.$key).update({likeCount: newCount}),
                this.af.database.list('gallery_likes/' + gallery.$key).remove(auth.uid)
              ]).then(_=> resolve(), (error)=>reject(error));
            });
          }
        });
      });
    });
  }

  //comment gallery
  galleryComment(comment: string, gallery: any) {
    return new Promise((resolve, reject) => {
      this.userProvider.getAuth().subscribe(auth => {
        this.af.database.list('gallery_comments/' + gallery.$key).push({
          comment: comment,
          userId: auth.uid,
          createdAt: firebase.database['ServerValue']['TIMESTAMP']
        }).then(_=>resolve(), (error)=>reject(error));
      }, (error)=> reject(error));
    });
  }
}

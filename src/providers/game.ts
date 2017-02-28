import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';

import { UserProvider } from './user';


@Injectable()
export class GameProvider {

  constructor(
    public af: AngularFire, 
    public userProvider: UserProvider
  ) {}

  begin() {

  }

  join(): Promise<any> {
    return new Promise((resolve, reject) => {
      // this.af.database.object('bear_game/temp').subscribe(temp => {
      //   if (temp.$value === null) {
      //     reject({message: 'New Game didn\'t ready yet.'});
          
      //     this.userProvider.getAuth().subscribe(auth => {
      //       this.af.database.object('bear_game')
      //     })
      //     return;
      //   }

      //   if (this.af)

      //   this.userProvider.getAuth().subscribe(auth => {
      //     this.af.database.object('bear_game/now/members' + auth.uid).subscribe(member => {
      //       if (member.$value !== null) {
      //         reject({message: 'You already joined this game.'});
      //       } else {
      //         let obj = {};
      //         obj[auth.uid];
      //         this.af.database.object('bear_game/now/members').update(obj)
      //           .then(_=> resolve());
      //       }
      //     });
      //   });
      // })
    });
  }

  get myTarget() {
    // this.af.database.list('bear_game/now/members/').flatMap(members)
    return;
  }

  elimate(target: any) {

  }

}

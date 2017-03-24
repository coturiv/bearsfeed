import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { AngularFire } from 'angularfire2';

import { UserProvider, UserModel } from './user';


@Injectable()
export class GameProvider {

  constructor(
    public af: AngularFire, 
    public userProvider: UserProvider
  ) {}

  startGame(users: Array<any>): Promise<any> {
    let game = {};
    game['game_start'] = true;
    // this.af.database.object('game').update({game_start: true});
    // this.af.database.list('game').remove('eliminated');
    let objs = {};
    for (let i = 0; i < users.length; i++) {
      objs[users[i].$key] = true;
    }
    game['live'] = objs;
    return new Promise(resolver => {
      this.af.database.object('game').set(game).then(result => {
        resolver(true);
      }, error => {
        resolver(false);
      })
    })
     
  }

  stopGame(): Promise<any> {
    let game = {};
    game['game_start'] = false;
    return new Promise(resolver => {
      this.af.database.object('game').set(game).then(result => {
        resolver(true);
      }, error => {
        resolver(false);
      })
    })
  }

  checkGameStarted(): Promise<any> {
    return new Promise((resolve) => {
      this.af.database.object('game/game_start').first().subscribe(res => {
        if (res.$value == null) {
          resolve(false);
        } else {
          resolve(res.$value);
        }
      });
    });
  }

  checkEliminatedMe(uid: string): Promise<any> {
    return new Promise((resolve) => {
      this.af.database.object('game/eliminated/' + uid).first().subscribe(res => {
        resolve(!(res.$value == null));
      })
    })
  }

  getEliminateTarget(uid: string): Promise<any> {
    return new Promise((resolve) => {
      this.af.database.list('game/live').first().subscribe(usersRes => {
        let rndIndex = Math.floor(Math.random() * usersRes.length);
        let myScore = null;
        if (uid == usersRes[rndIndex].$key) {
          myScore = Object.keys(usersRes[0]).length * 100;
          if (rndIndex < usersRes.length - 1) {
            rndIndex += 1;
          } else {
            rndIndex -= 1;
          }
          if (rndIndex < 0) {
            resolve(null);
            return;
          }
        }
        if (myScore == null) {
          usersRes.forEach(element => {
            if (uid == element.$key) {
              // console.log('===========');
              // console.log(element);
              if (element.$key == null) {
                myScore = Object.keys(element).length * 100;
              } else {
                myScore = 0;
              }
              return;
            }
          });
        }
        let selectedUserid = usersRes[rndIndex].$key;
        this.af.database.object('users/' + selectedUserid).first().subscribe(oneUser => {
          let data = {
            user: oneUser,
            leftCount: usersRes.length - 1,
            score: myScore,
          }
          resolve(data);
        })
      })
    })
  }

  elimate(target: any, uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let obj = {};
      obj[target.$key] = true;
      this.af.database.object('game/eliminated/').update(obj).then(result => {
        this.af.database.object('game/live/' + uid + '/').update(obj);
        this.af.database.list('game/live/').remove(target.$key).then(_=> {
          resolve(true);
        });
      }, error => {
        reject(false);
        console.log(error);
      })
      /*
      this.af.database.object('game/eliminated/' + target.$key).update(true).then(result => {
        // this.af.database.object('game/live/' + uid + '/' + target.$key).update(true);
        // this.af.database.list('game/live/').remove(target.$key).then(_=> {
          response(true);
        // });
      }) */
    })
  }

  realtimeCheckEliminateMe(uid: string): Observable<any> {
    return this.af.database.object('game/eliminated/' + uid);
    // return new Promise((resolve) => {
    //   this.subscriberEliminatedChecker = this.af.database.object('game/eliminated/' + uid).subscribe(result => {
    //     console.log("eliminated realtime check");
    //     console.log(result);
    //     if (result.$value != null) {
    //       resolve(true);
    //     } else {
    //       resolve(false);
    //     }
    //   })
    // })
  }

  getEliminatedTargets(userId: string): Observable<any> {
    return this.af.database.list('game/live/' + userId).flatMap(eliminatedList => {
      return this.af.database.list('users/').map(users => {
        return users.filter(user => {
          for (let i=0; i<eliminatedList.length; i++) {
            if (eliminatedList[i].$key == user.$key)
              return user;
          }
        });
      });
    });
  }

  getGameUserCount(): Observable<any> {
    return this.af.database.list('users');
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

}

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

export class UserModel {
  id        ?: string;
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

  constructor() {}

  get allUsers(): Array<UserModel> {
    this.data = [];

    this.data = [
      { 
        fullname: 'Rey', 
        avatar: 'https://lh6.googleusercontent.com/-tDkglZ3TTT4/AAAAAAAAAAI/AAAAAAAAAU0/Pr7FJK6RdOA/photo.jpg',
        aboutme: 'Frontend Develoepr'
      },
      { 
        fullname: 'Poe', 
        avatar: 'https://lh4.googleusercontent.com/-43VY7F2E0H8/AAAAAAAAAAI/AAAAAAAAAHQ/2cfLhfB1d5g/photo.jpg',
        aboutme: 'Graphic Designer'
      },
      { 
        fullname: 'Gollum', 
        avatar: 'https://avatars.githubusercontent.com/u/3453385?v=3',
        aboutme: 'Backend Develoepr'
      },
      { 
        fullname: 'Frodo', 
        avatar: 'https://lh4.googleusercontent.com/-c7sb9nOAh3o/AAAAAAAAAAI/AAAAAAAAABI/FXxvSR__kqk/photo.jpg',
        aboutme: 'QA Tester'
      },
      { 
        fullname: 'Jacob Bøtter', 
        avatar: 'https://avatars.githubusercontent.com/u/1336222?v=3',
        aboutme: 'Assistant'
      },
      { 
        fullname: 'Dawit Fikre', 
        avatar: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/15780750_1140690622696689_4873699240284209794_n.jpg?oh=349a85dcba22a0c9f084699f08983494&oe=590DA70B',
        aboutme: 'Assistant'
      },
      { 
        fullname: 'Rudy Dubos', 
        avatar: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/13606591_10207419947722929_540625071522660296_n.jpg?oh=484d3a7c0963f7f50f732c85ede3be23&oe=5922BB48',
        aboutme: 'Assistant'
      },
      { 
        fullname: 'Carlos Fernandez', 
        avatar: 'https://scontent.xx.fbcdn.net/v/t1.0-1/s100x100/418284_3704056874112_588452353_n.jpg?oh=7da0e7e5f3e9d17141d78ad773f7c13d&oe=5907DD08',
        aboutme: 'Assistant'
      }
    ]
    
    return this.data;
  }

}

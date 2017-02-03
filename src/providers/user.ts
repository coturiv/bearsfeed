import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

export class UserModel {
  id        ?: string;
  username  ?: string;
  fullname  ?: string;
  password  ?: string;
  email     ?: string;
  gender    ?: string;
  birthday  ?: string;
  language  ?: string;
  phone     ?: string;
  status    ?: string;
}


@Injectable()
export class UserProvider {

  constructor() {}

}

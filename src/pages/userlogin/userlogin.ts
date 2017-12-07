import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IonicPage, NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserSign } from '../../interfaces/user-options';
import { LoginsPage } from "../logins/logins";

@IonicPage()
@Component({
  selector: 'page-userlogin',
  templateUrl: 'userlogin.html',
})
export class UserloginPage {

  login: UserSign = { username: '', password: '' , RealName: '', StuNo: '', phone: ''};
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData) { }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      // this.userData.login(this.login.username);
      this.navCtrl.push(LoginsPage);
    }
  }

}

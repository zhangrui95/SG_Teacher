import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { UsersPage } from "../users/users"
import { UserloginPage } from "../userlogin/userlogin";

@Component({
  selector: 'page-logins',
  templateUrl: 'logins.html',
})
export class LoginsPage {

  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.navCtrl.push(UsersPage);
    }
  }

  onSignup() {
    this.navCtrl.push(UserloginPage);
  }

}

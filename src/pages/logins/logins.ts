import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { UsersPage } from "../users/users"
import { UserloginPage } from "../userlogin/userlogin";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'page-logins',
  templateUrl: 'logins.html',
})
export class LoginsPage {

  login: UserOptions = { username: '', password: '' };
  submitted = false;
  IP_PORT = 'http://localhost:8080';
  PROJECT_PATH = '/VisualizationMgt'
  BASE_URL = this.IP_PORT + this.PROJECT_PATH;

  constructor(public navCtrl: NavController, public userData: UserData, public http: HttpClient) { }

  onLogin(form: NgForm) {
    this.submitted = true;
    this.navCtrl.push(UsersPage);
    if (form.valid) {
      this.userData.login(this.login.username);
      // let param = {LoginName: this.login.username, LoginPwd: this.login.password};
      // this.http.get( this.BASE_URL + '/userstu/login.do', param).subscribe(res => {
      //   console.log(res);
      //   this.navCtrl.push(UsersPage);
      // });
    }
  }

  onSignup() {
    this.navCtrl.push(UserloginPage);
  }

}

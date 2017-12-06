import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PasswordPage } from "../password/password"
import { PhonePage } from '../phone/phone'
import { UpdatePage } from '../update/update'
@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }
  goChangePhone(){
    this.navCtrl.push(PhonePage);
  }
  goChangePassword(){
    this.navCtrl.push(PasswordPage);
  }
  goUpdate(){
    this.navCtrl.push(UpdatePage);
  }

}

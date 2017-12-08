import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UsersPage} from "../users/users";
import {ClassroomPage} from "../classroom/classroom";

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  name;
  phone;
  userId;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = navParams.get('name');
    this.phone = navParams.get('phone');
    this.userId = navParams.get('userId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
  }

  getUser(){
    this.navCtrl.push(UsersPage, {userId: this.userId, name:this.name, phone:this.phone});
  }

  getClassRoom(){
    this.navCtrl.push(ClassroomPage, {userId: this.userId, name:this.name, phone:this.phone});
  }

}

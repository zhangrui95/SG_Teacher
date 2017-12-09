import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GroupingPage} from "../grouping/grouping";


@IonicPage()
@Component({
  selector: 'page-classroom',
  templateUrl: 'classroom.html',
})
export class ClassroomPage {
  gender;
  items = ['事件起因','第一次决策','第一次场景演练','第一次头脑风暴','第二次决策']
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassroomPage');
  }

  goGrouping(){
    this.navCtrl.push(GroupingPage);
  }

}

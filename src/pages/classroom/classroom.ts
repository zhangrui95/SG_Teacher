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
  items = [{name:'事件起因',type: '0'},{name:'第一次决策',type:'1'},{name:'第一次场景推演',type:'2'},{name:'第一次头脑风暴',type:'3'},{name:'第二次决策',type:'1'}]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassroomPage');
  }

  goGrouping(){
    this.navCtrl.push(GroupingPage);
  }

}

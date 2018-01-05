import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-call-name',
  templateUrl: 'call-name.html',
})
export class CallNamePage {
  list = [{name:'张三'},{name:'李四'},{name:'王二'},{name:'张菲菲'},{name:'马拉西亚'},{name:'李四'},{name:'王二'},{name:'李四'},{name:'王二'},{name:'张菲菲'},{name:'马拉西亚'},{name:'李四'},{name:'王二'},{name:'张菲菲'},{name:'马拉西亚'}]
  StuIndex;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CallNamePage');
  }

  callStu(i){
    this.StuIndex = i;
  }

}

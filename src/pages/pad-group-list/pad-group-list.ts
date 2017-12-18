import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pad-group-list',
  templateUrl: 'pad-group-list.html',
})
export class PadGroupListPage {

  list = [
    {name:'辉发乳业',num:'10',student:'张三、李四、王五、张三、李四、王五、张三、李四、王五、张三、李四、王五、张三、李四、王五、张三、李四、王五'},
    {name:'三特食品',num:'20',student:'张三、李四'},
    {name:'地方政府',num:'36',student:'张三、李四、王五、张三'},
    {name:'当事人',num:'89',student:'张三、李四、王五、张三、李四、王五'},
    {name:'群众',num:'44',student:'张三、李四、王五、张三、李四、王五、张三、李四、王五'},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pad-group',
  templateUrl: 'pad-group.html',
})
export class PadGroupPage {

  list = [
          {name:'辉发乳业',num:'10'},
          {name:'三特食品',num:'20'},
          {name:'地方政府',num:'36'},
          {name:'当事人',num:'89'},
          {name:'群众',num:'44'},
         ];
  style = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    for(let i in this.list){
      let num = this.list[i].num
      this.style.push({width:+ num +'%'})
    }
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-rsidebar',
  templateUrl: 'rsidebar.html',
})
export class RsidebarPage {
  list = [
    {name:'分组',img:'assets/img/group.png',bgColor: true,key:false},
    {name:'继续',img:'assets/img/go.png',bgColor: false,key:false},
    {name:'详情',img:'assets/img/detail.png',bgColor: false,key:false},
    {name:'投屏',img:'assets/img/view.png',bgColor: false,key:false},
    {name:'',img:'assets/img/key.png',bgColor: false,key:true},
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RsidebarPage');
  }
  bgChange(index){
    for(let i in this.list){
      this.list[i].bgColor = false;
    }
    this.list[index].bgColor = true;
  }

}

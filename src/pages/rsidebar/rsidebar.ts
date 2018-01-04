import {Component, EventEmitter, Output} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-rsidebar',
  templateUrl: 'rsidebar.html',
})
export class RsidebarPage {
  list = [
    {type:'group',name:'分组',img:'assets/img/group.png',bgColor: true,key:false},
    {type:'next',name:'继续',img:'assets/img/go.png',bgColor: false,key:false},
    {type:'detail',name:'详情',img:'assets/img/detail.png',bgColor: false,key:false},
    {type:'screen',name:'投屏',img:'assets/img/view.png',bgColor: false,key:false},
    {type:'',name:'',img:'assets/img/key.png',bgColor: false,key:true},
  ]
  @Output()
  onNext= new EventEmitter<string>();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RsidebarPage');
  }
  bgChange(index){
    if(this.list[index].type=='next'){
      this.onNext.emit("next")
    }
    if(this.list[index].type=='screen'){
      this.onNext.emit("screen")
    }

    for(let i in this.list){
      this.list[i].bgColor = false;
    }
    this.list[index].bgColor = true;
  }

}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GroupBean} from "../../providers/ProcessJSONUtil";
import {UserData} from "../../providers/user-data";

@IonicPage()
@Component({
  selector: 'page-rsidebar',
  templateUrl: 'rsidebar.html',
})
export class RsidebarPage {
  // list = [
  //   {type:'group',name:'分组',img:'assets/img/group.png',bgColor: true,key:false},
  //   {type:'next',name:'继续',img:'assets/img/go.png',bgColor: false,key:false},
  //   {type:'detail',name:'详情',img:'assets/img/detail.png',bgColor: false,key:false},
  //   {type:'screen',name:'投屏',img:'assets/img/view.png',bgColor: false,key:false},
  //   {type:'',name:'',img:'assets/img/key.png',bgColor: false,key:true},
  // ]
  showList = false;
  @Input()
  groupList=new GroupBean()
  @Output()
  onNext= new EventEmitter<any>();
  @Input() sType;

  isGold=false;


  constructor(public navCtrl: NavController, public navParams: NavParams,public userData :UserData) {
  }
  ionViewDidLoad() {
    this.userData.getSimType().then(value => {
      if(value=='gold'){
        this.isGold=true
      }
    })
    console.log('ionViewDidLoad RsidebarPage');
  }
  onScreen(){
    this.onNext.emit("screen")
  }
  onGoNext(){
    this.onNext.emit("next")
  }
  onInput(){
      this.onNext.emit("InputShow");
  }
  onGroupChange(gid){

    this.showList = false;
    this.onNext.emit({g_id:gid,action:'groupChange'});
  }
  resetTimer(){
    this.onNext.emit("reset");
  }
  onGoDetail(){
    this.onNext.emit("detail");
  }
  groupListShow(){
    this.resetTimer()
    this.showList = true;
  }
  groupListHide(){
    this.resetTimer()
    this.showList = false;
  }
  getMapShow(){
    this.onNext.emit("mapShow");
  }

}

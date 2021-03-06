import {Component, EventEmitter, Input, Output} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommentPage} from "../comment/comment";
import {CurrentGroupPage} from "../current-group/current-group";
import {CallNamePage} from "../call-name/call-name";


@IonicPage()
@Component({
  selector: 'page-operation',
  templateUrl: 'operation.html',
})
export class OperationPage {
  showBtn = false;
  showAnimate=false;
  @Input() SimId;
  @Input() nId;
  @Input() gid;
  @Output() ev:EventEmitter<any>= new EventEmitter<any>();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperationPage');
  }

  getBtn(){
    if(!this.showBtn){
      this.showBtn = true;
    }else{
      this.showBtn = false;
    }
  }

  showBg(){
    this.sendEv()
    this.showAnimate = true;
    this.showBtn = true;
  }

  hideBg(){
    this.sendEv()
    this.showBtn = false;
  }

  goComment(){
    this.navCtrl.push(CommentPage,{sim_id: this.SimId});
  }

  goCurrentGroup(){
    if(this.gid=='-1'){
      //todo 提示 本次演练暂未分组，不能进行角色分配
    }else{
      this.navCtrl.push(CurrentGroupPage,{sim_id: this.SimId,n_id:this.nId});
    }

  }

  goCallName(){
    this.navCtrl.push(CallNamePage,{sim_id: this.SimId,n_id:this.nId});
  }

  sendEv(){
    this.ev.emit("reset");
  }
}

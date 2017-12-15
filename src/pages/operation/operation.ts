import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-operation',
  templateUrl: 'operation.html',
})
export class OperationPage {
  showBtn = false;
  list = [
    {name:'点名',style:{top:'0px',left:'10px'},bgShow:false},
    {name:'讨论',style:{top:'10px',left: '110px'},bgShow:false},
    {name:'事件',style:{bottom:'110px',right: '10px'},bgShow:true},
    {name:'角色',style:{bottom:'10px',right: '0px'},bgShow:false}
    ]
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

  showBg(index){
    for(let i in this.list){
      this.list[i].bgShow = false;
    }
    this.list[index].bgShow = true;
  }
}

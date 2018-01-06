import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import {ProxyHttpService} from "../../providers/proxy.http.service";


@IonicPage()
@Component({
  selector: 'page-current-group',
  templateUrl: 'current-group.html',
})
export class CurrentGroupPage {
  list;
  PIndex;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController, public http: ProxyHttpService) {
  }
  box = [{roleDatas:'', roleNum:''}];
  num = [];
  roleDatas = [];

  ionViewDidLoad() {
    const params = {sim_id: '18'}
    this.http.getGroupDetail(params).subscribe(res => {
      console.log(res);
      this.list = res;
      for(let i in res){
        this.num.push(res[i].listStus.length);
      }
    });

  }

  pChoice(i){
    this.PIndex = i;
  }
  add(){
    this.box.push({roleDatas:'', roleNum:''});
  }
  del(index){
    if(this.box.length == 1){
      this.showToast('bottom', '至少填写一条');
    }else{
      this.box.splice(index, 1);
    }
  }

  back(){
    window.history.back();
  }
  getOk(){
    for(let i in this.box){
      this.roleDatas[i] = {roleName: this.box[i].roleDatas, roleNum:this.box[i].roleNum.toString()}
    }
    const params = {sim_id: '18', g_id: this.list[this.PIndex].g_id, roleDatas: this.roleDatas}
    this.http.addRoleForGro(params).subscribe(res => {
      this.showToast('bottom', res['msg']);
    })
  }

  showToast(position: string, text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }
}

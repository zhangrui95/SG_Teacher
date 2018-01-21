import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {UserData} from "../../providers/user-data";


@IonicPage()
@Component({
  selector: 'page-current-group',
  templateUrl: 'current-group.html',
})
export class CurrentGroupPage {
  list;
  PIndex;
  sim_id;
  n_id;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController, public http: ProxyHttpService,public userData:UserData) {
    this.n_id = this.navParams.get('n_id');
  }
  box = [{roleDatas:'', roleNum:''}];
  num = [];
  roleDatas = [];

  ionViewDidLoad() {
    this.userData.getSimid().then(val=>{
      this.sim_id=val;
      const params = {sim_id:this.sim_id}
      this.http.getGroupDetail(params).subscribe(res => {
        console.log(res);
        this.list = res;
        for(let i in res){
          this.num.push(res[i].listStus.length);
        }
      });
    })
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
    this.navCtrl.pop();
  }
  getOk(){
    let roleName;
    let roleNum;
    for(let i in this.box){
      roleName = this.box[i].roleDatas;
      roleNum = this.box[i].roleNum;
      this.roleDatas[i] = {roleName: roleName, roleNum: roleNum.toString()}
    }
    if(roleName === ''||roleNum === ''){
      this.showToast('bottom', '角色名称和人数不能为空');
    }else if(roleNum <= 0){
      this.showToast('bottom', '人数最少为1');
    }else{
      console.log(this.n_id);
      const params = {n_id: this.n_id, sim_id: this.sim_id, g_id: this.list[this.PIndex].g_id, roleDatas: this.roleDatas}
      this.http.addRoleForGro(params).subscribe(res => {
        this.showToast('bottom', res['msg']);
      });
    }
  }

  showToast(position: string, text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }

  getFullpath(path){
    return  this.http.getBaseurl()+path
  }
}

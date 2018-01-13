import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {UserData} from "../../providers/user-data";


@IonicPage()
@Component({
  selector: 'page-call-name',
  templateUrl: 'call-name.html',
})
export class CallNamePage {
  list = [];
  StuIndex;
  sim_id;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public http: ProxyHttpService,
              public userData:UserData) {
    this.userData.getSimid().then(val=>{
      this.sim_id=val;
    })
  }

  ionViewDidLoad() {
    // const params = {sim_id: this.sim_id}
    const params = {sim_id: this.userData}
    this.http.getAllStuList(params).subscribe(res => {
      this.list  = res['stuList'];
    });
  }
  inRandom=false;

  randomCheck(){
    if(this.inRandom){
      return
    }
    this.inRandom=true;
    let times=0;
    let int=setInterval(()=>{
      times++
      if(times<=20){
        let random=Math.floor(Math.random()*this.list.length)
        console.log(random)
        this.StuIndex =random

      }else{
        clearInterval(int)
        this.inRandom=false;
      }
    },500);
    // this.StuIndex
  }
  callStu(i){
    this.StuIndex = i;
  }

  callName(){
    let u_id = this.list[this.StuIndex]['Id'];
    const params = {u_id: u_id}
    this.http.getPushCallStuId(params).subscribe(res => {
      this.showToast('bottom', res['msg']);
    });
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

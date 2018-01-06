import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ProxyHttpService} from "../../providers/proxy.http.service";


@IonicPage()
@Component({
  selector: 'page-call-name',
  templateUrl: 'call-name.html',
})
export class CallNamePage {
  list = [];
  StuIndex;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public http: ProxyHttpService) {
  }

  ionViewDidLoad() {
    const params = {sim_id: '18'}
    this.http.getAllStuList(params).subscribe(res => {
      this.list  = res['stuList'];
    });
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

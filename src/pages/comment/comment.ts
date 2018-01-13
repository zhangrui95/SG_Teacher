import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ProxyHttpService} from "../../providers/proxy.http.service";

import { UUID } from 'angular2-uuid';
import {UserData} from "../../providers/user-data";
@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  content;
  sim_id;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams, public http: ProxyHttpService,public userData:UserData) {
    this.userData.getSimid().then(val=>{
      this.sim_id=val;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  back(){
    window.history.back();
  }

  getcomment(){
    let uuid = UUID.UUID();
    console.log(uuid)
    // const params = {sim_id: this.sim_id, n_id: '112334134', title: '讨论', content: this.content}
    const params = {sim_id: this.sim_id, n_id: uuid, title: '讨论', content: this.content}
    this.http.addDiscussion(params).subscribe(res => {
      if(res['code'] == '0'){
        this.showToast('bottom', res['msg']);
        this.content = '';
      }else{
        this.showToast('bottom', res['msg']);
      }
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

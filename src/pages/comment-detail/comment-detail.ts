import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {UserData} from "../../providers/user-data";
import { UUID } from 'angular2-uuid';

@IonicPage()
@Component({
  selector: 'page-comment-detail',
  templateUrl: 'comment-detail.html',
})
export class CommentDetailPage {
  list;
  commentList = [];
  commentNum;
  StuNum;
  StuNumList = [];
  StuIndex = 0;
  sim_id;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: ProxyHttpService,public userData:UserData) {
    this.userData.getSimid().then(val=>{
      this.sim_id=val;
    })
  }

  ionViewWillEnter() {
    this.getComment();
  }

  getComment(){
    let uuid = UUID.UUID();
    const params = {sim_id: this.sim_id, n_id: uuid}
    this.http.getComment(params).subscribe(res => {
      this.list = res['stuList'];
      this.StuNum = res['stuList'].length;
      this.commentList = res['stuList'][0].commentList;
      this.commentNum = this.commentList.length;
      for(let i in this.list){
        this.StuNumList.push(res['stuList'][i].commentList.length);
      }
    });
  }
  getStuClick(i){
    this.commentList = this.list[i].commentList;
    this.commentNum = this.commentList.length;
    this.StuIndex = i;
  }

}

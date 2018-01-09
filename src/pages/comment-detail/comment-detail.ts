import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProxyHttpService} from "../../providers/proxy.http.service";

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: ProxyHttpService) {
  }

  ionViewWillEnter() {
    this.getComment();
  }

  getComment(){
    const params = {sim_id: '18', n_id:'6'}
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

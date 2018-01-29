import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {UserData} from "../../providers/user-data";

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
  n_id;
  noDate = false;
  noComment = false;
  day
  simType
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: ProxyHttpService,public userData:UserData) {
    this.day=this.navParams.get('day');
    this.n_id = this.navParams.get('n_id');
    this.simType = this.navParams.get('simType');
  }

  ionViewWillEnter() {
    this.getComment();
  }
  getFullPath(path){
    return this.http.getBaseurl()+path
  }
  getComment(){
    this.userData.getSimid().then(val=>{
      this.sim_id=val;
      if(this.day==0){
        this.day=1
      }
      if(this.simType!='gold'){
        this.day='1'
      }
      const params = {sim_id: this.sim_id, n_id: this.n_id,day:this.day+''}
      this.http.getComment(params).subscribe(res => {
        if(res['stuList'] == ''){
          this.noDate = true;
        }else{
          this.noDate = false;
          this.list = res['stuList'];
          this.StuNum = res['stuList'].length;
          if(res['stuList'][0].commentList == ''){
            this.noComment = true;
          }else{
            this.noComment = false;
            this.commentList = res['stuList'][0].commentList;
            this.commentNum = this.commentList.length;
            for(let i in this.list){
              this.StuNumList.push(res['stuList'][i].commentList.length);
            }
          }
        }
      });
    })

  }
  getStuClick(i){
    if(this.list[i].commentList == ''){
      this.noComment = true;
    }else{
      this.noComment = false;
      this.commentList = this.list[i].commentList;
      this.commentNum = this.commentList.length;
      this.StuIndex = i;
    }
  }

}

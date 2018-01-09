import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProxyHttpService} from "../../providers/proxy.http.service";

@IonicPage()
@Component({
  selector: 'page-comment-detail',
  templateUrl: 'comment-detail.html',
})
export class CommentDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: ProxyHttpService) {
  }

  ionViewWillEnter() {
    this.getComment();
  }

  getComment(){
    const params = {sim_id: '18'}
    this.http.getComment(params).subscribe(res => {
      console.log(res)
    });
  }

}

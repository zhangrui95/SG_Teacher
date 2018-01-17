import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {UserData} from "../../providers/user-data";

@IonicPage()
@Component({
  selector: 'page-decision-detail',
  templateUrl: 'decision-detail.html',
})
export class DecisionDetailPage {
  list = [];
  title;
  StuTotal;
  Choice = [];
  percentage = [];
  percentageNum = [];
  sim_id;
  g_id;
  n_id;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: ProxyHttpService, public userData: UserData) {
  }

  ionViewWillEnter() {

    this.g_id = this.navParams.get('g_id');
    this.n_id = this.navParams.get('n_id');
    let params = {sim_id:this.sim_id,g_id:this.g_id,n_id:this.n_id};
    this.http.getDecide(params).subscribe(res => {
      this.list = res['select'];
      this.StuTotal = res['StuTotal'];
      this.title = res['text'];
      for(let i in this.list){
        this.list[i]['lookStu'] = false;
        this.list[i]['btnText'] = '查看投票学生';
        let Num = String.fromCharCode(65 + parseInt(i));
        this.Choice.push(Num);
        let percent;
        if(this.list[i].total == 0){
          percent = 0;
        }else{
          percent = parseInt(this.list[i].total) / parseInt(this.StuTotal)*100;
        }
        this.percentageNum.push(percent +'%');
        let p =  {width: 'calc('+ percent +'% - 50px)'};
        this.percentage.push(p);
      }
    });
  }

  lookStuList(i){
    if(this.list[i].total == 0){
      this.list[i]['lookStu'] === false;
    }else{
      if(this.list[i]['lookStu'] === false){
        this.list[i]['lookStu'] = true;
        this.list[i]['btnText'] = '隐藏投票学生';
      }else{
        this.list[i]['lookStu'] = false;
        this.list[i]['btnText'] = '查看投票学生';
      }
    }
  }


}

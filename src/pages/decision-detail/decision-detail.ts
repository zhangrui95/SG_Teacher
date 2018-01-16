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
  // list = [{"value":"一心向学","total":"2","Stus":[{"u_id":"1","stuName":"张三"},{"u_id":"3","stuName":"王五"}]},{"value":"一心向学fasdfs","total":"5","Stus":[{"u_id":"1","stuName":"张三"},{"u_id":"2","stuName":"李四"},{"u_id":"3","stuName":"王五"},{"u_id":"2","stuName":"士大夫"},{"u_id":"2","stuName":"王芳芳"}]},{"value":"一心向学，阿斯顿发生，发放！","total":"3","Stus":[{"u_id":"1","stuName":"张三"},{"u_id":"2","stuName":"李四"},{"u_id":"3","stuName":"王五"}]}];
  list = [];
  title = ''
  // StuTotal = '20'
  StuTotal;
  Choice = [];
  percentage = [];
  percentageNum = [];
  sim_id;
  g_id;
  n_id;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: ProxyHttpService, public userData: UserData) {
    this.userData.getSimid().then(val=>{
      this.sim_id = val;
    });
    this.g_id = this.navParams.get('g_id');
    this.n_id = this.navParams.get('n_id');
  }

  ionViewWillEnter() {
    let params = {sim_id:this.sim_id,g_id:this.g_id,n_id:this.n_id};
    this.http.getDecide(params).subscribe(res => {
      console.log(res)
      this.list = res['select'];
      this.StuTotal = res['StuTotal'];
      this.title = res['text'];
    });
    for(let i in this.list){
      this.list[i]['lookStu'] = false;
      this.list[i]['btnText'] = '查看投票学生';
      let Num = String.fromCharCode(65 + parseInt(i));
      this.Choice.push(Num);
      let percent = parseInt(this.list[i].total) / parseInt(this.StuTotal)*100;
      this.percentageNum.push(percent +'%');
      this.percentage.push({width:+ percent +'%'});
    }
  }

  lookStuList(i){
    if(this.list[i]['lookStu'] === false){
      this.list[i]['lookStu'] = true;
      this.list[i]['btnText'] = '隐藏投票学生';
    }else{
      this.list[i]['lookStu'] = false;
      this.list[i]['btnText'] = '查看投票学生';
    }
  }


}

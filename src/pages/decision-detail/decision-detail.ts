import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-decision-detail',
  templateUrl: 'decision-detail.html',
})
export class DecisionDetailPage {
  list = [{"total":"2","Stus":[{"u_id":"1","stuName":"张三"},{"u_id":"3","stuName":"王五"}]},{"total":"5","Stus":[{"u_id":"1","stuName":"张三"},{"u_id":"2","stuName":"李四"},{"u_id":"3","stuName":"王五"},{"u_id":"2","stuName":"士大夫"},{"u_id":"2","stuName":"王芳芳"}]},{"total":"3","Stus":[{"u_id":"1","stuName":"张三"},{"u_id":"2","stuName":"李四"},{"u_id":"3","stuName":"王五"}]}];
  topic = ['文化素质是范德萨加沙拉酱三角阀是啥房间里','含税单价卡哈萨克达案发后','的撒浩丰科技富士康和第三'];
  title = '大神加上了大家沙基里放假卡仕达，哈就好打开撒，阿道夫几点开始分散！'
  StuTotal = '20'
  Choice = [];
  percentage = [];
  percentageNum = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    for(let i in this.list){
      this.list[i]['lookStu'] = false;
      this.list[i]['btnText'] = '查看投票学生';
      let Num = String.fromCharCode(65 + parseInt(i));
      this.Choice.push(Num);
      let percent = parseInt(this.list[i].total) / parseInt(this.StuTotal)*100;
      this.percentageNum.push(percent +'%');
      this.percentage.push({width:+ percent +'%'});
      console.log(this.percentage)
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

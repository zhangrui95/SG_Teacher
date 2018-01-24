import {Component} from '@angular/core';
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
  StuIndex = -1;
  sim_id;
  n_id;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public http: ProxyHttpService,
              public userData: UserData) {
    this.n_id = this.navParams.get('n_id');
  }
  ionViewDidLoad() {
    this.userData.getSimid().then(val => {
      console.log('fucker')
      console.log(val)
      this.sim_id = val;
      const params = {sim_id: this.sim_id}
      this.http.getAllStuList(params).subscribe(res => {
        console.log(res['stuList']);
        for(let i in res['stuList']){
          res['stuList'][i].picked = false;
        }
        this.list = res['stuList'];
        this.getPick(this.list);
      });
    })
    // const params = {sim_id: this.sim_id}

  }
  getPick(stuList){
    console.log('stuList', stuList)
    let params = {action: 'screen', datas: {op:'pick', list: stuList}, n_id: this.n_id, sim_id: this.sim_id};
    this.http.getPushScreen(params).subscribe(res => {
      console.log('pick====>' ,stuList);
      console.log(res)
    })
  }
  getFullpath(path){
   return  this.http.getBaseurl()+path
  }
  inRandom = false;

  randomCheck() {
    if (this.inRandom) {
      return
    }
    this.inRandom = true;
    let times = 0;
    let int = setInterval(() => {
      times++
      if (times <= 20) {
        let random = Math.floor(Math.random() * this.list.length)
        console.log(random)
        this.StuIndex = random

      } else {
        clearInterval(int)
        this.inRandom = false;
      }
    }, 500);
    // this.StuIndex
  }

  callStu(i) {
    this.StuIndex = i;
  }

  callName() {
    if(this.StuIndex == -1){
      this.showToast('bottom', '请选择学生');
    }else{
      let u_id = this.list[this.StuIndex]['Id'];
      const params = {u_id: u_id}
      this.list[this.StuIndex].picked = true;
      this.getPick(this.list);
      this.http.getPushCallStuId(params).subscribe(res => {
        this.showToast('bottom', res['msg']);
      });
    }
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

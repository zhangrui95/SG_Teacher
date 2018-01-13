import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {UserData} from "../../providers/user-data";

@IonicPage()
@Component({
  selector: 'page-pad-group-list',
  templateUrl: 'pad-group-list.html',
})
export class PadGroupListPage {

  list;
  num = [];
  sim_id;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: ProxyHttpService,public userData:UserData) {
    this.userData.getSimid().then(val=>{
      this.sim_id=val;
    })
    this.getGroupDetail();
  }

  showCour(i){
    if(this.list[i].show === false){
      this.list[i].show = true;
      this.list[i].imgShow = 'assets/img/hide.png';
    }else{
      this.list[i].show = false;
      this.list[i].imgShow = 'assets/img/show.png';
    }
  }
  getGroupDetail(){
    let params = {sim_id:this.sim_id}
    this.http.getGroupDetail(params).subscribe(res => {
      for (let i in res){
        this.num.push(res[i].listStus.length);
        res[i].show = true;
        res[i].imgShow = 'assets/img/hide.png';
      }
      this.list = res;
    })
  }
}

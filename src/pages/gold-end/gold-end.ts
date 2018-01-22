import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserData} from "../../providers/user-data";
import {ProxyHttpService} from "../../providers/proxy.http.service";

@IonicPage()
@Component({
  selector: 'page-gold-end',
  templateUrl: 'gold-end.html',
})
export class GoldEndPage {
  sim_id;
  rankList;
  constructor(public navCtrl: NavController, public navParams: NavParams,public userData: UserData, public http: ProxyHttpService) {
  }

  ionViewDidLoad() {
    this.userData.getSimid().then(val => {
      this.sim_id = val;
      this.http.getRankingForU({sim_id: this.sim_id}).subscribe(res => {
        this.rankList = res['list'];
      })
    })
  }

}

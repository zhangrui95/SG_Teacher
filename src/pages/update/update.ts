import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProxyHttpService} from "../../providers/proxy.http.service";


@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {
  isAndroid;
  versionName;
  repairContent;
  type;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: ProxyHttpService,) {
  }

  ionViewWillEnter() {
    this.isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
    if(this.isAndroid){
      this.type = '2'
    }else{
      this.type = '1'
    }
    const params = {type: this.type}
    this.http.getVersionByType(params).subscribe(res => {
      this.versionName = res['version'].version_name;
      this.repairContent = res['version'].repair_content;
    })
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-group-index',
  templateUrl: 'group-index.html',
})
export class GroupIndexPage {
  name='img';
  src='assets/img/bdtb.png';
  txt='我赛带Hi好IDhi还得还赛hi';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupIndexPage');

  }
// getScenesById() {
  //   this.param = {
  //     n_id: 3
  //   }
  //   this.http.getScenesById(this.param).subscribe(res => {
  //     console.log('list:'+res['list'][0]['s_data'])
  //
  //     this.data_list = JSON.parse(res['list'][0]['s_data'])['componentList'][0]
  //     this.data_list.name = "tieba"
  //     // this.data_list[0]['data'].text = '事件名称'
  //     // this.data_list[0]['data'].src = '大神';
  //     this.name=this.data_list.name
  //     // this.datas = this.data_list
  //     // console.log(this.datas[0].name)
  //   });
  // }
}

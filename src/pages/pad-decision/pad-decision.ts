import {Component, Input, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UsersPage} from "../users/users";

@IonicPage()
@Component({
  selector: 'page-pad-decision',
  templateUrl: 'pad-decision.html',
})
export class PadDecisionPage implements OnInit {
  ngOnInit() {
    console.log("grouping====================>")
    console.log(this.s_data.s_data.componentList[0].data.fillData)
    this.getData();
  }
  refreshdata(){
    console.log('des')
  }
  @Input()
  s_data :any=new Object();
  @Input()
  sim_id :any=new Object();
  datas: any;
  title;
  content;
  select;

  // issue = '若你作为辉发乳业（集团）股份有限公司的决策者，关注到网贴后该如何决策？';
  options = [
    {option:'A、'},
    {option:'B、'},
    {option:'C、'},
    {option:'D、'},
    {option:'E、'},
    {option:'F、'},
    {option:'G、'}
  ]

  // issue = '若你作为辉发乳业（集团）股份有限公司的决策者，关注到网贴后该如何决策？';
  // options = [
  //   {id:'0',option:'A', text:'公开调查帖子内容的真实性'},
  //   {id:'1',option:'B', text:'私下联系发帖人，删除网帖，控制消息的网络传播渠道'},
  //   {id:'2',option:'C', text:'公开调查帖子内容的真实性'}
  // ]
  Id;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  getForm(item){
    this.Id = item.id;
  }

  getUser(){
    this.navCtrl.push(UsersPage);
  }

  vote(){
    console.log(this.Id);
  }
  getData() {
    this.datas = this.s_data.s_data.componentList[0].data;
    this.select = this.s_data.s_data.componentList[0].data.selectData;
    this.title = this.datas.text;

    // this.content = this.datas.content;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaidutbPage');
  }
}

///<reference path="../../../node_modules/ionic-angular/tap-click/tap-click.d.ts"/>
import {Component, Input, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the BaidutbPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pad-bdtb',
  templateUrl: 'pad-bdtb.html',
})

export class PadBdtbPage implements OnInit{
  ngOnInit(): void {
    console.log("*s_data=>>>>>>>>>>>>>>>>>>")
    console.log(this.s_data)
  }
  @Input()
  s_data :any=new Object();
items=[
  {
    src:'../../assets/img/user.png',
    name:'洋洋',
    time:'第1楼 | 今天18:54',
    nr:'好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教,好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
  },
  {
    src:'../../assets/img/user.png',
    name:'龙龙',
    time:'第2楼 | 今天18:54',
    nr:'好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教,好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
  },
  {
    src:'../../assets/img/user.png',
    name:'旺旺',
    time:'第3楼 | 今天18:54',
    nr:'好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教,好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
  }
];

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaidutbPage');
  }

}
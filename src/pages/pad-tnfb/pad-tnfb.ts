///<reference path="../../../node_modules/ionic-angular/tap-click/tap-click.d.ts"/>
import {Component, Input} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the BaidutbPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pad-tnfb',
  templateUrl: 'pad-tnfb.html',
})

export class PadTnfbPage {
  @Input()
  s_data :any=new Object();
  items=[
    {
      src:'../../assets/img/user.png',
      name:'洋洋',
      nr:'好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
    },
    {
      src:'../../assets/img/user.png',
      name:'阿呆',
      nr:'好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
    },
    {
      src:'../../assets/img/user.png',
      name:'朵拉',
      nr:'好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
    },
    {
      src:'../../assets/img/user.png',
      name:'对讲机',
      nr:'好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
    }
  ]
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaidutbPage');
  }

}

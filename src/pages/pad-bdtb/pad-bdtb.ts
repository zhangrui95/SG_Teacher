///<reference path="../../../node_modules/ionic-angular/tap-click/tap-click.d.ts"/>
///<reference path="../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ServerSocket} from "../../providers/ws.service";
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {Subscription} from "rxjs/Subscription";

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

export class PadBdtbPage implements OnInit, AfterViewInit {
  @ViewChild('topBox') topBox: ElementRef;
  @ViewChild('list') list: ElementRef;
  @ViewChild('show') show: ElementRef;
  @ViewChild('hide') hide: ElementRef;
  @ViewChild('nr') nr: ElementRef;

  ngOnInit() {
    console.log("grouping====================>")
    console.log(this.s_data.s_data.componentList[0].data.fillData)
    this.n_id = this.s_data.n_id;
    this.g_id = this.s_data.g_id;
    this.getData();
    this.getAnswerOfStuList();
    this.ws.connect();
    if (this.ws.messages) {
      console.log(this.ws.messages)
      this.ws.messages.subscribe(res => {
        console.log("2$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        console.log(res)
      })
    }
  }
  @Input()
  s_data :any=new Object();
  @Input()
  sim_id :any=new Object();
  n_id;
  g_id;
  datas: any;
  title;
  content;
  param;
  items = [];
  // items = [
  //   {
  //     src: '../../assets/img/user.png',
  //     name: '洋洋',
  //     time: '第1楼 | 今天18:54',
  //     nr: '好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教,好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
  //   },
  //   {
  //     src: '../../assets/img/user.png',
  //     name: '龙龙',
  //     time: '第2楼 | 今天18:54',
  //     nr: '好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教,好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
  //   },
  //   {
  //     src: '../../assets/img/user.png',
  //     name: '旺旺',
  //     time: '第3楼 | 今天18:54',
  //     nr: '好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教,好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
  //   }
  // ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ws: ServerSocket,
              public http: ProxyHttpService) {

  }

  getData() {
    this.datas = this.s_data.s_data.componentList[0].data.fillData;
    this.title = this.datas.title;
    this.content = this.datas.content;

    // this.title = 'jdsiajdoi';
    // this.content = '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十';
  }

  getAnswerOfStuList() {
    this.param = {
      n_id: this.n_id,
      g_id: this.g_id,
      sim_id: this.sim_id
    };
    console.log('sim_id:'+this.param.sim_id)
    console.log('n_id:'+this.param.n_id+"   g_id:"+this.param.g_id)
    this.http.getAnswerOfStuList(this.param).subscribe(res => {

      // for (var i = 0; i < res['list'].length; i++) {
      //   res['list'][i].ImagePath = this.sanitizer.bypassSecurityTrustResourceUrl(this.http.BASE_URL + res['list'][i].ImagePath);
      // }

      this.items = res['list']

    });
  }
  private socketSubscription: Subscription

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaidutbPage');
  }

  ngAfterViewInit() {
   this.p_height();
  }

  p_height(){
    const height = this.topBox.nativeElement.offsetHeight;
    this.list.nativeElement.parentElement.style.marginTop = height + 65 + 'px';
  }

  show_div(){
    this.hide.nativeElement.style.display = 'block';
    this.show.nativeElement.style.display = 'none';
    this.nr.nativeElement.style.display = 'block';
    this.p_height();
  }
  hide_div(){
    this.show.nativeElement.style.display = 'block';
    this.hide.nativeElement.style.display = 'none';
    this.nr.nativeElement.style.display = '-webkit-box';
    this.p_height();
  }

  ionViewDidEnter() {
    if (this.ws.messages) {
      this.socketSubscription = this.ws.messages.subscribe((message: string) => {
        console.log('received message from server11111:' + message);
        if (JSON.parse(message)['action'] != null) {
          if (JSON.parse(message)['action'] == 'phone_scene_answers_update') {
            this.items = JSON.parse(message)['list']
          }
        }
      })
    }
  }

  ionViewDidLeave() {
    if (this.socketSubscription)
      this.socketSubscription.unsubscribe();
  }
}

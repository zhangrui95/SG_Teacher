///<reference path="../../../node_modules/ionic-angular/tap-click/tap-click.d.ts"/>
import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Subscription} from "rxjs/Subscription";
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {ServerSocket} from "../../providers/ws.service";

/**
 * Generated class for the BaidutbPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pad-danmu',
  templateUrl: 'pad-danmu.html',
})

export class PadDanmuPage implements OnInit, AfterViewInit {

  @Input()
  sim_id :any=new Object();
  @Input()
  s_data :any=new Object();

  @ViewChild('topBox') topBox: ElementRef;
  @ViewChild('list') list: ElementRef;
  @ViewChild('show') show: ElementRef;
  @ViewChild('hide') hide: ElementRef;
  @ViewChild('nr') nr: ElementRef;
  @ViewChild('show_hide') show_hide: ElementRef;
  @ViewChild('hr_hid') hr_hid: ElementRef;

  ngOnInit() {
    console.log("grouping====================>")
    console.log(this.s_data.s_data.componentList[0].data.fillData)
    this.n_id=this.s_data.n_id;
    this.g_id=this.s_data.g_id;
    this.getData();
    this.getAnswerOfStuList();
  }

  n_id;
  g_id;
  datas: any;
  title;
  content;
  param;
  items = [];

  // items=[
  //   {
  //     src:'../../assets/img/user.png',
  //     name:'洋洋',
  //     nr:'好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
  //   },
  //   {
  //     src:'../../assets/img/user.png',
  //     name:'阿呆',
  //     nr:'好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
  //   },
  //   {
  //     src:'../../assets/img/user.png',
  //     name:'朵拉',
  //     nr:'好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
  //   },
  //   {
  //     src:'../../assets/img/user.png',
  //     name:'对讲机',
  //     nr:'好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
  //   }
  // ]
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ws: ServerSocket,
              public http: ProxyHttpService) {

  }

  getData() {
    this.datas = this.s_data.s_data.componentList[0].data.fillData;
    this.title = this.datas.title;
    this.content = this.datas.content;
    if(this.content==""){
      this.show_hide.nativeElement.style.display = 'none';
      this.hr_hid.nativeElement.style.display = 'none';

    }
    else {
      this.show_hide.nativeElement.style.display = 'block';
      this.hr_hid.nativeElement.style.display = 'block';
    }
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

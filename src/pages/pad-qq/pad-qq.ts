///<reference path="../../../node_modules/ionic-angular/tap-click/tap-click.d.ts"/>
import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
  selector: 'page-pad-qq',
  templateUrl: 'pad-qq.html',
})

export class PadQQPage implements OnInit,OnDestroy {
  @ViewChild('ion_content')
  ion_content

  @ViewChild('topBox') topBox: ElementRef;
  @ViewChild('list') list: ElementRef;

  ngOnInit() {
    console.log("grouping====================>")
    // console.log(this.s_data.s_data.componentList[0].data.fillData)
    // this.n_id=this.s_data.n_id;
    // this.g_id=this.s_data.g_id;
    // this.getData();
    // this.getAnswerOfStuList();
    // this.ws.connect();
    // if (this.ws.messages) {
    //   console.log(this.ws.messages)
    //   this.ws.messages.subscribe(res => {
    //     console.log("2$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    //     console.log(res)
    //     if (JSON.parse(res)['action'] != null) {
    //       if (JSON.parse(res)['action'] == 'pad_scene_answers_update') {
    //         this.items.push(JSON.parse(res)['list'])
    //         setTimeout(() => {
    //
    //           this.ion_content.scrollToBottom(500);
    //         }, 1000)
    //       }
    //     }
    //   })
    // }
  }

  ngOnDestroy() {
    if (this.socketSubscription)
      this.socketSubscription.unsubscribe();
  }
  n_id;
  g_id;
  datas: any;
  title;
  content;
  param;
  items = [];
  name;
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
//     name:'阿呆',
//     nr:'好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
//   },
//   {
//     src:'../../assets/img/user.png',
//     name:'对讲机',
//     nr:'好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
//   },
//   {
//     src:'../../assets/img/user.png',
//     name:'阿呆',
//     nr:'好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
//   },
//   {
//     src:'../../assets/img/user.png',
//     name:'阿呆',
//     nr:'好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
//   },
//   {
//     src:'../../assets/img/user.png',
//     name:'对讲机',
//     nr:'好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
//   },
//   {
//     src:'../../assets/img/user.png',
//     name:'对讲机',
//     nr:'好的,我啊想跳极大祭司的技术地阿斯加屌丝啊接地极道具卡三角地哦啊是降低挂号费基地哦啊是基督教'
//   }
//
// ]
  @Input()
  s_data :any=new Object();
  @Input()
  sim_id :any=new Object();
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ws: ServerSocket,
              public http: ProxyHttpService) {
    console.log(this.s_data)
  }

  getData() {
    this.datas = this.s_data.s_data.componentList[0].data.fillData;
    this.title = this.datas.title;
    this.content = this.datas.content;
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

      for (var i = 0; i < res['list'].length; i++) {
        let url=res['list'][i].ImagePath;
        if(url==''||url.length==0){
          res['list'][i].ImagePath = "assets/img/header.png";
        }else{
          // res['list'][i].ImagePath=this.sanitizer.bypassSecurityTrustResourceUrl(this.http.getBaseurl() + url);
          res['list'][i].ImagePath=this.http.getBaseurl() + url;
        }
      }

      this.items = res['list']
      setTimeout(() => {

        this.ion_content.scrollToBottom(500);
      }, 1000)
    });
  }

  private socketSubscription: Subscription

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaidutbPage');
  }

  ngAfterViewInit() {
    // const height = this.topBox.nativeElement.offsetHeight;
    // this.list.nativeElement.style.marginTop = height + 65 + 'px';
  }
}

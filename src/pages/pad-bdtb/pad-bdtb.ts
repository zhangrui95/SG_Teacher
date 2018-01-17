///<reference path="../../../node_modules/ionic-angular/tap-click/tap-click.d.ts"/>
///<reference path="../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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

export class PadBdtbPage implements OnInit,OnDestroy {
  @ViewChild('ion_content')
  ion_content

  @ViewChild('topBox') topBox: ElementRef;
  @ViewChild('list') list: ElementRef;
  // @ViewChild('show') show: ElementRef;
  // @ViewChild('hide') hide: ElementRef;
  // @ViewChild('nr') nr: ElementRef;
  // @ViewChild('show_hide') show_hide: ElementRef;
  // @ViewChild('hr_hid') hr_hid: ElementRef;

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
        console.log('-------------------res.list--------------------')
        console.log(JSON.parse(res))
        if (JSON.parse(res)['action'] != null) {
          if (JSON.parse(res)['action'] == 'pad_scene_answers_update') {
            // this.items.push(JSON.parse(res)['list'])
            let item = this.items.concat(JSON.parse(res)['list'])

            console.log('---------------------------this.items.length----------------------'+this.items.length)
            // console.log('-----------------this.items--------------'+JSON.stringify(this.items))
            // console.log('-----------------this.items--------------'+this.items['UserName'])

            for (var i = 0; i < item.length; i++) {
              let url=item[i].imagePath;
              // console.log('url:'+url)
              if(url==''||url.length==0){
                item[i].imagePath = "assets/img/header.png";
              }else{
                // res['list'][i].ImagePath=this.sanitizer.bypassSecurityTrustResourceUrl(this.http.getBaseurl() + url);
                item[i].imagePath=this.http.getBaseurl() + url;
              }
            }
            this.items=item
            setTimeout(() => {

              this.ion_content.scrollToBottom(500);
            }, 1000)
          }
        }
      })
    }
  }

  ngOnDestroy() {
    if (this.socketSubscription)
      this.socketSubscription.unsubscribe();
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

    // if(this.content==""){
    //   this.show_hide.nativeElement.style.display = 'none';
    //   this.hr_hid.nativeElement.style.display = 'none';
    //
    // }
    // else {
    //   this.show_hide.nativeElement.style.display = 'block';
    //   this.hr_hid.nativeElement.style.display = 'block';
    // }

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
      // console.log('this.items:'+res['list'].length)
      for (var i = 0; i < res['list'].length; i++) {
        let url=res['list'][i].ImagePath;
        // console.log('url:'+url)
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

  // ngAfterViewInit() {
    // const height = this.topBox.nativeElement.offsetHeight;
    // this.list.nativeElement.style.marginTop = height + 65 + 'px';
  // }
  //
  // p_height(){
  //   const height = this.topBox.nativeElement.offsetHeight;
  //   this.list.nativeElement.parentElement.style.marginTop = height + 65 + 'px';
  // }
  //
  // show_div(){
  //   this.hide.nativeElement.style.display = 'block';
  //   this.show.nativeElement.style.display = 'none';
  //   this.nr.nativeElement.style.display = 'block';
  //   this.p_height();
  // }
  // hide_div(){
  //   this.show.nativeElement.style.display = 'block';
  //   this.hide.nativeElement.style.display = 'none';
  //   this.nr.nativeElement.style.display = '-webkit-box';
  //   this.p_height();
  // }
}

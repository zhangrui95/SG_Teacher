///<reference path="../../../node_modules/ionic-angular/tap-click/tap-click.d.ts"/>
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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

export class PadDanmuPage implements OnInit,OnDestroy {

  @Input()
  sim_id :any=new Object();
  @Input()
  s_data :any=new Object();

  @ViewChild('ion_content')
  ion_content

  @ViewChild('topBox') topBox: ElementRef;
  @ViewChild('list') list: ElementRef;

  ngOnInit() {
    console.log("grouping====================>")
    console.log(this.s_data.s_data.componentList[0].data.fillData)
    this.n_id=this.s_data.n_id;
    this.g_id=this.s_data.g_id;
    this.getData();
    this.getAnswerOfStuList();
    this.ws.connect();
    if (this.ws.messages) {
      console.log(this.ws.messages)
      this.ws.messages.subscribe(res => {
        console.log("2$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        console.log(res)
        if (JSON.parse(res)['action'] != null) {
          if (JSON.parse(res)['action'] == 'pad_scene_answers_update') {
            let item = this.items.concat(JSON.parse(res)['list'])
            this.items=item
            this.refresh()
          }
        }
      })
    }
  }

  ngOnDestroy() {
    if (this.socketSubscription)
      this.socketSubscription.unsubscribe();
  }

  getFullPath(path){
    return this.http.getBaseurl()+path
  }

  refresh(){
    setTimeout(()=>{
      this.ion_content.resize();
      this.ion_content.scrollToBottom(500);
    },500)

  }

  n_id;
  g_id;
  datas: any;
  title;
  content;
  param;
  items = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ws: ServerSocket,
              public http: ProxyHttpService) {

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
      this.items = res['list']
    });
  }

  private socketSubscription: Subscription

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaidutbPage');
  }

  // ngAfterViewInit() {
  //   const height = this.topBox.nativeElement.offsetHeight;
  //   this.list.nativeElement.style.marginTop = height + 95 + 'px';
  // }
}

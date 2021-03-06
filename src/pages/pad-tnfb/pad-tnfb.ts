///<reference path="../../../node_modules/ionic-angular/tap-click/tap-click.d.ts"/>
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
  selector: 'page-pad-tnfb',
  templateUrl: 'pad-tnfb.html',
})

export class PadTnfbPage implements OnInit,OnDestroy {

  @Input()
  sim_id :any=new Object();
  @Input()
  s_data :any=new Object();
  @Input()
  days
  refreshdata(){
    console.log('tnfb')
    if(this.messagesSubscription){
      this.messagesSubscription.unsubscribe()
    }
    setTimeout(()=>{
      this.ws.connect()
      this.registeReciever();
      this.getAnswerOfStuList();
    },1000)

  }
  @ViewChild('ion_content') ion_content

  @ViewChild('topBox') topBox: ElementRef;
  @ViewChild('list') list: ElementRef;
  timer

  polling() {
    this.timer = setTimeout(() => {
      this.getAnswerOfStuList()
      this.polling()
    }, 3000)
  }
  ngOnInit() {
    // this.polling()
    console.log("grouping====================>")
    console.log(this.s_data.s_data.componentList[0].data.fillData)
    this.n_id=this.s_data.n_id;
    this.g_id=this.s_data.g_id;
    this.getData();
    this.getAnswerOfStuList();
    this.ws.connect();
    setTimeout(()=>{
      if (this.ws.messages ) {
        this.registeReciever()
      }
    },2000)
  }

  intervalTimer
  messagesSubscription;

  registeReciever() {
    console.log(this.ws.messages)
    this.socketSubscription=this.ws.messages.subscribe(res => {
      console.log("2$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
      console.log(res)
      if (JSON.parse(res)['action'] != null) {
        if (JSON.parse(res)['action'] == 'pad_scene_answers_update') {
          let list=JSON.parse(res)['list'];
          for(let item of list){
            if(item.n_id==this.n_id){
              if(this.items.indexOf(JSON.parse(res)['list'][0])==-1){
              let item = this.items.concat(JSON.parse(res)['list'])
              this.items=item
              this.refresh()
              }
              break;
            }
          }
        }
      }
    })
  }

  refresh(){
    setTimeout(()=>{
      if(this.ion_content){
        this.ion_content.resize();
        this.ion_content.scrollToBottom(500);
      }

    },500)

  }

  ngOnDestroy() {
    // clearTimeout(this.timer)
    if (this.socketSubscription)
      this.socketSubscription.unsubscribe();
  }
  getFullPath(path){
    return this.http.getBaseurl()+path
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
      sim_id: this.sim_id,
      day:this.days+''
    };
    if(this.days==0){
      this.param.day='1'
    }else{
      this.param.day=this.days+''
    }
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

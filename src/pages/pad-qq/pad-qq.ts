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
  refreshdata(){
    console.log('qq')

    if(this.messagesSubscription){
      this.messagesSubscription.unsubscribe()
    }
    setTimeout(()=>{
      this.ws.connect()
      this.registeReciever();
      this.getAnswerOfStuList();
    },1000)

  }
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


    if (this.ws.messages ) {
      this.registeReciever()
    }
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
              let item = this.items.concat(JSON.parse(res)['list'])
              this.items=item
              this.refresh()
              break;
            }
          }
        }
      }
    })
  }
  refresh(){
    setTimeout(()=>{
      if(!this.ion_content){
        return
      }
      this.ion_content.resize();
      this.ion_content.scrollToBottom(500);
    },500)

  }
  getFullPath(path){
    return this.http.getBaseurl()+path
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
    this.title = this.datas.fillName;
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

  ngAfterViewInit() {
    // const height = this.topBox.nativeElement.offsetHeight;
    // this.list.nativeElement.style.marginTop = height + 65 + 'px';
  }
}

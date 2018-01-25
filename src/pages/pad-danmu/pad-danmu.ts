///<reference path="../../../node_modules/ionic-angular/tap-click/tap-click.d.ts"/>
import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Subscription} from "rxjs/Subscription";
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {ServerSocket} from "../../providers/ws.service";
import {UserData} from "../../providers/user-data";

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

export class PadDanmuPage implements OnInit, OnDestroy {
  refreshdata(){
    console.log('danm')
    if(this.messagesSubscription){
      this.messagesSubscription.unsubscribe()
    }
    setTimeout(()=>{
      this.ws.connect()
      this.registeReciever();
      this.getAnswerOfStuList();
    },1000)

  }
  @Input()
  sim_id: any = new Object();
  @Input()
  s_data: any = new Object();

  @ViewChild('ion_content')
  ion_content

  @ViewChild('topBox') topBox: ElementRef;
  @ViewChild('list') list: ElementRef;

  ngOnInit() {

    console.log("grouping====================>")
    console.log(this.s_data.s_data.componentList[0].data.fillData)
    this.n_id = this.s_data.n_id;
    this.g_id = this.s_data.g_id;
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
    this.socketSubscription= this.ws.messages.subscribe(res => {
      console.log("2$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
      console.log(res)
      if (JSON.parse(res)['action'] != null) {
        if (JSON.parse(res)['action'] == 'pad_scene_answers_update') {
          let list = JSON.parse(res)['list'];
          for (let item of list) {
            if (item.n_id == this.n_id) {
              let item = this.items.concat(JSON.parse(res)['list'])
              this.items = item
              this.refresh()
              break;
            }
          }
        }
      }
    })
  }

  ngOnDestroy() {
    if (this.socketSubscription)
      this.socketSubscription.unsubscribe();
  }

  getFullPath(path) {
    return this.http.getBaseurl() + path
  }

  refresh() {
    setTimeout(() => {
      if(!this.ion_content){
        return
      }
      this.ion_content.resize();
      this.ion_content.scrollToBottom(500);
    }, 500)

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
              public userData: UserData,
              public http: ProxyHttpService) {

  }

  src={changingThisBreaksApplicationSecurity:''}
  name

  getData() {


    // this.result = JSON.parse(this.s_data[0].s_data)
    // this.common = this.result['componentList'];
    for (let com of this.s_data.s_data.componentList) {
      let name = com.name;

      if (name == 'video') {
        this.name = name;
        this.src = com.data.src;
        console.log(this.src)
      }
      else {

      }

    }
    // this.datas = this.s_data.s_data.componentList[0].data.fillData;
    // this.title = this.datas.title;
    // this.content = this.datas.content;
    //


  }

  getAnswerOfStuList() {
    this.userData.getSimid().then(res => {
      this.sim_id = res;
      this.param = {
        n_id: this.n_id,
        g_id: this.g_id,
        sim_id: this.sim_id
      };
      console.log('sim_id:' + this.param.sim_id)
      console.log('n_id:' + this.param.n_id + "   g_id:" + this.param.g_id)
      this.http.getAnswerOfStuList(this.param).subscribe(res => {
        this.items = res['list']
      });
    })

  }

  private socketSubscription: Subscription

  ionViewDidLoad() {

  }
  playVideo(){
    let params = {action: 'screen', datas: {op:'play'}, n_id: this.n_id, sim_id: this.sim_id};
    this.http.getPushScreen(params).subscribe(res => {
      console.log("play=======>")
      console.log(res)
    })
  }

  pauseVideo(){
    let params = {action: 'screen', datas: {op:'pause'}, n_id: this.n_id, sim_id: this.sim_id};

    this.http.getPushScreen(params).subscribe(res => {
      console.log("pause=======>")
      console.log(res)
    })
  }

  // ngAfterViewInit() {
  //   const height = this.topBox.nativeElement.offsetHeight;
  //   this.list.nativeElement.style.marginTop = height + 95 + 'px';
  // }
}

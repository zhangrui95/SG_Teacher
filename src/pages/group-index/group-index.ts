import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Subscription} from "rxjs/Subscription";
import {ProxyHttpService} from "../../providers/proxy.http.service";


@IonicPage()
@Component({
  selector: 'page-group-index',
  templateUrl: 'group-index.html',
})
export class GroupIndexPage implements OnInit, OnDestroy {
  @Input()
  s_data: any = new Object();
  @Input()
  sim_id: any = new Object();
  datas;
  n_id;
  g_id;
  name;
  src={changingThisBreaksApplicationSecurity:''};
  title;
  content;
  txt_length;
  refreshdata(){
    console.log('group')
  }
  private socketSubscription: Subscription

  ngOnInit(): void {
    console.log(this.s_data.s_data.componentList)
    this.datas = this.s_data.s_data.componentList;




    let txtValues = new Array();
    let title;
    let content;
    for (let com of  this.s_data.s_data.componentList) {
      let name = com.name;

      if (name == 'txt') {
        txtValues.push(com.data.text)

      }
      else {
        this.name=name;
        this.src = com.data.src;
      }

    }
    if (txtValues.length == 2) {
      if (txtValues[0].length >txtValues[1].length) {
        title = txtValues[1]
        content = txtValues[0]
      } else {
        content = txtValues[1]
        title = txtValues[0]
      }

    }

    this.title=title;
    this.content=content;
  }

  intervalTimer
  messagesSubscription;
  getFullpath(path){
    return  this.http.getBaseurl()+path
  }


  ngOnDestroy() {
    if (this.socketSubscription)
      this.socketSubscription.unsubscribe();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:ProxyHttpService) {
  }

  getData() {
    this.datas = this.s_data.s_data.componentList[0].data.fillData;

    // this.title = 'jdsiajdoi';
    // this.content = '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十';
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupIndexPage');
  }

  // ionViewDidEnter() {
  //   if (this.ws.messages) {
  //     this.socketSubscription = this.ws.messages.subscribe((message: string) => {
  //       console.log('received message from server11111:' + message);
  //       if (JSON.parse(message)['action'] != null) {
  //         if (JSON.parse(message)['action'] == 'phone_scene_answers_update') {
  //           this.items = JSON.parse(message)['list']
  //         }
  //       }
  //     })
  //   }
  // }

  // ionViewDidLeave() {
  //   if (this.socketSubscription)
  //     this.socketSubscription.unsubscribe();
  // }
}

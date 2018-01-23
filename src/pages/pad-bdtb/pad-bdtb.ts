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
  @ViewChild('co')
  ion_content
  refreshdata(){
    console.log('bd')
  }
  @ViewChild('topBox') topBox: ElementRef;
  @ViewChild('list') list: ElementRef;
  // @ViewChild('show') show: ElementRef;
  // @ViewChild('hide') hide: ElementRef;
  // @ViewChild('nr') nr: ElementRef;
  // @ViewChild('show_hide') show_hide: ElementRef;
  // @ViewChild('hr_hid') hr_hid: ElementRef;
  refresh(){
    setTimeout(()=>{
      if(!this.ion_content){
        return
      }
      this.ion_content.resize();
      this.ion_content.scrollToBottom(500);
    },500)

  }
  ngOnInit() {

    this.n_id = this.s_data.n_id;
    this.g_id = this.s_data.g_id;
    this.getData();
    this.getAnswerOfStuList();
    this.ws.connect();
    if (this.ws.messages) {
      this.ws.messages.subscribe(res => {

        if (JSON.parse(res)['action'] != null) {
          if (JSON.parse(res)['action'] == 'pad_scene_answers_update') {
            // this.items.push(JSON.parse(res)['list'])


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
      // this.ion_content.scrollToBottom(500);

    });
  }
  private socketSubscription: Subscription
  getFullPath(path){
    return this.http.getBaseurl()+path
  }
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

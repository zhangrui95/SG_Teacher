import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {GroupBean} from "../../providers/ProcessJSONUtil";
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {ServerSocket} from "../../providers/ws.service";


@IonicPage()
@Component({
  selector: 'page-grouping',
  templateUrl: 'grouping.html',
})
export class GroupingPage implements OnInit,OnDestroy{
  ngOnDestroy(): void {
    this.receiver.unsubscribe()
  }

  ngOnInit() {
    this.ws.connect()
    console.log("grouping====================>")
    console.log(this.list)
    if (this.ws.messages) {
      this.receiver = this.ws.messages.subscribe(msg => {
        let curr = JSON.parse(msg);
        let action = curr.action
        switch (action) {
          case 'phone_insert_group':
            console.log('curr========>')
            console.log(curr)
            //StuTotal
            let arr= curr.list;
            for(let g of arr){
              console.log(g)
              for(let group of this.list.GroupId){
                console.log(group)
                console.log(group.id)
                console.log(g['g_id'])
                if(g['g_id']==group.id){
                  // group.num=g['u_id'].split(',').length
                  group.num=g['StuTotal']
                }
              }
            }

            //todo 自由分组 更新分组信息
            break;
        }

      })
    }
  }

  @Input()
  sim_id =new Object()
  @Input()
  list =new GroupBean()

  @Output()
    onGrouped=new EventEmitter();
  receiver;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:ProxyHttpService,public ws:ServerSocket,public toastCtrl:ToastController) {


  }


  ionViewDidLoad() {



  }
  ionViewDidLeave(){

  }



  random() {
    /**{"sim_id":18,"GroupId":[{"type":"fixed","img":"","text":"固定配额分组","limit":"3","id":"g1"},{"type":"percent","img":"","text":"比例配额分组","limit":"3","id":"g2"},{"type":"remain","img":"","text":"剩余配额分组","limit":"3","id":"g3"}],"deviceType":"pad","token":"234fc9e0329b40cdbd7691233e7ae5c6"}*/
  }


  getPushFreeGroListForPhone() {
    this.groupingBtnEnable=true;
    this.http.getPushFreeGroListForPhone(this.list).subscribe(res => {
      console.log("=======>")
      console.log(res)

      this.onGrouped.emit("grouped");
    })
  }
  groupingBtnEnable=false
  getRandomGroForStu() {
    this.groupingBtnEnable=true;
    this.http.getRandomGroForStu(this.list).subscribe(res => {
      this.onGrouped.emit("grouped");
      //todo 随机分组 更新分组信息

        console.log("=======>")
        console.log(res)
      if(res['code']==0){
        let arr= res['jsonGroOfStu'];
        for(let g of arr){
          for(let group of this.list.GroupId){
            console.log("=======>")
            if(g['g_id']==group.id){
              group.num=(g['u_id']+"").split(',').length
            }
          }
        }
      }else{
        this.getPushFreeGroListForPhone()
        this.showToast('bottom',"当前参与人数不满足随机分组最低人数要求，系统将自动进行自由分组");
      }


    })
  }
  showToast(position: string, text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }
}

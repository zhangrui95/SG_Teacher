import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
                  alert(   group.num)
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:ProxyHttpService,public ws:ServerSocket) {


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
       let arr= res['jsonGroOfStu'];
       for(let g of arr){
         for(let group of this.list.GroupId){
           console.log("=======>")
           if(g['g_id']==group.id){
              group.num=(g['u_id']+"").split(',').length
           }
         }
       }

    })
  }
}

import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {ServerSocket} from "../../providers/ws.service";
import {UserData} from "../../providers/user-data";
import {NextBean, ProcessJSONUtil} from "../../providers/ProcessJSONUtil";

@IonicPage()
@Component({
  selector: 'page-pad-group',
  templateUrl: 'pad-group.html',
})
export class PadGroupPage {

  list = [];
  style = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public ws: ServerSocket, public http: ProxyHttpService, public userData: UserData, public processJson: ProcessJSONUtil) {
    // this.ws.connect();
    this.sim_id = navParams.data.sim_id+""
  }

  wsReciever
  //
  // ionViewDidLeave() {
  //   if(this.wsReciever)
  //   this.wsReciever.unsubscribe();
  // }

  jsonData
  currNode;
  sim_id = "111";

  onNext(ev) {
    console.log('next')
    if (ev == 'next') {
      let beans = new Array<NextBean>();
      if (this.processJson.isInGroup(this.jsonData)) {
        this.list = this.processJson.parseGroup(this.jsonData, this.sim_id).GroupId
        console.log(this.list)
        this.sendGroup()
        alert(111222)
      } else {
        beans = this.processJson.parseNext(this.sim_id)
        this.sendNext({datas: beans})
      }
    }else if(ev=='screen'){
      let action ={action:'screen',datas:this.currNode}
      console.log('screen=========>')
      console.log(action)
      this.ws.send(JSON.stringify(action))
    }
  }

  free() {
    this.getPushFreeGroListForPhone(this.processJson.parseGroup(this.jsonData, this.sim_id))
  }

  random() {
    /**{"sim_id":18,"GroupId":[{"type":"fixed","img":"","text":"固定配额分组","limit":"3","id":"g1"},{"type":"percent","img":"","text":"比例配额分组","limit":"3","id":"g2"},{"type":"remain","img":"","text":"剩余配额分组","limit":"3","id":"g3"}],"deviceType":"pad","token":"234fc9e0329b40cdbd7691233e7ae5c6"}*/
    this.getRandomGroForStu(this.processJson.parseGroup(this.jsonData, this.sim_id))
  }

  sendNext(next) {
/**[{"g_id":"-1","g_name":"少放点撒地方","n_id":"1","s_data":[],"action":"pad_process_upadte"}]*/
    this.addExercisesStep(next)
  }

  sendGroup() {

  }

  ionViewDidLeave() {
    if (this.wsReciever)
      this.wsReciever.unsubscribe()
  }

  addExercisesStep(params) {
    this.http.addExercisesStep(params).subscribe(res => {
      console.log("=======>")
      console.log(res)
      this.currNode=res
    })
  }

  getPushFreeGroListForPhone(params) {
    this.http.getPushFreeGroListForPhone(params).subscribe(res => {
      console.log("=======>")
      console.log(res)
    })
  }

  getRandomGroForStu(params) {
    this.http.getRandomGroForStu(params).subscribe(res => {
      console.log("=======>")
      console.log(res)
      //todo 随机分组 更新分组信息
    })
  }

  ionViewDidLoad() {
    this.userData.getProcessJsonData().then(value => {
      this.jsonData = value;

      console.log('start')
      this.sendNext({datas: this.processJson.start(this.jsonData, this.sim_id)})
    })


    if (this.ws.messages) {
      this.wsReciever = this.ws.messages.subscribe(msg => {
        let curr= JSON.parse(msg);
        let action = curr.action
        console.log('curr========>')
        console.log(curr)
        switch (action) {
          case 'phone_insert_group':

            //todo 自由分组 更新分组信息
            break;
          case 'pad_process_upadte':
            this.currNode=curr
            break
        }

      })
    }

  }

  ionView
}

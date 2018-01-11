import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {ServerSocket} from "../../providers/ws.service";
import {UserData} from "../../providers/user-data";
import {GroupBean, NextBean, ProcessJSONUtil} from "../../providers/ProcessJSONUtil";

@IonicPage()
@Component({
  selector: 'page-pad-group',
  templateUrl: 'pad-group.html',
})
export class PadGroupPage {

  list = [];
  style = [];
  jsonData: any;
  currNode;
  sim_id = "111";
  keyInput = false;
  sType = 'default';//fork,baidu,weibo,qq,storm,danmu,taolun?group,default
  constructor(public navCtrl: NavController, public navParams: NavParams, public ws: ServerSocket, public http: ProxyHttpService, public userData: UserData, public processJson: ProcessJSONUtil) {
    // this.ws.connect();
    this.sim_id = navParams.data.sim_id + ""
  }

  wsReciever
  //
  // ionViewDidLeave() {
  //   if(this.wsReciever)
  //   this.wsReciever.unsubscribe();
  // }
  groupList = new GroupBean;

  onNext(ev?) {
    this.resetTimer()

    if (ev == 'next') {
      let beans = new Array<NextBean>();
      if (this.processJson.isInGroup(this.jsonData)) {
        // this.list = this.processJson.parseGroup(this.jsonData, this.sim_id).GroupId

        beans = this.processJson.parseGroupingNext(this.sim_id,this.jsonData)
        this.sendNext({type: 'grouping', datas: beans})
      } else {
        beans = this.processJson.parseNext(this.sim_id)
        this.sendNext({type: "", datas: beans})
      }
    } else if (ev == 'screen') {
      let action
      for (let s of this.currNode) {
        if (s.g_id == this.currGid) {
          action = {action: 'screen', datas: s}
        }
      }
      this.getPushScreen(action)
    } else if (ev == 'InputShow') {
      this.keyInput = true;
      this.showFlag = false;
    } else if (ev.g_id) {
      this.currGid = ev.g_id
      this.currScence = this.getSelectScence();
      console.log(ev.g_id)
    }
  }

  getSelectScence() {
    if(this.currNode&& this.currNode.length==1){
      return this.currNode[0]
    }
    for (let s of this.currNode) {
      console.log(s.g_id)
      console.log(this.currGid)
      if (s.g_id == this.currGid) {
        return s
      }
    }
  }

  currGid='-1';

  free() {
    this.getPushFreeGroListForPhone(this.processJson.parseGroup(this.jsonData, this.sim_id))
  }

  random() {
    /**{"sim_id":18,"GroupId":[{"type":"fixed","img":"","text":"固定配额分组","limit":"3","id":"g1"},{"type":"percent","img":"","text":"比例配额分组","limit":"3","id":"g2"},{"type":"remain","img":"","text":"剩余配额分组","limit":"3","id":"g3"}],"deviceType":"pad","token":"234fc9e0329b40cdbd7691233e7ae5c6"}*/
    this.getRandomGroForStu(this.processJson.parseGroup(this.jsonData, this.sim_id))
  }

  sendNext(next) {
    console.log(next)
    /**[{"g_id":"-1","g_name":"少放点撒地方","n_id":"1","s_data":[],"action":"pad_process_upadte"}]*/
    this.addExercisesStep(next)
  }

  sendGroup() {

  }

  ionViewDidLeave() {
    if (this.wsReciever)
      this.wsReciever.unsubscribe()
  }

  currScence;

  addExercisesStep(params) {
    this.http.addExercisesStep(params).subscribe(res => {
      console.log("=======>")
      if(params.type=='grouping'){
        this.groupList = this.processJson.parseGroup(this.jsonData, this.sim_id);
        if (this.groupList && this.groupList.GroupId && this.groupList.GroupId.length > 0) {
          this.currGid = this.groupList.GroupId[0].id
        }
      }

      this.currNode = res['listScenes']

      this.processJson.setCurrNode(this.currNode)
      this.currScence = this.getSelectScence();
      console.log(this.currScence)
      //tieba QQ weibo brain bullet select web
      if (JSON.stringify(this.currScence).indexOf('SG_tieba') != -1) {
        this.sType = 'baidu';//fork,baidu,weibo,qq,storm,danmu,taolun?group,default
      }
      else if (JSON.stringify(this.currScence).indexOf('SG_QQ') != -1) {
        this.sType = 'qq';
      }
      else if (JSON.stringify(this.currScence).indexOf('SG_weibo') != -1) {
        this.sType = 'weibo';
      }
      else if (JSON.stringify(this.currScence).indexOf('SG_brain') != -1) {
        this.sType = 'storm';
      }
      else if (JSON.stringify(this.currScence).indexOf('SG_bullet') != -1) {
        this.sType = 'danmu';
      }
      else if (JSON.stringify(this.currScence).indexOf('SG_select') != -1) {
        this.sType = 'fork';
      } else {
        this.sType = 'default';
      }
      // this.processJson.setCurrNode("");
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

  getPushScreen(params) {
    this.http.getPushScreen(params).subscribe(res => {
      console.log("=======>")
      console.log(res)
    })
  }

  showFlag = true;
  counter;

  onbActive() {
    if (!this.showFlag) {
      this.showFlag = true;
      this.keyInput = false;

    }
    this.resetTimer()
  }

  resetTimer() {
    clearTimeout(this.counter)
    this.counter = setTimeout(() => {
      this.showFlag = false;
      console.log("time up")
    }, 5000)
  }

  ionViewDidLoad() {
    this.counter = setTimeout(() => {
      this.showFlag = false;
    }, 5000)
    this.userData.getProcessJsonData().then(value => {
      this.jsonData = JSON.parse(value);
      console.log('jsonData=================>')
      console.log(this.jsonData)


      let startBean = this.processJson.start(this.jsonData, this.sim_id)
      console.log(startBean)
      this.http.getScence({n_id:startBean[0].curr_n_id}).subscribe(res=>{
        console.log(res)
        let listScenes=new Array()
        listScenes.push({g_id:startBean[0].g_id,n_id:startBean[0].curr_n_id,s_data:JSON.parse(res['list'][0]["s_data"])})
        this.currNode =listScenes

        this.processJson.setCurrNode(this.currNode)
        this.currScence = this.getSelectScence();
      })


    })


    if (this.ws.messages) {
      this.wsReciever = this.ws.messages.subscribe(msg => {
        let curr = JSON.parse(msg);
        let action = curr.action
        console.log('curr========>')
        console.log(curr)
        switch (action) {
          case 'phone_insert_group':

            //todo 自由分组 更新分组信息
            break;
          case 'pad_process_upadte':
            this.currNode = curr
            break
        }

      })
    }

  }

}

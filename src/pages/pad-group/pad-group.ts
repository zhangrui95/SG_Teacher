import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {ServerSocket} from "../../providers/ws.service";
import {UserData} from "../../providers/user-data";
import {GroupBean, NextBean, ProcessJSONUtil} from "../../providers/ProcessJSONUtil";
import {CommentDetailPage} from "../comment-detail/comment-detail";
import {PadGroupListPage} from "../pad-group-list/pad-group-list";
import {DecisionDetailPage} from "../decision-detail/decision-detail";
import "rxjs/add/operator/retryWhen";

@IonicPage()
@Component({
  selector: 'page-pad-group',
  templateUrl: 'pad-group.html',
})
export class PadGroupPage {
  @ViewChild('currpage') currpage
  list = [];
  style = [];
  jsonData: any;
  currNode;
  sim_id = "111";
  curr_nid = {nid: ""};
  keyInput = false;
  content;
  n_id;
  groupsCount
  simType = ""
  memberCount
  userId;
  mapShow = false;
  sType = '';//fork,baidu,weibo,qq,storm,danmu,taolun?group,default
  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public ws: ServerSocket, public http: ProxyHttpService, public userData: UserData, public processJson: ProcessJSONUtil) {
    // this.ws.connect();
    // this.sim_id = navParams.data.sim_id + ""
    this.userData.getSimid().then(val => {
      this.sim_id = val;
      console.log(val)
    })
    this.userData.getUserID().then(value => this.userId = value)
    this.userData.getSimType().then(value => this.simType = value || '')
    this.n_id = this.navParams.get('n_id');
    this.groupsCount = this.navParams.get('groupsCount');
    this.memberCount = this.navParams.get('memberCount');
  }

  wsReciever
  //
  // ionViewDidLeave() {
  //   if(this.wsReciever)
  //   this.wsReciever.unsubscribe();
  // }
  groupList = new GroupBean;
  isGrouped = false;

  showToast(position: string, text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }

  currStatus;
  canNext = true;
  currday = -1;

  onNext(ev?) {
    this.resetTimer()
    if (ev == 'next') {
      if (!this.canNext) {
        return
      }
      this.canNext = false;
      if (this.simType == 'gold') {
        if (this.currday >= 18) {
          this.sendEnd()
        }
      }
      if (!this.grouped) {
        this.showToast("bottom", '请先选择分组类型')
        this.canNext = true;
        return;
      }
      if (!this.currScence||!this.currScence.s_data||this.currScence.s_data.length==0) {
        this.showToast("bottom", '请各组参与人员配合完成当前步骤')
        this.canNext = true;
        return;
      }


      let beans = new Array<NextBean>();

      if (!this.isGrouped) {
        console.log(this.currScence)
        if (this.currScence) {
          for (let o of this.jsonData) {
            console.log(this.currScence)
            if (o.id == this.currScence.n_id) {
              if (o.type == 'grouping') {

                // if (this.simType == 'gold') {
                //   this.groupList = this.processJson.goldGroup(this.sim_id, this.groupsCount, this.memberCount);
                //
                // } else {
                //   this.groupList = this.processJson.parseGroup(this.jsonData, this.sim_id);
                // }

                this.groupList = this.processJson.parseGroup(this.jsonData, this.sim_id);
                console.log(this.groupList)
                this.sType = "group"
                this.isGrouped = true;
                this.grouped = false;
                this.canNext = true;
                return;
              }
            }
          }
        }
      }

      if (this.processJson.isInGroup(this.jsonData)) {
        // this.list = this.processJson.parseGroup(this.jsonData, this.sim_id).GroupId
        let f = confirm("是否确定结束分组并进入下一步？");
        if (f) {
          let remain_g_id = this.processJson.getRemainGroup(this.jsonData)
          if (this.simType == 'gold') {
            beans = this.processJson.parseGoldGroupingNext(this.sim_id, this.jsonData, this.groupList)
          } else {
            beans = this.processJson.parseGroupingNext(this.sim_id, this.jsonData)
          }


          this.currday = 0;
          this.sendNext({
            type: 'grouping',
            datas: beans,
            remain_g_id: remain_g_id || '',
            sim_id: this.sim_id,
            project_type: this.simType
          })
          return;
        }
        this.canNext = true;

      } else {
        beans = this.processJson.parseNext(this.sim_id)
        this.sendNext({type: "", datas: beans, project_type: this.simType})
      }

    } else if (ev == 'screen') {
      let action
      if (this.simType == 'gold') {
        action = {action: 'screen', datas: this.currScence, n_id: this.currScence.n_id, sim_id: this.sim_id}

        if (this.sType == 'group') {
          action = {action: 'screen', datas: this.groupList, n_id: this.currScence.n_id, sim_id: this.sim_id}
        }
        if (this.sType == 'goldend') {
          action = {action: 'screen', datas:{op:'end',list:this.rankList}, n_id: this.currScence.n_id, sim_id: this.sim_id}
        }
      } else {
        for (let s of this.currNode) {
          if (s.g_id == this.currGid) {
            action = {action: 'screen', datas: s, n_id: this.currScence.n_id, sim_id: this.sim_id}
          }
        }
        if (this.sType == 'group') {
          action = {action: 'screen', datas: this.groupList, n_id: this.currScence.n_id, sim_id: this.sim_id}
        }
        if(!action){
          if(this.currNode.length==1){
            action= {action: 'screen', datas: this.currNode[0], n_id: this.currScence.n_id, sim_id: this.sim_id}
          }
        }

      }

      this.getPushScreen(action)
    } else if (ev == 'InputShow') {
      this.keyInput = true;
      this.showFlag = false;
    } else if (ev == 'mapShow') {
      this.mapShow = true;
    } else if (ev.g_id) {
      if (this.currNode.length <= 1) {
        this.showToast("bottom", '尚未进行分组操作，不能切换')
        return;
      }
      this.currGid = ev.g_id
      this.currScence = this.getSelectScence();
      if (!this.currScence) {
        this.showToast("bottom", '该分组暂无法查看状态')
        return;
      }
      this.curr_nid.nid = this.currScence.n_id;

      console.log(this.currScence)
      if (this.currScence) {
        if (JSON.stringify(this.currScence).indexOf('SG_tieba') != -1) {

          this.changeSType('baidu')
        }
        else if (JSON.stringify(this.currScence).indexOf('SG_QQ') != -1) {

          this.changeSType('qq')
        }
        else if (JSON.stringify(this.currScence).indexOf('SG_weibo') != -1) {

          this.changeSType('weibo')
        }
        else if (JSON.stringify(this.currScence).indexOf('SG_brain') != -1) {

          this.changeSType('storm')
        }
        else if (JSON.stringify(this.currScence).indexOf('SG_bullet') != -1) {
          this.changeSType('danmu')
        }
        else if (JSON.stringify(this.currScence).indexOf('SG_select') != -1) {
          this.changeSType('fork')
        } else if (this.currScence.s_data && this.currScence.s_data.comeList.length > 0) {

          this.changeSType('default')
        } else {
          this.changeSType('empty')
        }
      }
      console.log(ev.g_id)
    } else if (ev == "grouped") {
      this.grouped = true;
    } else if (ev == 'detail') {
      if (this.sType == "group") {
        if (!this.grouped) {
          this.showToast("bottom", '请先选择分组类型')
          return;
        }

        this.navCtrl.push(PadGroupListPage)
      } else {
        if (this.sType == 'weibo' ||
          this.sType == 'danmu' ||
          this.sType == 'storm' ||
          this.sType == 'qq' ||
          this.sType == 'baidu'
        ) {
          this.navCtrl.push(CommentDetailPage, {n_id: this.curr_nid.nid, g_id: this.currGid})
        } else if (this.sType == 'fork') {
          if (this.simType == 'gold') {
            this.showToast('bottom', '当前场景不能进入详情')
            return
          }
          this.navCtrl.push(DecisionDetailPage, {n_id: this.curr_nid.nid, g_id: this.currGid})
        } else {
          this.showToast('bottom', '当前场景不能进入详情')
        }


      }


    }
  }
  rankList
  grouped = true;

  getSelectScence() {
    if (this.currNode && this.currNode.length == 1) {
      return this.currNode[0]
    }
    let tempScence
    for (let s of this.currNode) {

      console.log(s.g_id)
      console.log(this.currGid)

      if (s.g_id == this.currGid) {
        if (s.s_data.length != 0) {
          tempScence = s
        }
      }
    }
    return tempScence
    // if (tempScence) {
    //   return tempScence
    // } else {
    //   // for (let s of this.currNode) {
    //   //
    //   //   console.log(s.g_id)
    //   //   console.log(this.currGid)
    //   //   if (s.s_data.length != 0) {
    //   //     this.currGid = s.g_id
    //   //     tempScence = s
    //   //   }
    //   // }
    //   return tempScence
    // }
  }

  sendEnd() {
    //todo 结束场景

    this.http.getRankingForU({sim_id: this.sim_id}).subscribe(res => {
      console.log(res)
      this.rankList=res['list']
      this.changeSType('goldend')
      alert(res)
      //todo 单独做一个结束场景显示排名
    })

    // "list": [
    //   {
    //     "g_name": "三特",
    //     "money_g": "123",
    //     "g_image": "\\files\\Image\\20180117170749_911.jpg",
    //     "g_id": "1516180064216"
    //   },


  }

  changeSType(sType) {
    this.sType = '';
    setTimeout(() => {
      this.sType = sType
    }, 500)
  }

  currGid = '-1';

  free() {
    this.getPushFreeGroListForPhone(this.processJson.parseGroup(this.jsonData, this.sim_id))
  }

  random() {
    /**{"sim_id":18,"GroupId":[{"type":"fixed","img":"","text":"固定配额分组","limit":"3","id":"g1"},{"type":"percent","img":"","text":"比例配额分组","limit":"3","id":"g2"},{"type":"remain","img":"","text":"剩余配额分组","limit":"3","id":"g3"}],"deviceType":"pad","token":"234fc9e0329b40cdbd7691233e7ae5c6"}*/
    this.getRandomGroForStu(this.processJson.parseGroup(this.jsonData, this.sim_id))
  }

  sendNext(next) {

    this.addExercisesStep(next)
  }

  sendGroup() {

  }

  ionViewDidLeave() {
    if (this.wsReciever)
      this.wsReciever.unsubscribe()
  }

  currScence;

  addStart(params) {
    this.http.addExercisesStep(params).subscribe(res => {
      console.log(res)
    })
  }
  refresh(){
    this.currpage.refreshdata();
  }
  addExercisesStep(params) {
    this.http.addExercisesStep(params).subscribe(res => {
        if (this.currday >= 0) {
          this.currday++;
        }

        this.canNext = true;
        if (params.type == 'grouping') {

          if (this.groupList && this.groupList.GroupId && this.groupList.GroupId.length > 0) {
            this.currGid = this.groupList.GroupId[0].id
          }
        }

        //
        // for (let sdata of res['listScenes']) {
        //   if (!sdata.n_id || sdata.n_id.length == 0) {
        //     this.showToast('bottom', '请各组参与人员配合完成当前步骤')
        //     return
        //   }
        // }

      if(res['listScenes'].length==1){
        if(res['listScenes'][0]['n_id']==''){
          if(this.simType=='gold'){
            this.showToast('bottom','正在等待各队投票')

          }else{
            this.showToast('bottom','当前演练已结束')

          }
          return
        }
      }
        this.currNode = res['listScenes']

        this.processJson.setCurrNode(this.currNode)
        this.currScence = this.getSelectScence();
        console.log("*-*-*-*-*--*--*-*-*-*-*++++++++")
        console.log(this.currScence)
        // if (!this.currScence) {
        //   this.showToast("bottom", '请各组参与人员配合完成当前步骤')
        //   return;
        // }


        console.log(this.currScence)
        //tieba QQ weibo brain bullet select web
        if (this.currScence) {
          this.curr_nid.nid = this.currScence.n_id;
          if (JSON.stringify(this.currScence).indexOf('SG_tieba') != -1) {

            this.changeSType('baidu')
          }
          else if (JSON.stringify(this.currScence).indexOf('SG_QQ') != -1) {

            this.changeSType('qq')
          }
          else if (JSON.stringify(this.currScence).indexOf('SG_weibo') != -1) {

            this.changeSType('weibo')
          }
          else if (JSON.stringify(this.currScence).indexOf('SG_brain') != -1) {

            this.changeSType('storm')
          }
          else if (JSON.stringify(this.currScence).indexOf('SG_bullet') != -1) {
            this.changeSType('danmu')
          }
          else if (JSON.stringify(this.currScence).indexOf('SG_select') != -1) {
            this.changeSType('fork')
          } else if (this.currScence.s_data && this.currScence.s_data.comeList.length > 0) {

            this.changeSType('default')
          } else {
            this.changeSType('empty')
          }
        } else {
          this.changeSType('empty')
        }
        // this.processJson.setCurrNode("");
      }
    )
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
      this.http.getScence({n_id: startBean[0].curr_n_id}).subscribe(res => {
        console.log(res)
        let listScenes = new Array()
        listScenes.push({
          g_id: startBean[0].g_id,
          n_id: startBean[0].curr_n_id,
          type: startBean[0].type,
          s_data: JSON.parse(res['list'][0]["s_data"])
        })
        this.currNode = listScenes

        this.processJson.setCurrNode(this.currNode)
        this.currScence = this.getSelectScence();
        this.sType = 'default'
        console.log(this.currScence)
        this.curr_nid.nid = this.currScence.n_id;
        let beans = this.processJson.getSendStart(this.sim_id)
        this.addStart({type: "start", datas: beans ,project_type:this.simType,sim_id:this.sim_id})
      })


    })

    // setInterval(() => {
    //   if (!this.ws.messages ) {
    //     this.ws.connect();
    //
    //   }
    //   if(this.ws.messages&&this.wsReciever==null){
    //     this.registeReciever()
    //   }
    //
    // }, 5000)
    // if(this.ws.messages != null&&this.wsReciever==null){
    //   this.registeReciever()
    // }


  }
  registeReciever(){
    this.wsReciever = this.ws.messages.subscribe(msg => {
      let curr = JSON.parse(msg);
      let action = curr.action
      console.log('curr========>')
      console.log(curr)
      switch (action) {
        case 'phone_insert_group':
          let arr = curr.list;
          for (let g of arr) {
            for (let group of  this.groupList.GroupId) {
              if (g['g_id'] == group.id) {
                group.num = g['StuTotal']
              }
            }
          }

          //todo 自由分组 更新分组信息
          break;
        case 'pad_process_upadte':
          // this.currNode = curr
          break
      }

    })
  }
  getcomment() {
    const params = {
      sim_id: this.sim_id,
      g_id: this.currGid,
      u_id: this.userId,
      n_id: this.curr_nid.nid,
      answer: this.content
    }
    this.http.addStuAnswer(params).subscribe(res => {
      console.log(res)


    });
    this.keyInput = false;
    this.content = '';
  }

  getOut() {
    let params = {sim_id:this.sim_id}
    this.http.updateExeState(params).subscribe(res => {
      console.log(res)
      this.navCtrl.pop({animate: false});
    });
  }

  mapOpen() {
    this.mapShow = false;
  }

}

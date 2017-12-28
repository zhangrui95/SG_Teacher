import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {ServerSocket} from "../../providers/ws.service";
import {UserData} from "../../providers/user-data";
import {ProcessJSONUtil} from "../../providers/ProcessJSONUtil";

@IonicPage()
@Component({
  selector: 'page-pad-group',
  templateUrl: 'pad-group.html',
})
export class PadGroupPage {

  list = [
    {name: '辉发乳业', num: '10'},
    {name: '三特食品', num: '20'},
    {name: '地方政府', num: '36'},
    {name: '当事人', num: '89'},
    {name: '群众', num: '44'},
  ];
  style = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public ws: ServerSocket, public http: ProxyHttpService, public userData: UserData, public processJson: ProcessJSONUtil) {

  }

  wsReciever

  ionViewDidLeave() {
    // this.wsReciever.unsubscribe();
  }

  jsonData

  ionViewDidLoad() {
    this.userData.getProcessJsonData().then(value => {
      this.jsonData = value;
      console.log('----------start----------'+ this.jsonData)
      console.log(this.processJson.parseStart(this.jsonData))
      console.log(this.processJson.nextNodes)
    })

    this.ws.connect();
    if (this.ws.messages) {
      this.wsReciever = this.ws.messages.subscribe(msg => {
        console.log(msg);

      })
    }

    // for(let i in this.list){
    //   let num = this.list[i].num
    //   this.style.push({width:+ num +'%'})
    // }
  }

}

import {Component} from '@angular/core';
import {IonicApp, IonicPage, Keyboard, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {UsersPage} from "../users/users";
import {UserData} from "../../providers/user-data";
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {ServerSocket} from "../../providers/ws.service";
import {PadGroupPage} from "../pad-group/pad-group";

@IonicPage()
@Component({
  selector: 'page-wait',
  templateUrl: 'wait.html',
})
export class WaitPage {
  name;
  phone;
  userId;
  imagepath;


  constructor(public ionicApp: IonicApp, public navCtrl: NavController, public navParams: NavParams, public keyboard: Keyboard, public toastCtrl: ToastController,
              public platform: Platform, public userData: UserData, public http: ProxyHttpService, public ws: ServerSocket) {

    this.ws.connect()
  }

  socketSubscription

  ionViewDidLoad() {

    this.userData.getProcessJsonData().then(val=>{
        console.log(val)
    })
    if (this.ws.messages) {
      this.socketSubscription = this.ws.messages.subscribe((message: string) => {
        console.log('received message from server11111: ', message)
      })
    }
  }

  ionViewDidLeave() {
    this.socketSubscription.unsubscribe()
  }

  next() {
    this.navCtrl.push(PadGroupPage, {sim_id: this.navParams.data.sim_id});

  }

  getUser() {
    this.navCtrl.push(UsersPage, {userId: this.userId, name: this.name, phone: this.phone, imagepath: this.imagepath});
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

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import {IonicPage, LoadingController, NavController, ToastController} from 'ionic-angular';

import { UserSign } from '../../interfaces/user-options';
import { LoginsPage } from "../logins/logins";
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {UserData} from "../../providers/user-data";


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  login: UserSign = { username: '', password: '' , RealName: '', phone: ''};
  submitted = false;

  constructor( public navCtrl: NavController,
               public http: ProxyHttpService,
               public userData:UserData,
               public toastCtrl: ToastController,
               public loadingCtrl: LoadingController) { }

  onLogin(form: NgForm) {
    this.submitted = true;
    let loading = this.loadingCtrl.create({
      content: '注册中...'
    });
    if (form.valid) {
      loading.present();
      const params = {LoginName:this.login.username, LoginPwd:this.login.password, RealName:this.login.RealName, Phone:this.login.phone}
      this.http.register(params).subscribe(res => {
        if(res['code'] == 0){
          loading.dismiss();
          this.goLogin(this.login.username);
          this.showToast('bottom',res['msg']);
        }else{
          loading.dismiss();
          this.showToast('bottom',res['msg']);
        }
      });

    }
  }

  goLogin(name:string){
    this.navCtrl.push(LoginsPage,{userName:name});
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

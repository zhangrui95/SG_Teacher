import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {LoadingController, NavController, ToastController} from 'ionic-angular';
import { UserOptions } from '../../interfaces/user-options';
import { SigninPage } from "../signin/signin";
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {IndexPage} from "../index/index";

@Component({
  selector: 'page-logins',
  templateUrl: 'logins.html',
})
export class LoginsPage {

  login: UserOptions = { username: '', password: '' };
  submitted = false;
  constructor(
    public navCtrl: NavController,
    public http: ProxyHttpService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;
    let loading = this.loadingCtrl.create({
      content: '登录中...'
    });
    if (form.valid) {
      loading.present();
      const params = {LoginName:this.login.username, LoginPwd:this.login.password}
      this.http.login(params).subscribe(res => {
        if(res['code'] == 0){
          loading.dismiss();
          this.navCtrl.push(IndexPage, {userid:'', name:res['username'], phone:res['phone'], userId:res['userId']});
        }else{
          loading.dismiss();
          this.showToast('top',res['msg']);
        }
      });
    }
  }

  onSignup() {
    this.navCtrl.push(SigninPage);
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

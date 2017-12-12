import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {IonicPage, LoadingController, NavController, ToastController} from 'ionic-angular';
import { findPassword } from '../../interfaces/user-options';
import {ProxyHttpService} from "../../providers/proxy.http.service";

@IonicPage()
@Component({
  selector: 'page-find-password',
  templateUrl: 'find-password.html',
})
export class FindPasswordPage {


  login: findPassword = { phone: '', password: '' , password1: '', verificationCode: ''};
  submitted = false;

  constructor( public navCtrl: NavController,
               public http: ProxyHttpService,
               public toastCtrl: ToastController,
               public loadingCtrl: LoadingController) { }

  onFind(form: NgForm) {
    this.submitted = true;
    if (form.valid) {

    }
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

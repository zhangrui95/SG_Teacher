import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-operation',
  templateUrl: 'operation.html',
})
export class OperationPage {
  showBtn = false;
  showAnimate=false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperationPage');
  }

  getBtn(){
    if(!this.showBtn){
      this.showBtn = true;
    }else{
      this.showBtn = false;
    }
  }

  showBg(){
    this.showAnimate = true;
    this.showBtn = true;
  }

  hideBg(){


    this.showBtn = false;
  }
}

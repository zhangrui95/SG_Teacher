import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-current-group',
  templateUrl: 'current-group.html',
})
export class CurrentGroupPage {
  list = [{name:'三特食品',num:'7',limit:'99'},{name:'三特食品',num:'7',limit:'99'},{name:'三特食品',num:'7',limit:'99'},{name:'三特食品',num:'7',limit:'99'},{name:'三特食品',num:'7',limit:'99'}]
  PIndex;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  box = [''];

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentGroupPage');
  }

  pChoice(i){
    this.PIndex = i;
  }
  add(){
    this.box.push('');
  }
  del(index){
    this.box.splice(index, 1);
  }

}

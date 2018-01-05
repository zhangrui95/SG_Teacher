import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-grouping',
  templateUrl: 'grouping.html',
})
export class GroupingPage {
  list = [
    {img:'assets/img/img1.png',name:'地方政府', num:'07',limit:'99'},
    {img:'assets/img/img1.png',name:'辉发乳业', num:'11',limit:'50'},
    {img:'assets/img/img1.png',name:'三特食品', num:'34',limit:'145'},
    {img:'assets/img/img1.png',name:'地方政府', num:'97',limit:'777'},
    {img:'assets/img/img1.png',name:'辉发乳业', num:'11',limit:'50'},
    {img:'assets/img/img1.png',name:'三特食品', num:'34',limit:'145'},
    {img:'assets/img/img1.png',name:'地方政府', num:'97',limit:'777'},
    {img:'assets/img/img1.png',name:'辉发乳业', num:'25',limit:'91'}
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupingPage');
  }

}

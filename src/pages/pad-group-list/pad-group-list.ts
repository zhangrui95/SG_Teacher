import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pad-group-list',
  templateUrl: 'pad-group-list.html',
})
export class PadGroupListPage {

  list = [
    {img:'assets/img/img1.png',name:'辉发乳业',num:'10',limit:'99',student:[{name:'李四'}, {name:'王五'}, {name:'王丰富'}]},
    {img:'assets/img/img1.png',name:'三特食品',num:'20',limit:'99',student:[{name:'李四'}, {name:'王五'}, {name:'王丰富'},{name:'李四'}, {name:'王五'}, {name:'王丰富'}]},
    {img:'assets/img/img1.png',name:'地方政府',num:'36',limit:'99',student:[{name:'李四'}, {name:'王五'}, {name:'王丰富'}]},
    {img:'assets/img/img1.png',name:'当事人',num:'89',limit:'99',student:[{name:'李四'}, {name:'王五'}, {name:'王丰富'}]},
    {img:'assets/img/img1.png',name:'群众',num:'44',limit:'99',student:[{name:'李四'}, {name:'王五'}, {name:'王丰富'}]},
  ];
  imgShow = 'assets/img/show.png';
  stuBoxIndex;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  showCour(i){
    console.log(i)
    this.stuBoxIndex = i;
  }



}

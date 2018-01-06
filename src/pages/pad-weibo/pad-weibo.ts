///<reference path="../../../node_modules/ionic-angular/tap-click/tap-click.d.ts"/>
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the BaidutbPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pad-weibo',
  templateUrl: 'pad-weibo.html',
})

export class PadWeiboPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaidutbPage');
  }

}

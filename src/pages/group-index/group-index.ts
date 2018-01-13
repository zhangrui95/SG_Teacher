import {Component, Input, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ServerSocket} from "../../providers/ws.service";


@IonicPage()
@Component({
  selector: 'page-group-index',
  templateUrl: 'group-index.html',
})
export class GroupIndexPage implements OnInit{
  ngOnInit(): void {
    console.log(this.s_data)
    this.ws.connect();
    if(this.ws.messages){
      console.log(this.ws.messages)
      this.ws.messages.subscribe(res=>{
        console.log("2$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        console.log(res)
      })
    }


  }

  @Input()
  s_data :any=new Object();
  @Input()
  sim_id :any=new Object();
  constructor(public navCtrl: NavController, public navParams: NavParams,public ws :ServerSocket) {

  }




}

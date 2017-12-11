import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ActionSheetController, AlertController,
  LoadingController, ToastController
} from 'ionic-angular';

import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";

import { PasswordPage } from "../password/password"
import { PhonePage } from '../phone/phone'
import { UpdatePage } from '../update/update'
import { LoginsPage } from '../logins/logins'
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {UserData} from "../../providers/user-data";
@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  name;
  phone;
  userId;
  imagepath;
  avatar = "assets/img/header.png";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public imagePicker: ImagePicker,
              public camera: Camera,
              public userData:UserData,
              public http: ProxyHttpService,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController
  ) {
    this.userData.getUsername().then(value => this.name=value)
    this.phone = navParams.get('phone');
    this.userId = navParams.get('userId');
    this.imagepath = navParams.get('imagepath');
  }
  goChangePhone(){
    this.navCtrl.push(PhonePage, {userId: this.userId});
  }
  goChangePassword(){
    this.navCtrl.push(PasswordPage, {userId: this.userId});
  }
  goUpdate(){
    this.navCtrl.push(UpdatePage);
  }
  getOut(){
    this.userData.logout();
    this.navCtrl.push(LoginsPage);

  }
  ionViewWillEnter(){
    let url;
    this.userData.getAvatar().then(value => {
      url=value;
    })

    if(url == '' || url == null|| url == '\\files\\Head\\crisisUser.png'){
      this.avatar = "assets/img/header.png";
    }else{
      this.avatar=ProxyHttpService.IP_PORT+url;
    }
    let alert = this.alertCtrl.create({title: "上传失败", message: this.avatar, buttons: ["确定"]});
    alert.present().then(value => {
      return value;
    });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: '拍照',
        role: 'takePhoto',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: '从相册选择',
        role: 'chooseFromAlbum',
        handler: () => {
          this.chooseFromAlbum();
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log("cancel");
        }
      }]
    });

    actionSheet.present().then(value => {
      return value;
    });
  }

  imgAdd(){
    const params = {img: this.avatar, imgpath: this.imagepath , userId: this.userId}
    let loading = this.loadingCtrl.create({
      content: '上传中...'
    });
    this.http.updateHeadPic(params).subscribe(res => {
      if(res['code'] == 0){
        loading.dismiss();
        this.showToast('top', res['msg']);
        this.avatar = res['ImgUrl'];
      }else{
        loading.dismiss();
        this.showToast('top', res['msg']);
      }
    });
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      targetWidth: 70,
      targetHeight: 70,
      saveToPhotoAlbum: true,
    };

    this.camera.getPicture(options).then(image => {
      console.log('Image URI: ' + image);
      this.avatar = image.slice(7);
      this.imgAdd();
    }, error => {
      console.log('Error: ' + error);
    });
  }

  chooseFromAlbum() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 1,
      width: 70,
      height: 70
    };
    this.imagePicker.getPictures(options).then(images => {
      if (images.length > 1) {
        this.presentAlert();
      } else if (images.length === 1) {
        console.log('Image URI: ' + images[0]);
        this.avatar = images[0].slice(7);
        this.imgAdd();
      }
    }, error => {
      console.log('Error: ' + error);
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({title: "上传失败", message: "只能选择一张图片作为头像哦", buttons: ["确定"]});
    alert.present().then(value => {
      return value;
    });
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

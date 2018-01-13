import {Component} from '@angular/core';
import {IonicApp, IonicPage, Keyboard, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {UsersPage} from "../users/users";
import {ClassroomPage} from "../classroom/classroom";
import {RecordsPage} from "../records/records";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {SimulationPage} from "../simulation/simulation";
import {UserData} from "../../providers/user-data";
import {GradePage} from "../grade/grade";
import {ProxyHttpService} from "../../providers/proxy.http.service";
import {ServerSocket} from "../../providers/ws.service";
import {Subscription} from "rxjs/Subscription";
import {PadGroupPage} from "../pad-group/pad-group"

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  name;
  phone;
  userId;
  imagepath;
  projectBrief = true;
  choiceClass = false;
  pName;
  pDescription;
  pType;
  check = 0;
  classIndex;
  className = '';
  CourseName = '';
  OldclassName = '';
  OldCourseName = '';
  CourseIndex;
  load = false;
  imgShow = 'assets/img/hide.png';
  imgShows = 'assets/img/hide.png';
  ShowOrHide = false;
  ShowCourse = false;
  private registerBackEvent: Function
  registerBackButton


  exitApp() {

    let activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive();
    if (activePortal) {
      activePortal.dismiss().catch(() => {
      });
      activePortal.onDidDismiss(() => {
      });
      return;
    }
    if (this.keyboard.isOpen()) {
      this.keyboard.close()
      return
    }
    if (!this.platform.url().endsWith("logins") && !this.platform.url().endsWith("index")) {
      this.navCtrl.pop()
      return
    }
    if (this.registerBackButton) {
      this.platform.exitApp()
    } else {
      this.registerBackButton = true
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'bottom',
        cssClass: 'toast-black'
      }).present();
      setTimeout(() => this.registerBackButton = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }

  constructor(public ionicApp: IonicApp, public navCtrl: NavController, public barcodeScanner: BarcodeScanner, public navParams: NavParams, public keyboard: Keyboard, public toastCtrl: ToastController,
              public platform: Platform, public userData:UserData,public http:ProxyHttpService,public ws:ServerSocket) {
    this.registerBackEvent = this.platform.registerBackButtonAction(() => {

      this.exitApp()
    }, 10)
    this.ws.connect()

  }
  selectedProject;
  selectedClass;
  selectedCourse;
  OldselectedClass;
  OldselectedCourse;
  projectList;
  classList;
  courseList;
  loading = true;


  private socketSubscription: Subscription


  ionViewDidLoad() {
    // console.log('ionViewDidLoad')
    this.http.getProjectList({pi:'1',ps:'9999',key:''}).subscribe(resProject=>{
      this.loading = false;
      this.projectList=resProject['list'];
      if(!this.projectList||this.projectList.length==0){
        return
      }
      this.selectedProject = this.projectList[0].p_id;
      this.pName = this.projectList[0].p_name;
      this.pDescription = this.projectList[0].p_description;
      this.pType = this.projectList[0].p_type;
      this.http.getCourseListByUid({pi:'1',ps:'9999',key:''}).subscribe(resCourse=>{
        this.courseList=resCourse['list'];
        this.http.classList({pi:'1',ps:'9999',key:''}).subscribe(resClass=>{
          this.classList=resClass['list'];
        })
      })
    })
    if(this.ws.messages){
      this.socketSubscription = this.ws.messages.subscribe((message: string) => {
        console.log('received message from server11111: ', message)
      })
    }

  }
  ionViewDidLeave(){
    if(this.socketSubscription)
    this.socketSubscription.unsubscribe()
  }
  sim_id

  next(){
    console.log('*****************')
    console.log(this.selectedProject)
    this.http.start({p_id: this.selectedProject,cla_id:this.selectedClass,cour_id:this.selectedCourse,exercisetypes:"0",token:this.userData.userToken,deviceType:"pad"}).subscribe(res=>{

     if(res['code']=='0'){
       this.load = true;
       this.sim_id=res['sim_id']
       this.userData.setSimid(this.sim_id)
       this.userData.setProcessJsonData(res['list'][0]['p_data'])
       // this.http.testAddStus({sim_id: this.sim_id}).subscribe(res=>{
       //   console.log(res)
       // })
     }else{
       this.showToast('bottom','创建演练失败')
     }

    })


  }
  getUser() {
    this.navCtrl.push(UsersPage, {userId: this.userId, name: this.name, phone: this.phone, imagepath: this.imagepath});
  }
  showToast(position: string, text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }
  getClassRoom() {
    this.barcodeScanner.scan({resultDisplayDuration:0}).then((barcodeData) => {
      // Success! Barcode data is here
      if(!barcodeData.cancelled){

        if (barcodeData.text.indexOf('4dec1f9e20f86b62335ba913ae29fa0d')!=-1 ) {
          let data=JSON.parse(barcodeData.text)
          this.navCtrl.push(ClassroomPage, {data:data});
        } else{
          this.showToast('bottom',"扫描到的二维码有误，请重新尝试")
        }
      }

    }, (err) => {
      // An error occurred
      console.log(err)
      this.showToast('bottom',"扫描到的二维码有误，请重新尝试")
    });

  }

  getRecords() {
    this.navCtrl.push(RecordsPage);
  }

  getSimulation(){
    this.navCtrl.push(SimulationPage);
  }

  getGrade(){
    this.navCtrl.push(GradePage);
  }

  getChoices(){
    this.OldclassName = this.className;
    this.OldCourseName = this.CourseName;
    this.OldselectedClass = this.selectedClass;
    this.OldselectedCourse = this.selectedCourse;
    this.projectBrief = false;
    this.choiceClass = true;
  }

  backProp(){
    this.className = this.OldclassName;
    this.CourseName = this.OldCourseName;
    this.selectedClass = this.OldselectedClass;
    this.selectedCourse = this.OldselectedCourse;
    this.projectBrief = true;
    this.choiceClass = false;
  }

  getClickProject(i){
    this.check = i;
    if(this.projectList[i]){
      this.selectedProject = this.projectList[i].p_id;
      this.pName = this.projectList[i].p_name;
      this.pDescription = this.projectList[i].p_description;
      this.pType = this.projectList[i].p_type;
    }

  }

  getClass(i){
    this.classIndex = i;
    this.className = this.classList[i].cla_name;
  }

  getCourse(i){
    this.CourseIndex = i;
    this.CourseName = this.courseList[i].cour_name;
  }

  getChoose(){
    if(this.classIndex == undefined){
      this.showToast('bottom',"请选择授课班级");
    }else if(this.CourseIndex == undefined){
      this.showToast('bottom',"请选择课程名称");
    }else{
      this.className = this.classList[this.classIndex].cla_name;
      this.selectedClass = this.classList[this.classIndex]. cla_id;

      this.CourseName = this.courseList[this.CourseIndex].cour_name;
      this.selectedCourse = this.courseList[this.CourseIndex].cour_id;
      this.projectBrief = true;
      this.choiceClass = false;
    }
  }

  getLoading(){
    this.next();
  }

  show(){
    if(this.ShowOrHide){
      this.imgShow = 'assets/img/hide.png';
      this.ShowOrHide = false;
    }else{
      this.imgShow = 'assets/img/show.png';
      this.ShowOrHide = true;
    }
  }

  showCour(){
    if(this.ShowCourse){
      this.imgShows = 'assets/img/hide.png';
      this.ShowCourse = false;
    }else{
      this.imgShows = 'assets/img/show.png';
      this.ShowCourse = true;
    }
  }

  getStart(){

    this.navCtrl.push(PadGroupPage,{sim_id:this.sim_id});
  }

}

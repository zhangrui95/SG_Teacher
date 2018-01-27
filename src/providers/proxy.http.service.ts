import {Injectable} from '@angular/core';


import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserData} from "./user-data";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class ProxyHttpService {

  public static IP_PORT = "http://192.168.0.52:8080";
  public static PROJECT_PACKAGE = "/VisualizationMgt"
  public BASE_URL = ProxyHttpService.IP_PORT + ProxyHttpService.PROJECT_PACKAGE

  constructor(public http: HttpClient, public userData: UserData) {

  }

  getProjectList(params) {
    return this._get("/privateProjectController/getPrivateProjectList.do", params)
  }
  updatePhone(params) {
    return this._post("/userstu/updatePhone.do", params)
  }
  getPushScreen(params){
    return this._post("/tabletController/getPushScreen.do", params)
  }
  getAnswerOfStuList(params) {
    return this._post("/phoneAppController/getAnswerOfStuList.do", params)
  }

  getGoldStatus(params) {
    return this._get("/phoneAppController/getGDKDataByNId.do", params)
  }

  updatePass(params) {
    return this._post("/userstu/updatePass.do", params)
  }

  getVersionByType(params) {
    return this._post("/version/getVersionByType.do", params)
  }

  register(params) {
    return this._post("/userstu/register.do", params)
  }

  updateHeadPic(params) {
    return this._post("/userstu/updateHeadPic.do", params)
  }
  addExercisesStep(params) {
    return this._post("/tabletController/getNextStep.do", params)
  }
  getRandomGroForStu(params) {
    return this._post("/tabletController/getRandomGroForStu.do", params)
  }
  getPushFreeGroListForPhone(params) {
    return this._post("/tabletController/getPushFreeGroListForPhone.do", params)
  }
  getSimulationList(params) {
    return this._get("/phoneAppController/getSimulationList.do", params)
  }
  classList(params?: any) {
    return this._get('/tabletController/getClassByPId.do', params)
  }
  getCourseListByUid(params?: any) {
    return this._get('/tabletController/getCourseById.do', params);
  }
  updateExeState(params?: any) {
    //sim_id
    return this._get('/tabletController/updateExeState.do', params);
  }
  getGroupDetail(params?: any) {
    return this._get('/tabletController/getGroInformationList.do', params);
  }

  start(params) {
    return this._post("/simulationController/addSimulation.do", params)
  }

  addRoleForGro(params) {
    return this._post("/tabletController/addRoleForGro.do", params)
  }

  login(params) {
    return this._post("/user/login.do", params)
  }

  initPass(params){
    return this._post("/userstu/initPass.do",params)
  }
  testAddStus(params){
    return this._get('/tabletController/addStuFroExe.do', params);
  }
  getScence(params){
    return this._get('/phoneAppController/getScenesById.do', params);
  }
  getAllStuList(params){
    return this._get('/tabletController/getAllStuList.do', params);
  }

  getPushCallStuId(params){
    return this._get('/tabletController/getPushCallStuId.do', params);
  }

  getComment(params){
    return this._get('/tabletController/getComment.do', params);
  }

  addDiscussion(params){
    return this._get('/tabletController/addDiscussion.do', params);
  }

  getDecide(params){
    return this._get('/tabletController/getDecide.do', params);
  }
  getRankingForU(params){
      return this._get('/tabletController/getRankingForU.do', params);
    }

  addStuAnswer(params){
    return this._post("/phoneAppController/addStuAnswer.do",params);
  }

  getBaseurl(){
    return ProxyHttpService.IP_PORT;
  }

  _post(url, params?: any) {
    params.deviceType="pad"
    params.token=this.userData.userToken;
    console.log('params=======>')
    console.log(JSON.stringify(params))
    if(!params.day){
      params.day="1"
    }
    return this.http.post(this.BASE_URL + url, JSON.stringify(params))
  }

  _get(url, params?: HttpParams) {
    var p = new HttpParams();
    let hasDay =false;
    for (let key in params) {
      if(key=='day'){
        hasDay=true
      }
      p = p.append(key, params[key])
    }
    if(!hasDay){
      p = p.append('day',"1")
    }
    p = p.append("deviceType", "pad");
    p = p.append("token", this.userData.userToken)
   return this.http.get(this.BASE_URL + url, {params: p})
  }
}

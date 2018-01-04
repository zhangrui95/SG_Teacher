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
    return this._get('/classManagerController/getClassManagerList.do', params)
  }
  getCourseListByUid(params?: any) {
    return this._get('/classManagerController/getCourseListByUid.do', params);
  }
  start(params) {
    return this._post("/simulationController/addSimulation.do", params)
  }
  login(params) {
    return this._post("/user/login.do", params)
  }

  initPass(params){
    return this._post("/userstu/initPass.do",params)
  }

  _post(url, params?: any) {
    params.deviceType="pad"
    params.token=this.userData.userToken;
    console.log('params=======>')
    console.log(JSON.stringify(params))
    return this.http.post(this.BASE_URL + url, JSON.stringify(params))
  }

  _get(url, params?: HttpParams) {
    var p = new HttpParams();
    for (let key in params) {
      p = p.append(key, params[key])
    }
    p = p.append("deviceType", "pad");
    p = p.append("token", this.userData.userToken)
   return this.http.get(this.BASE_URL + url, {params: p})

  }
}

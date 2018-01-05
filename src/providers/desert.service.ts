// import {Injectable} from '@angular/core';
//
//
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/of';
// import {HttpClient, HttpParams} from "@angular/common/http";
// import {UserData} from "./user-data";
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
//
// const ITEM_TENT = 101;
// const ITEM_WATER = 102;
// const ITEM_FOOD = 103;
// const ITEM_COMPASS = 104;
// const ITEM_GOLD = 105;
//
// const PLACE_START = 1101;
// const PLACE_DESERT = 1102;
// const PLACE_OASIS = 1103;
// const PLACE_VILLIGE = 1104;
// const PLACE_TOMBS = 1105;
// const PLACE_END = 1106;
//
// const WEATHER_SUNNY = 11101
// const WEATHER_HOT = 11102
// const WEATHER_SANDSTORM = 11103
// const WEATHER_HOT_SANDSTORM = 11104
//
// const EVENT_TRADE = 111101
// const EVENT_TRADE_Villige = 111102
// const EVENT_WATER_FREE = 111103
// const EVENT_WATER_ASK = 111104
//
// const STATUS_GET_LOST = 1111101
// const STATUS_GET_STAY_FOR_ASK = 1111102
// const STATUS_CAN_DIG_IN_MOUNTAIN = 1111103
//
// const totalMoney = 1000//金钱
// const totalWeight = 1000 //总负重
// const foodUnitPrice = 20;//食物单价
// const waterUnitPrice = 10;//水单价
// const goldUnitPrice = [100, 99, 98];//25天金价
// const tentUnitPrice = 10;//帐篷单价
// const compassUnitPrice = 10;//指南针单价
// const foodUnitWeight = 20;//食物单位负重
// const waterUnitWeight = 20;//水单位负重
// const goldUnitWeight = 10;//金单位负重
// const tentUnitWeight = 10;//帐篷单位负重
// const compassUnitWeight = 10;//指南针单位负重
// const goldDiggedPerDay = 50;//每天挖掘金数
//
// const hotWaterConsumeRatio = 2;//炎热天气水消耗比率
// const sandstormWaterConsumeRatio = 3;//沙尘天气水消耗比率
// const hotsandstormWaterConsumeRatio = 3;//炎热沙尘天气水消耗比率
// const getLostWaterRatio = 3;//迷路水消耗比率
//
// const hotFoodConsumeRatio = 2;//炎热天气食物消耗比率
// const sandstormFoodConsumeRatio = 3;//沙尘天气食物消耗比率
// const hotsandstormFoodConsumeRatio = 3;//炎热沙尘天气食物消耗比率
// const getLostFoodRatio = 3;//迷路食物消耗比率
//
// const villigeFoodTradeRatio = 2; //村庄食物交易比率
// const villigeWaterTradeRatio = 2;//村庄水交易比率
//
// const baseFoodConsumePerDay = 10;//食物每天消耗基准
// const baseWaterConsumePerDay = 10;//水每天消耗基准
//
// const moneyNotEnough = '钱不够';
// const weightNotEnough = '载重不够';
//
// @Injectable()
// export class DesertService {
//   public weathers = [{
//     village: WEATHER_SUNNY,
//     oasis: WEATHER_HOT,
//     tombs: WEATHER_SANDSTORM,
//     desert: WEATHER_HOT_SANDSTORM
//   }, {village: '', oasis: '', tombs: '', desert: ''}, {village: '', oasis: '', tombs: '', desert: ''}, {
//     village: '',
//     oasis: '',
//     tombs: '',
//     desert: ''
//   }, {village: '', oasis: '', tombs: '', desert: ''}, {village: '', oasis: '', tombs: '', desert: ''}, {
//     village: '',
//     oasis: '',
//     tombs: '',
//     desert: ''
//   }, {village: '', oasis: '', tombs: '', desert: ''}, {village: '', oasis: '', tombs: '', desert: ''}, {
//     village: '',
//     oasis: '',
//     tombs: '',
//     desert: ''
//   }, {village: '', oasis: '', tombs: '', desert: ''}, {village: '', oasis: '', tombs: '', desert: ''}, {
//     village: '',
//     oasis: '',
//     tombs: '',
//     desert: ''
//   }, {village: '', oasis: '', tombs: '', desert: ''}, {village: '', oasis: '', tombs: '', desert: ''}, {
//     village: '',
//     oasis: '',
//     tombs: '',
//     desert: ''
//   }, {village: '', oasis: '', tombs: '', desert: ''}, {village: '', oasis: '', tombs: '', desert: ''}, {
//     village: '',
//     oasis: '',
//     tombs: '',
//     desert: ''
//   }, {village: '', oasis: '', tombs: '', desert: ''}, {village: '', oasis: '', tombs: '', desert: ''}, {
//     village: '',
//     oasis: '',
//     tombs: '',
//     desert: ''
//   }, {village: '', oasis: '', tombs: '', desert: ''}, {village: '', oasis: '', tombs: '', desert: ''}, {
//     village: '',
//     oasis: '',
//     tombs: '',
//     desert: ''
//   }, {village: '', oasis: '', tombs: '', desert: ''}, {village: '', oasis: '', tombs: '', desert: ''}, {
//     village: '',
//     oasis: '',
//     tombs: '',
//     desert: ''
//   }, {village: '', oasis: '', tombs: '', desert: ''}, {village: '', oasis: '', tombs: '', desert: ''}, {
//     village: '',
//     oasis: '',
//     tombs: '',
//     desert: ''
//   }]
//
//   public events = [{position: '', events: [{e_name: 0, type: 0}]}, {
//     position: '',
//     events: [{e_name: 'waterfree', type: ''}]
//   }]
//
//   public currState = {
//     position: 'A1',
//     money: 1000,
//     weight: 1000,
//     food: 0,
//     days: 0,
//     water: 0,
//     tent: 0,
//     compass: 0,
//     gold: 0,
//     status: [],
//     events:[]
//   };
//   public reduce = {food: 0, water: 0};
//   public answers = [{a_content: '', a_type: 0}]
//
//   //events
//   public trade(type, count) {
//     let tempMoney
//     let tempWeight
//     let tempPlaceFoodRatio;
//     let tempPlaceWaterRatio;
//     for (let event of this.events) {
//       if (event.position == this.currState.position) {
//         for (let e of event.events) {
//           if (e.e_name == EVENT_TRADE) {
//             switch (e.type) {
//               case PLACE_START:
//                 tempPlaceFoodRatio = 1
//                 tempPlaceWaterRatio = 1;
//                 break;
//
//               case PLACE_VILLIGE:
//                 tempPlaceFoodRatio = villigeFoodTradeRatio
//                 tempPlaceWaterRatio = villigeWaterTradeRatio;
//                 break;
//             }
//           }
//         }
//       }
//     }
//     switch (type) {
//       case ITEM_COMPASS:
//         tempMoney = this.currState.money - (compassUnitPrice * count);
//         tempWeight = this.currState.weight - (compassUnitWeight * count);
//         if (tempMoney > 0 && tempWeight > 0) {
//           this.currState.compass = this.currState.compass + count;
//           this.currState.money = tempMoney
//           this.currState.weight = tempWeight
//         } else if (tempMoney <= 0) {
//           return moneyNotEnough
//         } else if (tempWeight <= 0) {
//           return weightNotEnough
//         }
//
//         break
//       case ITEM_FOOD:
//
//         tempMoney = this.currState.money - (foodUnitPrice * count * tempPlaceFoodRatio);
//         tempWeight = this.currState.weight - (foodUnitWeight * count);
//         if (tempMoney > 0 && tempWeight > 0) {
//           this.currState.food = this.currState.food + count;
//           this.currState.money = tempMoney
//           this.currState.weight = tempWeight
//         } else if (tempMoney <= 0) {
//           return moneyNotEnough
//         } else if (tempWeight <= 0) {
//           return weightNotEnough
//         }
//
//         break
//       case ITEM_WATER:
//
//
//         tempMoney = this.currState.money - (waterUnitPrice * count * tempPlaceWaterRatio);
//         tempWeight = this.currState.weight - (waterUnitWeight * count);
//         if (tempMoney > 0 && tempWeight > 0) {
//           this.currState.water = this.currState.water + count;
//           this.currState.money = tempMoney
//           this.currState.weight = tempWeight
//         } else if (tempMoney <= 0) {
//           return moneyNotEnough
//         } else if (tempWeight <= 0) {
//           return weightNotEnough
//         }
//
//         break
//       case ITEM_TENT:
//
//         tempMoney = this.currState.money - (tentUnitPrice * count);
//         tempWeight = this.currState.weight - (tentUnitWeight * count);
//         if (tempMoney > 0 && tempWeight > 0) {
//           this.currState.tent = this.currState.tent + count;
//           this.currState.money = tempMoney
//           this.currState.weight = tempWeight
//         } else if (tempMoney <= 0) {
//           return moneyNotEnough
//         } else if (tempWeight <= 0) {
//           return weightNotEnough
//         }
//
//         break
//     }
//     return null;
//   }
//
//   public waterfree(count) {
//     let tempWeight = this.currState.weight - (waterUnitWeight * count);
//     if (tempWeight > 0) {
//       this.currState.water = this.currState.water + count;
//       this.currState.weight = tempWeight
//     } else if (tempWeight <= 0) {
//       return weightNotEnough
//     }
//   }
//
//   public isGetLost() {
//
//     for (let statu of this.currState.status) {
//
//       if (statu.status_type == STATUS_GET_LOST) {
//         if (statu.status_duration > 0) {
//           return true;
//         }
//       }
//     }
//     return false;
//   }
//
//   public isAlive(flag) {
//     return flag
//   }
//
//   public consume(type) {
//     let tempWater;
//     let tempFood;
//     let tempWaterRatio;
//     let tempFoodRatio;
//     switch (type) {
//       case WEATHER_HOT:
//         tempWaterRatio = hotWaterConsumeRatio
//         tempFoodRatio = hotFoodConsumeRatio
//         break;
//       case WEATHER_SUNNY:
//         tempWaterRatio = 1
//         tempFoodRatio = 1
//         break;
//       case WEATHER_HOT_SANDSTORM:
//         tempWaterRatio = hotsandstormWaterConsumeRatio
//         tempFoodRatio = hotsandstormFoodConsumeRatio
//         break;
//       case WEATHER_SANDSTORM:
//         tempWaterRatio = sandstormWaterConsumeRatio
//         tempFoodRatio = sandstormFoodConsumeRatio
//         break;
//     }
//     let reduceFood = baseFoodConsumePerDay * tempFoodRatio
//     let reduceWater = baseWaterConsumePerDay * tempWaterRatio
//     this.reduce.water = reduceWater;
//     this.reduce.food = reduceFood;
//     tempFood = this.currState.food - reduceFood;
//     tempWater = this.currState.water - reduceWater;
//
//
//     if (tempFood <= 0) {
//
//       return false
//     }
//     if (tempWater <= 0) {
//
//       return false
//     }
//     this.currState.water = tempWater;
//     this.currState.food = tempFood;
//     this.currState.weight = this.currState.weight + (reduceFood * foodUnitWeight)
//     this.currState.weight = this.currState.weight + (reduceWater * waterUnitWeight)
//
//
//     return true
//   }
//
//   public useItem(item) {
//     switch (item) {
//       case ITEM_TENT:
//         if (this.currState.tent > 0) {
//           this.currState.tent--
//           this.currState.weight = this.currState.weight + tentUnitWeight
//           return true;
//         } else {
//           return false
//         }
//       case ITEM_COMPASS:
//         if (this.currState.compass > 0) {
//           this.currState.compass--
//           this.currState.weight = this.currState.weight + compassUnitWeight
//           return true;
//         } else {
//           return false
//         }
//
//     }
//   }
//
//   public digging() {
//     let tempWeight = this.currState.weight - (goldDiggedPerDay * goldUnitWeight)
//     if (tempWeight > 0) {
//       this.currState.gold = this.currState.gold + goldDiggedPerDay;
//       this.currState.weight = tempWeight
//     }
//   }
//
//   public throwItem(item, count) {
//     switch (item) {
//       case ITEM_COMPASS:
//         if (this.currState.compass > count) {
//           this.currState.weight = this.currState.weight + (compassUnitWeight * count)
//         }
//         break;
//       case ITEM_TENT:
//         if (this.currState.tent > count) {
//           this.currState.weight = this.currState.weight + (tentUnitWeight * count)
//         }
//         break;
//       case ITEM_TENT:
//         if (this.currState.food > count) {
//           this.currState.weight = this.currState.weight + (foodUnitWeight * count)
//         }
//         break;
//       case ITEM_TENT:
//         if (this.currState.water > count) {
//           this.currState.weight = this.currState.weight + (waterUnitWeight * count)
//         }
//         break;
//       case ITEM_TENT:
//         if (this.currState.gold > count) {
//           this.currState.weight = this.currState.weight + (goldUnitWeight * count)
//         }
//         break;
//     }
//
//   }
//
//   public ask(answer) {
//     console.log(answer)
//   }
//
//   public setStatus(statu, durations) {
//     this.currState.status.push({status_type: statu, status_duration: durations})
//   }
//
//   goSuccess() {
//     this.currState.money = this.currState.money + this.currState.gold * goldUnitPrice[this.currState.days - 1]
//     //todo 跳转到成功界面
//
//   }
//
//   goDead(position) {
//     if (position == 'A1') {
//       this.goSuccess();
//     } else {
//       //todo 跳转到死亡界面
//     }
//   }
//
//   public goNext(position) {
//     //todo 计算下一步消耗
//     this.currState.days++;
//     this.currState.position = position
//
//     //todo 上传当前状态 this.currState
//   }
//
//   public onNext(state) {
//
//     this.currState = state;
//
//     if (this.currState.days == 25) {
//       this.goDead(this.currState.position)
//       return
//     }
//     if (this.currState.position == 'A1') {
//       //todo confirm 欢迎回来，是否出售所有金子并结束本次游戏？
//       return
//     }
//     if (!this.isAlive(this.consume(this.weathers[this.currState.days - 1]))) {
//       this.goDead(this.currState.position)
//       return
//     }
//
//
//   }
//   getEventByCurrPos(){
//
//     for(let event of this.events){
//       if(event.position==this.currState.position){
//         this.currState.events=event.events
//       }
//     }
//   }
//   onEvent(type,params) {
//       switch (type){
//         case EVENT_TRADE:
//
//           break;
//         case EVENT_TRADE_Villige:
//           break;
//         case EVENT_WATER_ASK:
//           break;
//         case EVENT_WATER_FREE:
//           break;
//       }
//   }
//
//   public start() {
//     this.currState = {
//       position: 'A1',
//       money: 1000,
//       weight: 1000,
//       food: 0,
//       days: 0,
//       water: 0,
//       tent: 0,
//       compass: 0,
//       gold: 0,
//       status: [],
//       events:[]
//     };
//   }
//
//   constructor(public http: HttpClient, public userData: UserData) {
//
//   }
//
//
// }

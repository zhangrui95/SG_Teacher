import {Injectable} from "@angular/core";
import {UserData} from "./user-data";
import {ProxyHttpService} from "./proxy.http.service";

@Injectable()
export class ProcessJSONUtil {
  constructor(public userData: UserData, public http: ProxyHttpService) {

  }

  startNode;
  end_id;
  previousNode;
  nextNodes: any[];
  currNode;

  public parseStart(obj?: any) {
    for (let node of obj) {
      if(node==null){
        continue
      }
      if (node.type == "start") {
        this.startNode = node
        this.currNode = node;
        this.nextNodes = this.findNodesByIds(obj, node.node_id)
        console.log('----next---')
        console.log(this.nextNodes)
        return node;
      }
    }
  }

  public parseEvent(obj) {
    let arr = new Array();
    for (let node of obj) {
      if(node==null){
        continue
      }
      if (node.type == "event") {
        arr.push(node)
      }
    }
    return arr;
  }

  public stepNext(nextNode) {

    this.previousNode = this.currNode;
    this.currNode = nextNode;
    console.log(this.previousNode)
    console.log(this.currNode)
  }

  public parseGroup(obj) {
    let arr = new Array();
    for (let node of obj) {
      if(node==null){
        continue
      }
      if (node.type == 'group') {
        arr.push(node)
      }
    }
    return arr;
  }

  public parseNext(obj, nextId) {

    console.log(obj)
    let arr = new Array()
    for (let node of obj) {

      if(node!=null){
        console.log(node.id)
        if (nextId.indexOf(node.id) != -1) {
          arr.push(node)
        }
      }

    }
    return arr;
  }

  public isInGroup(node) {
    if (node.group_id && node.group_id != '-1' && node.group_id != '-2') {
      return true;
    } else {
      return false;
    }
  }

  public isGrouping() {
    if (this.isInGroup(this.previousNode)) {
      if (!this.isInGroup(this.currNode)) {
        return true;
      }
    }
    return false;
  }
  public findNodeById(obj,id){
    for (let node of obj) {
      if(node==null){
        continue
      }
      if(node.type=="group"){
        for(let groupNode of node.nodes){
          if(groupNode==null){
            continue
          }
          if(groupNode.id==id){
            return groupNode;
          }
        }
      }else{
        if(node.id==id){
          return node;
        }
      }
    }
    return null;
  }
  public findNodesByIds(obj,ids){
    let arr=new Array();
    for (let node of obj) {
      if(node==null){
        continue
      }
      if(node.type=="group"){
        for(let groupNode of node.nodes){
          if(groupNode==null){
            continue
          }
          if(ids.indexOf(groupNode.id)!=-1){
            arr.push( groupNode);
          }
        }
      }else{
        if(ids.indexOf(node.id)!=-1){
          arr.push( node);
        }
      }
    }
    return arr;
  }
}

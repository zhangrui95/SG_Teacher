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
  currNodes;
  data;


  public parseStart(obj) {
    for (let node of obj) {
      if (node == null) {
        continue
      }
      if (node.type == 'start') {
        return node
      }
    }
  }

  public start(obj,sim_id) {
    this.currNodes=new Array()
    let nodeArray=new Array();
   let node= this.parseStart(obj)
    let bean =new NextBean();
    bean.sim_id=sim_id;
    bean.type=node.type;
    if(node.node_id&&node.node_id.length>0){
      bean.n_id=node.node_id[0];
    }
    bean.curr_n_id=node.id;
    bean.g_id=node.group_id;
    bean.n_name=node.text;

    nodeArray.push(bean)
    this.currNodes.push(node)
    return nodeArray;
  }


  public isInGroup(obj) {

    if (this.currNodes.length == 1) {
      let nextid = this.currNodes[0].node_id;
      let nextNode = this.findNodeById(obj, nextid);
      if (nextNode.group_id != "-1" && nextNode.group_id != "-2") {
        return true
      }
    }
    return false;
  }

  public setCurrNode(currNode) {
    this.currNodes = currNode
  }
  public parseNext(sim_id):Array<NextBean>{
    let arr=new Array <NextBean>()

    for(let node of this.currNodes){
      let bean =new NextBean();
      bean.sim_id=sim_id;
      bean.type=node.type;
      if(node.node_id&&node.node_id.length>0){
        bean.n_id=node.node_id[0];
      }
      bean.curr_n_id=node.id;
      bean.g_id=node.group_id;
      bean.n_name=node.text;
      arr.push(bean)
    }
    return arr;
  }
  public findNodeById(obj, id) {
    console.log(obj)
    for (let node of obj) {
      if (node != null) {
        if (node.type == 'group') {
          for (let gNode of node.nodes) {
            if (gNode.id == id) {
              return gNode
            }
          }
        } else {
          if (node.id == id) {
            return node
          }
        }
      }
    }

  }

  public parseEvent(obj) {
    let arr = new Array();
    for (let node of obj) {
      if (node == null) {
        continue
      }
      if (node.type == "event") {
        arr.push(node)
      }
    }
    return arr;
  }


  public parseGroup(obj,sim_id) {
    let arr = new Array<GroupItem>();
    for (let node of obj) {
      if (node == null) {
        continue
      }
      if (node.type == 'group') {
        let item=new GroupItem();
        item.type=node.props.group_type;
        item.img=node.props.group_img;
        item.text=node.props.group_text;
        item.limit=node.props.group_limit
        item.id=node.id
        arr.push(item)
      }
    }
    let bean =new GroupBean();
    bean.sim_id=sim_id;
    bean.sim_id=18;
    bean.GroupId=arr;
    console.log(bean)
    return bean;
  }
}

export class NextBean {
  public sim_id;
  public g_id;
  public n_id;
  public n_name;
  public type;
  public curr_n_id

}
export class GroupBean{
  public sim_id;
  public GroupId:Array<GroupItem> =new Array();
}
export class GroupItem{
  public id;
  public img;
  public text;
  public type;
  public num=0;
  public limit;
}

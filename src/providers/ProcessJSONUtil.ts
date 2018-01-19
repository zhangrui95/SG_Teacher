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
    console.log('isInGroup=========================>')
    console.log(this.currNodes)
    for(let node of obj){

      if(this.currNodes&&this.currNodes.length>0){
          if(node.id==this.currNodes[0].n_id){

            if(node.type=='grouping'){
              console.log(node)

              return true;
            }
          }
      }
    }

    return false;
  }

  public setCurrNode(currNode) {
    this.currNodes = currNode
  }
  public getRemainGroup(obj){
    for(let o of obj){
      if(o.type=='group'){
        o.props.type
        if(o.props.group_type=="remain"){
          return o.id
        }
      }
    }
  }
  public parseGroupingNext(sim_id,obj):Array<NextBean>{
    let arr=new Array <NextBean>()

    for(let node of this.currNodes){
      console.log("***========>")
      console.log(node)
      let bean =new NextBean();
      bean.sim_id=sim_id;
      for(let o of obj){
        if(o.id==node.n_id){
          for(let nid of o.node_id){
            bean.next_n_id.push({g_id:this.findNodeById(obj,nid).group_id,n_id:nid});

          }
        }
      }

      bean.type=node.type;

      bean.curr_n_id=node.n_id;
      bean.g_id=node.g_id;
      bean.n_name=node.s_data.name;
      console.log(bean)
      arr.push(bean)
    }
    return arr;
  }
  getSendStart(sim_id){
    let arr=new Array <NextBean>()

    for(let node of this.currNodes){
      console.log("***========>")
      console.log(node)

      let bean =new NextBean();
      bean.sim_id=sim_id;
      bean.type=node.type;

      bean.curr_n_id=node.n_id;
      bean.g_id=node.g_id;
      bean.n_name=node.s_data.name;
      console.log(bean)
      arr.push(bean)
    }
    return arr;
  }
  public parseNext(sim_id):Array<NextBean>{
    let arr=new Array <NextBean>()

    for(let node of this.currNodes){
      console.log("***========>")
      console.log(node)

      let bean =new NextBean();
      bean.sim_id=sim_id;
      bean.type=node.type;

      bean.curr_n_id=node.n_id;
      bean.g_id=node.g_id;
      bean.n_name=node.s_data.name;
      console.log(bean)
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

  public goldGroup(sim_id,gnum,mnum) {

    let arr = new Array<GroupItem>();
    for(let i =0;i< gnum;i++){
      let item=new GroupItem();
      item.type='fixed';
      item.img='';
      item.text='第'+(i+1)+'组';
      item.limit=mnum
      item.id="random_group_"+new Date().getTime()+i;
      arr.push(item)
    }
    let bean =new GroupBean();
    bean.sim_id=sim_id;
    bean.GroupId=arr;
    console.log(bean)
    return bean;
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
    bean.GroupId=arr;
    console.log(bean)
    return bean;
  }
}

export class NextBean {
  public sim_id;
  public g_id;
  public next_n_id=new Array();
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

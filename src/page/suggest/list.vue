<template>
<div class="wy-sug-list">
  <div v-if="list.length>0" v-for="(item,index) in list" class="wy-sug-item">
    <div class="wy-sug-item-head">
      <span>{{item.time}}</span>
      <span class="wy-sug-item-typeId">{{item.typeId}}</span>
      <label @click="isshowhide(item,index)">
        <span class="wy-sug-item-status" style="">{{item.serviceStatus}}</span>
        <!-- <span>></span> -->
        <img v-if="!item.show" class="wy-sug-item-img" src="../../../static/images/wy/act_zk.png" />
        <img v-else class="wy-sug-item-img" src="../../../static/images/wy/act_sq.png" />
      </label>
    </div>
    <div class="wy-sug-item-hide" v-if="item.show">
      <div>
        <span>投诉单号</span>
        <div>{{item.serviceNumber}}</div>
      </div>
      <div>
        <span>房屋地址</span>
        <div>{{item.place}}</div>
      </div>
      <div>
        <span>投诉内容</span>
        <div>{{item.opinionContent}}</div>
      </div>
      <div v-if="item.img">
        <img style="width: 60px;height:60px;" :src="item.img" />
      </div>
    </div>
  </div>
  <div v-if="list.length==0" style="padding:16px 0;">
    <img style="width:128px;height:103px;" src="../../../static/images/wy/none.png" />
    <div style="color:#ADB7BA;font-size:15px;">暂无内容</div>
  </div>
</div>

</template>

<script>
import { Field,Button } from 'mint-ui';
// import utils from '../utils.js';
import * as utils from '../../utils';
import $ from "jquery";
export default {
  name: 'detail',
  data () {
    return {
      list:[
      // {
      //   time:'2019-01-18 18:05',
      //   typeId:'投诉',
      //   serviceStatus:'待处理',
      //   serviceNumber:'2019011118113017',
      //   place:'戛纳湾滨江14栋/1单元/2101室',
      //   opinionContent:'装修能不能别在休息时间，孩子听了都在哭',
      //   img:'https://www.baidu.com/img/bd_logo1.png',
      //   show:false
      // }
      ]
    }
  },
  components:{
    [Field.name]:Field,
    [Button.name]:Button
  },
  created(){
    this.$nextTick(function(){
        $('span','.wy-sug-typeIds').on('click', function (ele) {
            // debugger;
            // that.tabId = $(this).attr('tabid');
            $(this).addClass('wy-sug-typeId').siblings('.wy-sug-typeId').removeClass('wy-sug-typeId');
        });
        // that.getGgList();
    });
    this.getWyOptionsList();
  },
  methods:{
    isshowhide(item,index){
        this.$set(this.list[index],'show',!item.show);
    },
    getWyOptionsList(){
      var that = this;
      utils.Get('getWyOpinionList',{}).then(function(res){
        if (res.data.page.list && res.data.page.list.length>0) {
          res.data.page.list.forEach(function(item){
              item.time = '2020-01-11(无投诉时间)';
              that.list.push(item);
          });
        }
        // that.list = res.data.page.list;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.wy-sug-list {
  /*padding: 0 24px;*/
  background-color: #fff;
  padding-top: 16px;
}
.wy-sug-item {
  border-bottom: solid 1px #eee;
  font-size: 14px;
  /*padding: 16px 0px;*/
  text-align: left;
}
.wy-sug-list .wy-sug-item:first-child .wy-sug-item-head{
margin-top: 0;
}
.wy-sug-item label{
  float:right;
}
.wy-sug-item .wy-sug-item-hide >div >span {
  display: inline-block;
  vertical-align: top;
  padding-right: 8px;
}
.wy-sug-item .wy-sug-item-hide >div >div {
 display: inline-block;
  vertical-align: top;
      width: calc(100% - 70px);
}
.wy-sug-item-head {
  padding: 0 24px;
      margin: 16px;
}
.wy-sug-item-typeId {
  display:inline-block;padding-left:8px;
}
.wy-sug-item-status{
  display:inline-block;padding-right:4px;
  color: #999999;
}
.wy-sug-item-status-todo{
  color:#1888FF;
}
.wy-sug-item-hide {
  background-color: #F7F7F7;
  font-size: 14px;
  padding: 16px 24px;
}
.wy-sug-item-hide>div {
  padding: 4px 0px;
}
.wy-sug-item-img{
  width: 12px;
}
</style>

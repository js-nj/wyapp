<template>
<div class="wy-sug-list">
  <div v-if="list.length>0" :style="{'height':newsHeight,'overflow':'scroll'}">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="wysuglistloadmore">
      <div  v-for="(item,index) in list" class="wy-sug-item" :show="item.show">
        <div class="wy-sug-item-head">
          <span>{{item.createDate}}</span>
          <span class="wy-sug-item-typeId">{{item.typeName}}</span>
          <label @click="isshowhide(item,index)">
            <span class="wy-sug-item-status" style="">{{item.opinionStatusName}}</span>
            <!-- <span>></span> -->
            <img v-if="!item.show" class="wy-sug-item-img" src="../../../static/images/wy/act_zk.png" />
            <img v-else class="wy-sug-item-img" src="../../../static/images/wy/act_sq.png" />
          </label>
        </div>
        <div class="wy-sug-item-hide" v-if="item.show">
          <!-- <div style="padding-left:16px;"> -->
            <div>
              <span>{{item.typeName}}单号</span>
              <div>{{item.opinionNumber}}</div>
            </div>
            <div>
              <span>{{item.typeName}}内容</span>
              <div>{{item.opinionContent}}</div>
            </div>
            <div v-if="item.imgUrl" style="height:60px;">
              <span>{{item.typeName}}图片</span>
              <div class="wy-sug-det-desitemimgs post">
                <img v-if="src" :src="src" v-for="src in (item.imgUrl.split(','))" class="wy-sug-det-desitemimg" />
              </div>
            </div>
          <!-- </div> -->
          <!-- <div v-if="item.img">
            <img style="width: 60px;height:60px;" :src="item.img" />
          </div> -->

          <mt-button class="wy-sug-list-but" v-if="item.opinionStatus == '1'" type="primary" size="small" @click="gotoCancel(item.id)">撤销</mt-button>
          <div v-if="item.opinionStatus == '0'">
            <span>撤销原因</span>
            <div>{{item.returnContent}}</div>
          </div>

          <template v-if="item.opinionStatus == '3' || item.opinionStatus == '4'">
            <div>
              <span>回复内容</span>
              <div>{{item.returnContent}}</div>
            </div>
            <div>
              <span>回复时间</span>
              <div>{{item.updateDate}}</div>
            </div>
          </template>
        </div>
      </div>
    </mt-loadmore>
  </div>
  <div v-if="list.length==0" style="padding:16px 0;">
    <img style="width:128px;height:103px;" src="../../../static/images/wy/none.png" />
    <div style="color:#ADB7BA;font-size:15px;">暂无内容</div>
  </div>
</div>

</template>

<script>
import { Field,Button,Loadmore } from 'mint-ui';
// import utils from '../utils.js';
import * as utils from '../../utils';
import $ from "jquery";
export default {
  name: 'detail',
  data () {
    return {
      list:[{
        show:'hide'
      }],
      allLoaded:false,
      totalCount:0,
      currPage:1,
      newsHeight:(document.documentElement.clientHeight)+'px',
      clientWidth:document.documentElement.clientWidth +'px',
    }
  },
  components:{
    [Field.name]:Field,
    [Button.name]:Button,
    [Loadmore.name]:Loadmore,
  },
  created(){
    document.title = '我的投诉';
    window.userInfo = JSON.parse(localStorage.getItem('_userInfo'));
    this.$nextTick(function(){
        $('span','.wy-sug-typeIds').on('click', function (ele) {
            // debugger;
            // that.tabId = $(this).attr('tabid');
            $(this).addClass('wy-sug-typeId').siblings('.wy-sug-typeId').removeClass('wy-sug-typeId');
        });
        // that.getGgList();
    });

  },
  methods:{
    loadBottom(){
      // debugger
      this.getWyOptionsList();
    },
    gotoCancel(id){
      this.$router.push({
        name:'sugCancel',
        params:{
          id:id
        }
      })
    },
    isshowhide(item,index){
        this.$set(this.list[index],'show',!item.show);
    },
    getWyOptionsList(){
      var that = this;
      var param = {
        page:that.currPage,
        limit:10,
        ownerId:window.userInfo.ownerId
      };
      utils.Get('getWyOpinionList',param).then(function(res){
        if (res.data.page.list && res.data.page.list.length>0) {
          if (that.currPage == 1) {
            that.list = res.data.page.list;
          }else {
            that.list = that.list.concat(res.data.page.list)
          }
          that.totalCount = res.data.page.totalCount;
          if ((that.totalCount == that.list.length) || that.currPage == that.totalPage) {
            that.allLoaded = true;// 若数据已全部获取完毕
            that.$refs.wysuglistloadmore.onBottomLoaded();
          }else {
            that.allLoaded = false;
            that.currPage++
            that.$refs.wysuglistloadmore.onBottomLoaded();
          }
        }else {
          that.list = res.data.page.list;
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.wy-sug-det-desitemimgs{
display: inline-block;
    /* position: relative; */
    /* top: 100%; */
    float: right;
    position: relative;
    top: 2px;
    left: 6px;
    /* overflow: hidden; */
    /*width: 200px;*/
    width: calc(100% - 70px);
}
.wy-sug-det-desitemimg {
  width: 50px;
  height: 50px;
  display: inline-block;
  margin-right: 4px;
}
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
.wy-sug-item[show="hide"] {
  display: none;
}
.wy-sug-list .wy-sug-item:first-child .wy-sug-item-head{
margin-top: 0;
}

.wy-sug-item label{
  float:right;
}
.wy-sug-list-but {
  margin-top:16px;
  width: 100%;
}
.wy-sug-list-but label {
  float: none;
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
  padding: 16px 38px;
}
.wy-sug-item-hide>div {
  padding: 4px 0px;
}
.wy-sug-item-img{
  width: 12px;
}
</style>

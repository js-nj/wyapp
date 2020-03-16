<template>
  <div class="wy-reply">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">待回复</mt-tab-item>
      <mt-tab-item id="2">已回复</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="wy-sug-list wy-rep-list" :style="{'height':newsHeight,'overflow':'scroll'}">
          <div v-if="list.length>0" >
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="wysuglistloadmore">
              <div  v-for="(item,index) in list" class="wy-sug-item wy-reply-item" :show="item.show" @click="gotoReplyDetail(item.id)">
                <div class="wy-rep-item-head">
                  <span>{{item.createDate}}</span>
                  <span class="wy-sug-item-typeId">{{item.typeName}}</span>
                  <label>
                    <span class="wy-sug-item-status" style="">{{item.opinionStatusName}}</span>
                    <img class="wy-sug-item-img" src="../../../static/images/wy/act_right.png" />
                  </label>
                </div>
              </div>
            </mt-loadmore>
          </div>
          <div v-if="list.length==0" style="padding:16px 0;">
            <img style="width:128px;height:103px;" src="../../../static/images/wy/none.png" />
            <div style="color:#ADB7BA;font-size:15px;">暂无内容</div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="wy-sug-list wy-rep-list" :style="{'height':newsHeight,'overflow':'scroll'}">
          <div v-if="listDone.length>0" >
            <mt-loadmore :bottom-method="loadBottomDone" :bottom-all-loaded="allLoadedDone" ref="wysuglistloadmoreDone">
              <div  v-for="(item,index) in listDone" class="wy-sug-item wy-reply-item" :show="item.show" @click="gotoReplyDetail(item.id)">
                <div class="wy-rep-item-head">
                  <span>{{item.createDate}}</span>
                  <span class="wy-sug-item-typeId">{{item.typeName}}</span>
                  <label>
                    <span class="wy-sug-item-status" style="">{{item.opinionStatusName}}</span>
                    <img v-if="!item.show" class="wy-sug-item-img" src="../../../static/images/wy/act_right.png" />
                  </label>
                </div>
              </div>
            </mt-loadmore>
          </div>
        <div v-if="listDone.length==0" style="padding:16px 0;">
          <img style="width:128px;height:103px;" src="../../../static/images/wy/none.png" />
          <div style="color:#ADB7BA;font-size:15px;">暂无内容</div>
        </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import { Navbar, TabItem,TabContainer,TabContainerItem,Field,Button,Loadmore } from 'mint-ui';
// import utils from '../utils.js';
import * as utils from '../../utils';
import $ from "jquery";
export default {
  name: 'detail',
  data () {
    return {
      selected:'1',
      list:[],
      allLoaded:false,
      totalCount:0,
      currPage:1,

      listDone:[],
      allLoadedDone:false,
      totalCountDone:0,
      currPageDone:1,

      newsHeight:(document.documentElement.clientHeight - 60)+'px',
      clientWidth:document.documentElement.clientWidth +'px',
    }
  },
  components:{
    [Navbar.name]: Navbar,
    [TabItem.name]: TabItem,
    [TabContainer.name]: TabContainer,
    [TabContainerItem.name]: TabContainerItem,
    [Field.name]:Field,
    [Button.name]:Button,
    [Loadmore.name]:Loadmore,
  },
  created(){
    document.title = '我的回复';
    window.userInfo = JSON.parse(localStorage.getItem('_userInfo'));
    var wyReplyIndex = sessionStorage.getItem('wyReplyIndex');
    if (wyReplyIndex) {
      this.selected = wyReplyIndex;
    }
    if (!wyReplyIndex || wyReplyIndex=='1') {
      this.list.push({
        show:'hide'
      });
    } else {
      this.listDone.push({
        show:'hide'
      });
    }
    this.$nextTick(function(){
        $('span','.wy-sug-typeIds').on('click', function (ele) {
            // debugger;
            // that.tabId = $(this).attr('tabid');
            $(this).addClass('wy-sug-typeId').siblings('.wy-sug-typeId').removeClass('wy-sug-typeId');
        });
        // that.getGgList();
    });

  },
  watch:{
    selected(val){
      if (this.listDone.length == 0 && val == '2') {
        this.listDone.push({
          show:'hide'
        });
      } else if(this.list.length == 0 && val == '1'){
        this.list.push({
          show:'hide'
        });
      }
      sessionStorage.setItem('wyReplyIndex',val);
    }
  },
  methods:{
    gotoReplyDetail(id){
      // debugger
      window.location.href = window.location.origin+window.location.pathname +'#/repDetail?id='+id;
    },
    loadBottom(){
      // debugger
      this.getWyopinionlistforwy();
    },
    loadBottomDone(){
      // debugger
      this.getWyopinionlistforwyDone();
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
    getWyopinionlistforwy(){
      // debugger;
      var that = this;
      var param = {
        page:that.currPage,
        limit:10,
        cxlx:'1'
      };
      console.log('1')
      utils.Get('getWyopinionlistforwy',param).then(function(res){
        console.log('2')
        if (res.data.page.list && res.data.page.list.length>0) {
          if (that.currPage == 1) {
            that.list = res.data.page.list;
          }else {
            that.list = that.list.concat(res.data.page.list)
          }
          that.totalCount = res.data.page.totalCount;
          console.log('that.totalCount:',that.totalCount)
          console.log('that.list.length:',that.list.length)
          if ((that.totalCount == that.list.length) || that.currPage == that.totalPage) {
            // debugger
            console.log('3')
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
    },
    getWyopinionlistforwyDone(){
      // debugger
      var that = this;
      var param = {
        page:that.currPageDone,
        limit:10,
        cxlx:'2'
      };
      utils.Get('getWyopinionlistforwy',param).then(function(res){
        if (res.data.page.list && res.data.page.list.length>0) {
          if (that.currPageDone == 1) {
            that.listDone = res.data.page.list;
          }else {
            that.listDone = that.listDone.concat(res.data.page.list)
          }
          that.totalCountDone = res.data.page.totalCount;
          if ((that.totalCountDone == that.listDone.length) || that.currPageDone == that.totalPageDone) {
            that.allLoadedDone = true;// 若数据已全部获取完毕
            that.$refs.wysuglistloadmoreDone.onBottomLoaded();
          }else {
            that.allLoadedDone = false;
            that.currPageDone++
            that.$refs.wysuglistloadmoreDone.onBottomLoaded();
          }
        }else {
          that.listDone = res.data.page.list;
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wy-reply >>> .mint-tab-item-label {
    font-size: 16px;
}
.wy-reply >>> .mint-tab-container {
  margin-top:2px;
}
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
.wy-rep-list.wy-sug-list {
  /*padding: 0 24px;*/
  background-color: #fff;
  padding-top: 0px;
}
.wy-sug-item.wy-reply-item {
  border-bottom: solid 1px #eee;
  font-size: 14px;
  padding: 16px 0px;
  text-align: left;
}
.wy-sug-item.wy-reply-item[show="hide"] {
  display: none;
}
.wy-sug-list .wy-sug-item.wy-reply-item:first-child .wy-rep-item-head{
margin-top: 0;
}

.wy-sug-item.wy-reply-item label{
  float:right;
}
.wy-sug-list-but {
  margin-top:16px;
  width: 100%;
}
.wy-sug-list-but label {
  float: none;
}
.wy-sug-item.wy-reply-item .wy-sug-item-hide >div >span {
  display: inline-block;
  vertical-align: top;
  padding-right: 8px;
}
.wy-sug-item.wy-reply-item .wy-sug-item-hide >div >div {
 display: inline-block;
  vertical-align: top;
      width: calc(100% - 70px);
}
.wy-reply-item .wy-rep-item-head {
  padding: 0 24px;
      margin: 0px;
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
  width: 6px;
}
</style>

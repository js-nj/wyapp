<template>
<div class="wy-fix">
    <div id="bxjl" style="background-color:#fff;">
        <mt-navbar v-model="listStatus">
          <mt-tab-item id="doing">处理中</mt-tab-item>
          <mt-tab-item id="done">已完成</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="listStatus">
          <mt-tab-container-item id="doing">
            <div v-if="options.length>0" class="wy-fix-list-items" :style="{'height':newsHeightDoing,'overflow':'scroll'}">
              <mt-loadmore :bottom-method="loadBottomDoing" :bottom-all-loaded="allLoadedDoing" ref="wyfixDoingloadmore">
                <div class="wy-fix-list-item" v-for="item in options" :show="item.show">
                  <div class="wy-fix-list-item-img" style="">
                    <img  style="width:35px;height:35px;" src="../../../static/images/wy/kjbx_tmp.png" />
                  </div>
                  <div class="wy-fix-list-item-body" style="">
                    <div style="font-size:14px;color:#333;">{{item.serviceAddress}}</div>
                    <div style="color:#444;">{{item.typeName+'-'+item.serviceTypeName}}</div>
                    <div style="position:relative;">
                      <span style="color:#999;">{{item.createDate}}</span>
                      <label class="wy-fix-list-item-more" @click="gotoDetail(item.id,item.typeId)" style="">
                        <span v-if="item.serviceStatusName && item.serviceStatusName.indexOf('待')>-1" style="color: #3789F9;">{{item.serviceStatusName}}</span>
                        <span v-else style="color: #999;">{{item.serviceStatusName}}</span>
                        <i class="mint-cell-allow-right"></i>
                      </label>
                    </div>
                  </div>
                </div>
              </mt-loadmore>
            </div>
            <div v-if="options.length==0" style="padding:16px 0;">
              <img style="width:128px;height:103px;" src="../../../static/images/wy/none.png" />
              <div style="color:#ADB7BA;font-size:15px;">暂无内容</div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="done">
            <div v-if="doneOptions.length>0" class="wy-fix-list-items" :style="{'height':newsHeightDone,'overflow':'scroll'}">
              <mt-loadmore :bottom-method="loadBottomDone" :bottom-all-loaded="allLoadedDone" ref="wyfixDoneloadmore">
                <div class="wy-fix-list-item" v-for="item in doneOptions" :show="item.show">
                  <div class="wy-fix-list-item-img" style="">
                    <img  style="width:35px;height:35px;" src="../../../static/images/wy/kjbx_tmp.png" />
                  </div>
                  <div class="wy-fix-list-item-body" style="">
                    <div style="font-size:14px;color:#333;">{{item.serviceAddress}}</div>
                    <div style="color:#444;">{{item.typeName+'-'+item.serviceTypeName}}</div>
                    <div style="position:relative;">
                      <span style="color:#999;">{{item.createDate}}</span>
                      <label class="wy-fix-list-item-more" @click="gotoDetail(item.id,item.typeId)" style="">
                        <span v-if="item.serviceStatusName && item.serviceStatusName.indexOf('待')>-1" style="color: #3789F9;">{{item.serviceStatusName}}</span>
                        <span v-else style="color: #999;">{{item.serviceStatusName}}</span>
                        <i class="mint-cell-allow-right"></i>
                      </label>
                    </div>
                  </div>
                </div>
              </mt-loadmore>
            </div>
            <div v-if="doneOptions.length==0" style="padding:16px 0;">
              <img style="width:128px;height:103px;" src="../../../static/images/wy/none.png" />
              <div style="color:#ADB7BA;font-size:15px;">暂无内容</div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
    </div>
</div>

</template>

<script>
import { Navbar, TabItem,Tabbar,TabContainer,TabContainerItem,Toast,Loadmore} from 'mint-ui';
// import utils from '../utils.js';
import * as utils from '../../utils';
import $ from "jquery";
export default {
  name: 'detail',
  components: {
      [Navbar.name]: Navbar,
      [TabItem.name]: TabItem,
      [TabContainer.name]: TabContainer,
      [TabContainerItem.name]: TabContainerItem,
      [Tabbar.name]: Tabbar,
      [Toast.name]: Toast,
      [Loadmore.name]: Loadmore,
  },
  data () {
    return {
      allLoadedDoing:false,
      totalCountDoing:0,
      currPageDoing:1,
      newsHeightDoing:(document.documentElement.clientHeight - 53)+'px',

      allLoadedDone:false,
      totalCountDone:0,
      currPageDone:1,
      newsHeightDone:(document.documentElement.clientHeight - 53)+'px',

      username:'',
      phone:'',
      problemday:'',
      ggsheetVisible:false,
      grsheetVisible:false,
      selected:'kjbx',
      listStatus:'doing',
      fixTypes:'public',
      options:[{
          show:'hide',
          serviceAddress:'',
          typeName:'',
          createDate:'',
          createDate:'',
          serviceTypeName:'',
          serviceStatusName:''
        }],
      doneOptions:[],
      ggfixplace:'',
      ggintroduction:'',
      ggproblem:'',
      gguploadImgs:[],
      ggslots: [
        {
          values: [],
        }
      ],
      ggchooseResult:{},

      grfixplace:'',
      grintroduction:'',
      grproblem:'',
      gruploadImgs:[],
      grslots: [
        {
          values: [],
        }
      ],
      grchooseResult:{},
    }
  },
  created(){
    // console.log(utils)
    // debugger;
    // this.$nextTick(() => {
    //     this.$refs['privateDiv'].style.height = (document.body.clientHeight - 90) + 'px';
    // });
    window.userInfo = JSON.parse(localStorage.getItem('_userInfo'));
    document.title = '我的报修';
    var wyFixList = sessionStorage.getItem('wyFixList');
    if (wyFixList) {
      this.listStatus = wyFixList;
    }

  },
  watch:{
    ggchooseResult(val){
      if (val && val.name) {
        console.log('val',val)
        this.ggproblem = val.name;
      }
    },
    grchooseResult(val){
      if (val && val.name) {
        console.log('val',val)
        this.grproblem = val.name;
      }
    },
    listStatus(val){
      sessionStorage.setItem('wyFixList',val);
      // debugger;
      if (val == 'done' && this.doneOptions.length == 0) {
        this.options = [];
        this.doneOptions.push({
          show:'hide',
          serviceAddress:'',
          typeName:'',
          createDate:'',
          createDate:'',
          serviceTypeName:'',
          serviceStatusName:''
        });
        // this.doneOptions.pop();
      }else if((val == 'doing' && this.options.length == 0)) {
        this.options.push({
          show:'hide',
          serviceAddress:'',
          typeName:'',
          createDate:'',
          createDate:'',
          serviceTypeName:'',
          serviceStatusName:''
        });
      }
    }
  },
  methods:{
    loadBottomDoing(){
      console.log('doing~~~~')
      this.getWyserviceListIn();
    },
    loadBottomDone(){
      this.getWyserviceListComplete();
    },
    gotoDetail(id,from1){
      // if (this.listStatus == 'done') {
      //   debugger;
      //   this.options = [];
      // }
      window.location.href = window.location.origin+window.location.pathname + '#/fixDetail?from='+from1+'&id='+id;
    },
    getWyserviceListIn(){
      var that = this;
      var param = {
        ownerId:window.userInfo.ownerId,
        page:that.currPageDoing,
        limit:10
      };

      utils.Get('getWyserviceListIn',param).then(function(res){
        if (res.data.code ==0) {
          if (that.currPageDoing == 1) {
            that.options = res.data.page.list;
          }else {
            that.options = that.options.concat(res.data.page.list)
          }
          that.totalCountDoing = res.data.page.totalCount;
          if ((that.totalCountDoing == that.options.length) || that.currPageDoing == that.totalPageDoing) {
            that.allLoadedDoing = true;// 若数据已全部获取完毕
            that.$refs.wyfixDoingloadmore && that.$refs.wyfixDoingloadmore.onBottomLoaded();
          }else {
            that.allLoadedDoing = false;
            that.currPageDoing++
            that.$refs.wyfixDoingloadmore && that.$refs.wyfixDoingloadmore.onBottomLoaded();
          }
          that.$nextTick(function(){
          // debugger;
            $('.wy-fix-list-items').scrollTop(0);
          });
          // that.options = res.data.page.list;
        }else {
          Toast('获取数据失败');
        }

      });
    },
    getWyserviceListComplete(){
      var that = this;
      var param = {
        ownerId:window.userInfo.ownerId,
        page:that.currPageDone,
        limit:10
      };

      utils.Get('getWyserviceListComplete',param).then(function(res){
        if (res.data.code ==0) {
          if (that.currPageDone == 1) {
            that.doneOptions = res.data.page.list;
          }else {
            that.doneOptions = that.doneOptions.concat(res.data.page.list)
          }
          that.totalCountDone = res.data.page.totalCount;
          if ((that.totalCountDone == that.doneOptions.length) || that.currPageDone == that.totalPageDone) {
            that.allLoadedDone = true;// 若数据已全部获取完毕
            that.$refs.wyfixDoneloadmore && that.$refs.wyfixDoneloadmore.onBottomLoaded();
          }else {
            that.allLoadedDone = false;
            that.currPageDone++
            that.$refs.wyfixDoneloadmore && that.$refs.wyfixDoneloadmore.onBottomLoaded();
          }
          that.$nextTick(function(){
          // debugger;
            $('.wy-fix-list-items').scrollTop(0);
          });
          // that.doneOptions = res.data.page.list;
        }else {
          Toast('获取数据失败');
        }

      });
    },
    ggdeleteImg(){

    },
    ggpreviewImg(){

    },
    gghandleClick(){

    },
    ggshowSheet(){
      // debugger;
      this.ggsheetVisible = true;
    },
    ggonValuesChange(e,val){
      if (val) {
        this.ggchooseResult = val[0];
      }
      // console.log(values)
    },
    ggokValuesChange(){
      if (!this.ggchooseResult.name) {
        this.ggchooseResult = this.ggslots[0].values;
      }
      this.ggsheetVisible = false;
    },
    grdeleteImg(){

    },
    grpreviewImg(){

    },
    grhandleClick(){

    },
    grshowSheet(){
      // debugger;
      this.grsheetVisible = true;
    },
    gronValuesChange(e,val){
      if (val) {
        this.grchooseResult = val[0];
      }
      // console.log(values)
    },
    grokValuesChange(){
      if (!this.grchooseResult.name) {
        this.grchooseResult = this.grslots[0].values;
      }
      this.grsheetVisible = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
#imageFile {
      /* margin-left: 40px; */
    /* display: inline-block; */
    /* height: 34px; */
    /* visibility: hidden; */
    position: absolute;
    /* top: -29px; */
    width: 60px;
    height: 60px;
    left: 0px;
    top:0;
    opacity: 0;
}
.wy-fix-ggform input.mint-field-core {
  background: #fff;
}

.wy-fix {
  /*height: calc(100%);*/
 /*height: calc(100% - 16px);*/
    background: #fff;
    padding-top: 16px;
}
.wy-fix .mint-navbar{
  width: 200px;
    margin: 0px auto 16px auto;
    border: solid 0.5px #26a2ff;
    border-radius: 42px;
    /*background: #ddd;*/
}
.wy-fix .mint-navbar .mint-tab-item.is-selected{
  color: #fff;
  background-color: #26a2ff;
  border-bottom: none;
  margin-bottom: 0px;
      position: relative;
    /*right: -1px;*/
}
.wy-fix .mint-navbar .mint-tab-item {
  padding: 11.5px;
}
.wy-fix .mint-navbar .mint-tab-item {
  border-radius: 42px;
}
.wy-fix-tabbar .mint-tab-item-icon{
  margin:0;
  display: inline-block;
  vertical-align: top;
}
.wy-fix-tabbar .mint-tab-item-label {
  display: inline-block;
  vertical-align: initial;
  font-size: 13px;
  color:#999;
      position: relative;
    top: -2px;
}
 .mint-tabbar > .mint-tab-item.is-selected .mint-tab-item-label{
color: #26a2ff;
}
.wy-fix-list-item {
margin-top: 8px;
border-bottom: solid 1px #ddd;
position: relative;
text-align: left;
    padding-left: 8px;
}
.wy-fix-list-item[show="hide"] {
  display: none;
}
.wy-fix-list-item .mint-cell img {
  height: 20px;
  width: 20px;
}
.wy-fix-list-item .mint-cell:first-child .mint-cell-wrapper {
  background-image: none;
}

.wy-fix-list-item .mint-cell .mint-cell-wrapper {
  padding: 0 16px 0 24px;
}
.wy-fix-list-item .mint-cell{
  min-height: 46px;
}
.wy-fix-list-item .mint-cell .mint-cell-title{
  text-align: left;
}
.wy-fix-list-item  .mint-cell-text,.wy-fix-list-item .mint-cell-value{
color: #333;
    font-size: 14px;
    display: inline-block;
    padding-left: 12px;
}
.wy-fix-list-item .mint-cell:first-child .mint-cell-text {
  font-size: 16px;

  font-weight: 600;
}
.wy-color-blue {
  color: #3789F9;
}
.mint-popup{
  width:100%
}
.wy-select-problem .mint-cell-title{
  /*padding-left: 20px;*/
  text-align: left;
}
.upload_item {
        display: inline-block;
        width: 60px;
        height: 60px;
        margin: 0px 8px 12px 0;
        position: relative;
        vertical-align: top;
    }
    .upload_item_none{
        line-height: 60px;
        margin: 0;
    }
    .cancel_upload_img {
        position: absolute;
        top: -13px;
        right: -7px;
        font-size: 18px;
    }
    .upload_img {
        width: 60px;
        height: 60px;
    }
    .wy-sug-button{
  font-size: 16px;
      width: 90%;
    margin: 0 auto 32px auto;
    display: block;
}
.wy-fix-name.mint-cell .mint-cell-title {
  text-align: left;
  /*padding-left: 20px;*/
}
.wy-fix-ggform {
  padding: 3px 16px;
  /*border-bottom:solid 1px #ddd;*/
}
.wy-fix-ggform .mint-cell-title {
  text-align: left;
}
.wy-fix-ggform .mint-cell-wrapper {
  background-image: none;
  border-bottom:solid 1px #ddd;
}
.wy-fix-ggform>.mint-cell:first-child .mint-cell-wrapper {
  /*border-top:solid 1px #ddd;*/
}
.wy-fix-ggform .mint-cell.is-textarea {
  margin:  0px 16px 16px 8px;
  display: block;
  border-radius:2px;
border:1px solid rgba(238,238,238,1);
}
.wy-fix-ggform .mint-cell-text{
font-size: 14px;
}
.wy-fix-ggform ::placeholder {
  /*color: red;*/
  font-size: 12px;
}
.wy-fix-ggform .mint-cell:last-child {
  background-image: none;
}
.wy-fix-ggform .mint-cell.is-textarea .mint-cell-wrapper{
  border-bottom:none;
}
.wy-fix-ggform .mint-cell.wy-fix-name .mint-cell-wrapper{
  border-bottom:none;
}
.wy-fix-ggform .mint-cell.wy-fix-name {
  /*min-height: 20px*/
}
.wy-fix-private {
  overflow: auto;
}
.wy-fix-tabbar .mint-tab-item{
  padding: 10px 0;
}
.wy-fix-tabbar .mint-tab-item-icon img{
  width: 20px;
  height: 20px;
}
.wy-fix-list-items {
  padding: 0 16px;
}
.wy-fix-list-item-img {
display:inline-block;vertical-align:top;position: relative;top: 16px;
}
.wy-fix-list-item-body {
display:inline-block;vertical-align:top;padding-left: 16px;
font-size: 12px;
width: calc(100% - 62px);
}
.wy-fix-list-item-body>div {
      padding: 0px 0 4px 0;
}
.wy-fix-list-item-more {
    display: inline-block;
    /* padding-left: 48px; */
    position: absolute;

    width: 40px;
    right: 0px;
}
.wy-fix-list-item-more .mint-cell-allow-right::after{
right: -12px;
width: 7px;
    height: 7px;
}
</style>

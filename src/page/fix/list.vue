<template>
<div class="wy-fix">
    <div id="bxjl">
        <mt-navbar v-model="listStatus">
          <mt-tab-item id="doing">处理中</mt-tab-item>
          <mt-tab-item id="done">已完成</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="listStatus">
          <mt-tab-container-item id="doing">
            <div class="wy-fix-list-item" v-for="item in options">
              <mt-cell :title="item.typeName">
                <span :class="{'wy-color-blue':item.status=='待受理'||'待确认'}">{{item.serviceStatusName}}</span>
                <img slot="icon" v-if="item.typeId =='1'" src="../../../static/images/wy/ggbx.png" width="24" height="24">
                <img slot="icon" v-else src="../../../static/images/wy/jtbx.png" width="24" height="24">
              </mt-cell>
              <mt-cell :title="item.serviceAddress">
                <img slot="icon" src="../../../static/images/wy/lddy.png" width="24" height="24">
              </mt-cell>
              <mt-cell :title="item.createDate ">
                <img slot="icon" src="../../../static/images/wy/bxsj.png" width="24" height="24">
              </mt-cell>
              <mt-cell :title="item.serviceContent " value="详情" is-link :to="'./fixDetail?id='+item.id">
                <img slot="icon" src="../../../static/images/wy/bxnr.png" width="24" height="24" >
              </mt-cell>
            </div>
            <div v-if="options.length==0" style="padding:16px 0;">
              <img style="width:128px;height:103px;" src="../../../static/images/wy/none.png" />
              <div style="color:#ADB7BA;font-size:15px;">暂无内容</div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="done">
            <div class="wy-fix-list-item" v-for="item in doneOptions">
              <mt-cell :title="item.typeName">
                <span :class="{'wy-color-blue':item.status=='待受理'||'待确认'}">{{item.serviceStatusName}}</span>

                <img slot="icon" v-if="item.typeId =='1'" src="../../../static/images/wy/ggbx.png" width="24" height="24">
                <img slot="icon" v-else src="../../../static/images/wy/jtbx.png" width="24" height="24">
              </mt-cell>
              <mt-cell :title="item.serviceAddress">
                <img slot="icon" src="../../../static/images/wy/lddy.png" width="24" height="24">
              </mt-cell>
              <mt-cell :title="item.createDate ">
                <img slot="icon" src="../../../static/images/wy/bxsj.png" width="24" height="24">
              </mt-cell>
              <mt-cell :title="item.serviceContent " value="详情" is-link :to="'./fixDetail?id='+item.id">
                <img slot="icon" src="../../../static/images/wy/bxnr.png" width="24" height="24" >
              </mt-cell>
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
import { Navbar, TabItem,Tabbar,TabContainer,TabContainerItem,Cell,Checklist,Actionsheet,Field,Picker,Popup,Button,DatetimePicker,Toast} from 'mint-ui';
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
      [Cell.name]: Cell,
      [Checklist.name]: Checklist,
      [Tabbar.name]: Tabbar,
      [Actionsheet.name]: Actionsheet,
      [Field.name]: Field,
      [Picker.name]: Picker,
      [Popup.name]: Popup,
      [Button.name]: Button,
      [Toast.name]: Toast,
      [DatetimePicker.name]: DatetimePicker,
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      // problemTime:'',
      username:'',
      phone:'',
      problemday:'',
      ggsheetVisible:false,
      grsheetVisible:false,
      selected:'kjbx',
      listStatus:'doing',
      fixTypes:'public',
      options:[{
        name:'公共报修',
        status:'待受理',
        place:'龙湖 22栋1605',
        time:'2019-01-07 12:23',
        content:'公共电梯'
      },{
        name:'个人报修',
        status:'已受理',
        place:'龙湖 22栋1605',
        time:'2019-01-07 12:23',
        content:'马桶堵了'
      }],
      doneOptions:[{
        name:'公共报修',
        status:'已完成',
        place:'龙湖 22栋1605',
        time:'2019-01-07 12:23',
        content:'公共电梯'
      },{
        name:'个人报修',
        status:'已完成',
        place:'龙湖 22栋1605',
        time:'2019-01-07 12:23',
        content:'马桶堵了'
      }],
      ggfixplace:'',
      ggintroduction:'',
      ggproblem:'',
      gguploadImgs:[],
      ggslots: [
        {
          values: [{name:'马桶坏了',id:'12'},{name:'马桶坏了2',id:'122'},],
        }
      ],
      ggchooseResult:{},

      grfixplace:'',
      grintroduction:'',
      grproblem:'',
      gruploadImgs:[],
      grslots: [
        {
          values: [{name:'马桶坏了',id:'12'},{name:'马桶坏了2',id:'122'},],
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
    document.title = '我的报修';
    this.getWyserviceListIn();
    this.getWyserviceListComplete();
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
    }
  },
  methods:{
    getWyserviceListIn(){
      var param = {
        ownerId:window.userInfo.ownerId,
        page:1,
        limit:10
      };
      var that = this;
      utils.Get('getWyserviceListIn',param).then(function(res){
        if (res.data.code ==0) {
          that.options = res.data.page.list;
        }else {
          Toast('获取数据失败');
        }

      });
    },
    getWyserviceListComplete(){
      var param = {
        ownerId:window.userInfo.ownerId,
        page:1,
        limit:10
      };
      var that = this;
      utils.Get('getWyserviceListComplete',param).then(function(res){
        if (res.data.code ==0) {
          that.doneOptions = res.data.page.list;
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
    opacity: 0;
}
.wy-fix-ggform input.mint-field-core {
  background: #fff;
}

.wy-fix {
 height: calc(100% - 16px);
    background: #fff;
    padding-top: 16px;
}
.wy-fix .mint-navbar{
  width: 200px;
    margin: 0px auto 16px auto;
    border: solid 1px #26a2ff;
    border-radius: 42px;
    /*background: #ddd;*/
}
.wy-fix .mint-navbar .mint-tab-item.is-selected{
  color: #fff;
  background-color: #26a2ff;
  border-bottom: none;
  margin-bottom: 0px;
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
  padding-left: 20px;
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
</style>

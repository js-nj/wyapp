<template>
<div class="wy-fix">
  <!-- tab-container -->
  <mt-tab-container v-model="selected">
    <mt-tab-container-item id="kjbx">
        <mt-navbar v-model="fixTypes">
          <mt-tab-item id="public">公共区域</mt-tab-item>
          <mt-tab-item id="private">个人区域</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="fixTypes">
          <mt-tab-container-item id="public">
            <div class="wy-fix-ggform" style="">
              <mt-field label="公共地址" placeholder="请填写地址" v-model="ggfixplace"></mt-field>
              <div @click="ggshowSheet" class="wy-select-problem">
                <mt-cell title="故障类型" :value="ggproblem" is-link  ></mt-cell>
              </div>
              <mt-cell class="wy-fix-name" title="备注信息"></mt-cell>
              <mt-field label="" placeholder="请填写故障描述帮助我们尽快解决问题" type="textarea" rows="4" v-model="ggintroduction"></mt-field>
            </div>
            <div style="padding: 16px;text-align: left;">
              <div class="upload_item" v-for="(item,index) in gguploadImgs">
                <i class="iconfont icon-weiwancheng cancel_upload_img" @click="ggdeleteImg(item.id)"></i>
                <img class="upload_img" @click="ggpreviewImg(index)" :src="item.fileUrl" alt="">
              </div>
              <div class="upload_item">
                <img class="upload_img" src="../../../static/images/upload.png" alt="无" @click="gghandleClick">
              </div>
            </div>
            <mt-button class="wy-sug-button" type="primary" @click="">确认提交</mt-button>
          </mt-tab-container-item>
          <mt-tab-container-item id="private">
            <div class="wy-fix-private" ref="privateDiv">
              <div class="wy-fix-ggform" style="">
                <mt-field label="家庭住址" placeholder="请填写地址" v-model="grfixplace"></mt-field>
                <mt-field label="用户姓名" placeholder="请输入用户名" v-model="username"></mt-field>
                <mt-field label="联系方式" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
                <mt-field label="预约日期" placeholder="请输入日期" type="date" v-model="problemday"></mt-field>
                <!-- <mt-datetime-picker type="time" v-model="problemTime" ref="timepiker"></mt-datetime-picker> -->
                <div @click="grshowSheet" class="wy-select-problem">
                  <mt-cell title="故障类型" :value="grproblem" is-link  ></mt-cell>
                </div>
                <mt-cell class="wy-fix-name" title="备注信息"></mt-cell>
                <mt-field label="" placeholder="请填写故障描述帮助我们尽快解决问题" type="textarea" rows="4" v-model="grintroduction"></mt-field>
              </div>
              <div style="padding: 16px;text-align: left;">
                <div class="upload_item" v-for="(item,index) in gruploadImgs">
                  <i class="iconfont icon-weiwancheng cancel_upload_img" @click="grdeleteImg(item.id)"></i>
                  <img class="upload_img" @click="grpreviewImg(index)" :src="item.fileUrl" alt="">
                </div>
                <div class="upload_item">
                  <img class="upload_img" src="../../../static/images/upload.png" alt="无" @click="grhandleClick">
                </div>
              </div>
              <mt-button class="wy-sug-button" type="primary" @click="">确认提交</mt-button>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
        <mt-popup
          v-model="ggsheetVisible"
          position="bottom">
            <span class="wy-fix-pop-btn" @click="ggokValuesChange">确定</span>
            <mt-picker :slots="ggslots" @change="ggonValuesChange" valueKey="name"></mt-picker>
        </mt-popup>
        <mt-popup
          v-model="grsheetVisible"
          position="bottom">
            <span class="wy-fix-pop-btn" @click="grokValuesChange">确定</span>
            <mt-picker :slots="grslots" @change="gronValuesChange" valueKey="name"></mt-picker>
        </mt-popup>
    </mt-tab-container-item>
    <mt-tab-container-item id="bxjl">
        <mt-navbar v-model="listStatus">
          <mt-tab-item id="doing">处理中</mt-tab-item>
          <mt-tab-item id="done">已完成</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="listStatus">
          <mt-tab-container-item id="doing">
            <div class="wy-fix-list-item" v-for="item in options">
              <mt-cell :title="item.name">
                <span :class="{'wy-color-blue':item.status=='待受理'}">{{item.status}}</span>
                <img slot="icon" src="../../../static/images/wy/ggbx.png" width="24" height="24">
              </mt-cell>
              <mt-cell :title="item.place">
                <img slot="icon" src="../../../static/images/wy/lddy.png" width="24" height="24">
              </mt-cell>
              <mt-cell :title="item.time">
                <img slot="icon" src="../../../static/images/wy/bxsj.png" width="24" height="24">
              </mt-cell>
              <mt-cell :title="item.content" value="详情" is-link to="./fixDetail">
                <img slot="icon" src="../../../static/images/wy/bxnr.png" width="24" height="24" >
              </mt-cell>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="done">
            <div class="wy-fix-list-item" v-for="item in doneOptions">
              <mt-cell :title="item.name">
                <span :class="{'wy-color-blue':item.status=='待受理'}">{{item.status}}</span>
                <img slot="icon" src="../../../static/images/wy/jtbx.png" width="24" height="24">
              </mt-cell>
              <mt-cell :title="item.place">
                <img slot="icon" src="../../../static/images/wy/lddy.png" width="24" height="24">
              </mt-cell>
              <mt-cell :title="item.time">
                <img slot="icon" src="../../../static/images/wy/bxsj.png" width="24" height="24">
              </mt-cell>
              <mt-cell :title="item.content" value="详情" is-link to="./fixDetail">
                <img slot="icon" src="../../../static/images/wy/bxnr.png" width="24" height="24" >
              </mt-cell>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
    </mt-tab-container-item>
  </mt-tab-container>
  <mt-tabbar v-model="selected" class="wy-fix-tabbar">
    <mt-tab-item id="kjbx">
      <img v-if="selected == 'kjbx'" slot="icon" src="../../../static/images/wy/kjbx_select.png" alt="" >
      <img v-else slot="icon" src="../../../static/images/wy/kjbx.png" alt="" >
      快捷报修
    </mt-tab-item>
    <mt-tab-item id="bxjl">
      <img v-if="selected == 'bxjl'" slot="icon" src="../../../static/images/wy/wxjl_select.png" alt="" >
      <img v-else slot="icon" src="../../../static/images/wy/wxjl.png" alt="" >
      报修记录
    </mt-tab-item>
  </mt-tabbar>
</div>

</template>

<script>
import { Navbar, TabItem,Tabbar,TabContainer,TabContainerItem,Cell,Checklist,Actionsheet,Field,Picker,Popup,Button,DatetimePicker} from 'mint-ui';
// import utils from '../utils.js';
import * as utils from '../../utils';
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
      gguploadImgs:[{
        fileUrl:'http://www.baidu.com/img/bd_logo1.png',
        id:'1'
      }],
      ggslots: [
        {
          values: [{name:'马桶坏了',id:'12'},{name:'马桶坏了2',id:'122'},],
        }
      ],
      ggchooseResult:{},

      grfixplace:'',
      grintroduction:'',
      grproblem:'',
      gruploadImgs:[{
        fileUrl:'http://www.baidu.com/img/bd_logo1.png',
        id:'1'
      }],
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
    this.$nextTick(() => {
        this.$refs['privateDiv'].style.height = (document.body.clientHeight - 90) + 'px';
        // this.$refs['timepiker'].open();
    })
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
.wy-fix-ggform input.mint-field-core {
  background: #fff;
}
.wy-fix-list-item .mint-cell img {
  height: 20px;
  width: 20px;
}
.wy-fix {
  height: 100%;
    background: #fff;
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
    margin: 0 auto 16px auto;
    display: block;
}
.wy-fix-name.mint-cell .mint-cell-title {
  text-align: left;
  padding-left: 20px;
}
.wy-fix-ggform {
  padding-top: 3px;
  /*border-bottom:solid 1px #ddd;*/
}
.wy-fix-ggform .mint-cell-wrapper {
  background-image: none;
  border-bottom:solid 1px #ddd;
}
.wy-fix-ggform>.mint-cell:first-child .mint-cell-wrapper {
  border-top:solid 1px #ddd;
}
.wy-fix-ggform .mint-cell.is-textarea {
  margin:  0px 16px 16px 16px;
  display: block;
  border-radius:2px;
border:1px solid rgba(238,238,238,1);
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

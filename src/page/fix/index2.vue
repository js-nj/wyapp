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
          <mt-tab-container-item id="public" class="wy-fix-public">
            <div class="wy-fix-ggform" style="">
              <mt-field label="报修地址" placeholder="请输入有故障的具体位置" v-model="ggfixplace"></mt-field>
              <!-- <div @click="ggshowSheet" class="wy-select-problem">
                <mt-cell title="故障类型" :value="ggproblem" is-link  ></mt-cell>
              </div> -->
              <mt-cell class="wy-fix-name" title="故障描述"></mt-cell>
              <mt-field label="" placeholder="请填写故障描述帮助我们尽快解决问题" type="textarea" rows="4" v-model="ggintroduction"></mt-field>
            </div>
            <div style="padding: 16px 24px;text-align: left;">
              <img src="" class="show" style="width:60px;height:60px;display:none;" />
              <div class="upload_item" v-for="(item,index) in gguploadImgs">
                <i class="iconfont icon-weiwancheng cancel_upload_img" @click="ggdeleteImg(item)"></i>
                <img class="upload_img" @click="ggpreviewImg(item)" :src="item" alt="">
              </div>
              <div class="upload_item">
                <img class="upload_img" src="../../../static/images/upload.png" alt="无" @click="gghandleClick">
                <input id="imageFile"  name="imageFile" onchange="changepic(this,'wy-fix-public')" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" />
              </div>
            </div>
            <mt-button class="wy-sug-button" type="primary" @click="postWyServiceSave">确认提交</mt-button>
          </mt-tab-container-item>
          <mt-tab-container-item id="private">
            <div class="wy-fix-private" ref="privateDiv">
              <div class="wy-fix-ggform" style="">
                <mt-field label="家庭住址" placeholder="请填写地址" v-model="grfixplace"></mt-field>
                <mt-field label="报修人" placeholder="请输入用户名" v-model="username"></mt-field>
                <mt-field label="联系方式" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
                <mt-field label="上门日期" placeholder="请输入日期" type="date" v-model="problemday"></mt-field>
                <!-- <mt-datetime-picker type="time" v-model="problemTime" ref="timepiker"></mt-datetime-picker> -->
                <!-- <div @click="grshowSheet" class="wy-select-problem">
                  <mt-cell title="故障类型" :value="grproblem" is-link  ></mt-cell>
                </div> -->
                <mt-cell class="wy-fix-name" title="故障描述"></mt-cell>
                <mt-field label="" placeholder="请填写故障描述帮助我们尽快解决问题" type="textarea" rows="4" v-model="grintroduction"></mt-field>
              </div>
              <div style="padding: 16px 24px;text-align: left;">
                <img src="" class="show" style="width:60px;height:60px;display:none;" />
                <div class="upload_item" v-for="(item,index) in gruploadImgs">
                  <i class="iconfont icon-weiwancheng cancel_upload_img" @click="grdeleteImg(item)"></i>
                  <img class="upload_img" @click="grpreviewImg(item)" :src="item" alt="">
                </div>
                <div class="upload_item">
                  <img class="upload_img" src="../../../static/images/upload.png" alt="无" @click="grhandleClick">
                  <input id="imageFile"  name="imageFile" onchange="changepic(this,'wy-fix-private')" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" />

                </div>
              </div>
              <div class="tkDiv" id="addLOGO" style="z-index:12;height:auto;">
        </div>
              <mt-button id="saveBtn" class="wy-sug-button" type="primary" @click="postWyServiceSave">确认提交</mt-button>
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
    this.$nextTick(() => {
        this.$refs['privateDiv'].style.height = (document.body.clientHeight - 90) + 'px';
    });
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
        ownerId:'4f895cb1ac2ef28b2178089a1ead421d',
        page:1,
        limit:10
      };
      var that = this;
      utils.Post('getWyserviceListIn',param).then(function(res){
        // if (res.data.code ==0) {
        //   Toast('提交成功~');
        // }else {
        //   Toast('提交失败,'+res.data.msg+'！');
        // }
        that.options = res.data.page.list;
      });
    },
    getWyserviceListComplete(){
      var param = {
        ownerId:'4f895cb1ac2ef28b2178089a1ead421d',
        page:1,
        limit:10
      };
      var that = this;
      utils.Post('getWyserviceListComplete',param).then(function(res){
        // if (res.data.code ==0) {
        //   Toast('提交成功~');
        // }else {
        //   Toast('提交失败,'+res.data.msg+'！');
        // }
        that.doneOptions = res.data.page.list;
      });
    },
    postWyServiceSave(){
      // 业主ID 4f895cb1ac2ef28b2178089a1ead421d
      // 物业ID 998bac69aeb0e363a455b28c32b3cfa9
      var that = this;
      var imageFile = $("#imageFile").val();
      if(imageFile && imageFile.length > 0){
        var formData = new FormData();
        formData.append("file", $("#imageFile")[0].files[0]);
        $.ajax({
            url:window.hostPath+"/app/upload/img",
            type:"post",
            data:formData,
            dataType:"json",
            // 告诉jQuery不要去处理发送的数据
            processData: false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType: false,
            beforeSend: function () {
               console.log("正在进行，请稍候");
            },
            success:function(data){
                if(data.code == 0){
                    var param = {
                      propertyId: '998bac69aeb0e363a455b28c32b3cfa9' ,
                      companyId: '公司ID' ,
                      communityId: '楼宇ID' ,
                      ownerId: '4f895cb1ac2ef28b2178089a1ead421d' ,
                      typeId: '故障类型ID' ,
                      serviceAddress: that.ggfixplace ,
                      serviceContent: that.ggintroduction ,
                      ownerName: '大刘' ,
                      ownerMobile: '1885173' ,
                      doorDate: '预约上门时间' ,
                      beginTime: '预约上门时间段1' ,
                      endTime: '预约上门时间段2' ,
                      imgUrl: 'www.baidu.com'
                    };
                    utils.Post('postWyServiceSave',param).then(function(res){
                      if (res.data.code ==0) {
                        Toast('提交成功~');
                      }else {
                        Toast('提交失败,'+res.data.msg+'！');
                      }
                      // that.list = res.data.page.list;
                    });
                }else{
                  alert(data.msg)
                    // $("#imageForm").submit();
                }
            }
        })
      }else {
        var param = {
          propertyId: '物业ID' ,
          companyId: '公司ID' ,
          communityId: '楼宇ID' ,
          ownerId: '业主ID' ,
          typeId: '故障类型ID' ,
          serviceAddress: '故障位置' ,
          serviceContent: '故障描述' ,
          ownerName: '联系人' ,
          ownerMobile: '电话' ,
          doorDate: '预约上门时间' ,
          beginTime: '预约上门时间段1' ,
          endTime: '预约上门时间段2' ,
          imgUrl: '图片地址（多个以逗号隔开）'
        };
        utils.Post('postWyServiceSave',param).then(function(res){
          if (res.data.code ==0) {
            Toast('提交成功~');
          }else {
            Toast('提交失败,'+res.data.msg+'！');
          }
          // that.list = res.data.page.list;
        });
      }
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
.wy-fix-list-item .mint-cell img {
  height: 20px;
  width: 20px;
}
.wy-fix {
  height: 100%;
    background: #fff;
}
.wy-fix .mint-navbar{
  width: 200px;
    margin: 16px auto;
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

<template>
<div class="wy-fix">
        <mt-navbar v-model="fixTypes">
          <mt-tab-item id="public">公共区域</mt-tab-item>
          <mt-tab-item id="private">个人区域</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="fixTypes">
          <mt-tab-container-item id="public" class="wy-fix-public">
            <div class="wy-fix-ggform" style="">

              <div @click="ggfpshowSheet" class="wy-select-problem">
                <mt-cell title="选择住址" :value="ggfixplace" is-link  ></mt-cell>
              </div>
              <!-- <mt-field label="报修地址" placeholder="请输入有故障的具体位置" v-model="ggfixplace"></mt-field> -->

              <div @click="ggshowSheet" class="wy-select-problem">
                <mt-cell title="故障类型" :value="ggproblem" is-link  ></mt-cell>
              </div>
              <mt-cell class="wy-fix-name" title="故障描述"></mt-cell>
              <mt-field label="" placeholder="请填写故障描述帮助我们尽快解决问题" type="textarea" rows="4" v-model="ggintroduction"></mt-field>
            </div>
            <div style="padding: 16px 24px;text-align: left;" v-if="fixTypes=='public'">
              <div id="wy-imgs-upload" style="display:inline-block;vertical-align:top;">
                  <!-- <img src="" class="show" style="width:60px;height:60px;display:none;" /> -->
                </div>
              <!-- <img src="" class="show" style="width:60px;height:60px;display:none;" /> -->
              <div class="upload_item" v-for="(item,index) in gguploadImgs">
                <i class="iconfont icon-weiwancheng cancel_upload_img" @click="ggdeleteImg(item)"></i>
                <img class="upload_img" @click="ggpreviewImg(item)" :src="item" alt="">
              </div>
              <div id="wy-fix-postimgs" class="upload_item">
                <img class="upload_img" id="uploaderBox" src="../../../static/images/upload.png" alt="无" >
                <!-- <input id="imageFile"  name="imageFile" onchange="changepic(this,'wy-fix-public')" type="file" multiple accept="image/*" /> -->
              </div>
            </div>
            <mt-button class="wy-sug-button" :disabled="disabled" type="primary" @click="postWyServiceSave('pub')">确认提交</mt-button>
          </mt-tab-container-item>
          <mt-tab-container-item id="private">
            <div class="wy-fix-private" ref="privateDiv">
              <div class="wy-fix-ggform" style="">
                <!-- <mt-cell label="选择住址" v-model="grfixplace"></mt-cell> -->

                <div @click="grfpshowSheet" class="wy-select-problem">
                  <mt-cell title="选择住址" :value="grfixplace" is-link  ></mt-cell>
                </div>
                <mt-cell title="报修人" :value="username"></mt-cell>
                <!-- <mt-field label="报修人" placeholder="请输入用户名" v-model="username"></mt-field> -->

                <mt-cell title="联系方式" :value="phone"></mt-cell>
                <!-- <mt-field label="联系方式" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field> -->

                <mt-field label="上门日期" placeholder="请输入日期" type="date" v-model="problemday"></mt-field>

                <div class="wy-fix-fixtime" @click="openTimePicker">
                  <span style="color:#333;">上门时间起</span><label class="wy-fix-fixtimevalue">{{problemTime}}</label>
                </div>
                <mt-datetime-picker type="time" v-model="problemTime" ref="timepiker"></mt-datetime-picker>

                <div class="wy-fix-fixtime" @click="openTimePickerEnd">
                  <span style="color:#333;">上门时间止</span><label class="wy-fix-fixtimevalue">{{problemTimeEnd}}</label>
                </div>
                <mt-datetime-picker type="time" v-model="problemTimeEnd" ref="timepikerend"></mt-datetime-picker>

                <div @click="grshowSheet" class="wy-select-problem">
                  <mt-cell title="故障类型" :value="grproblem" is-link  ></mt-cell>
                </div>
                <mt-cell class="wy-fix-name" title="故障描述"></mt-cell>
                <mt-field label="" placeholder="请填写故障描述帮助我们尽快解决问题" type="textarea" rows="4" v-model="grintroduction"></mt-field>
              </div>
              <div style="padding: 16px 24px;text-align: left;" v-if="fixTypes=='private'">
                <!-- <img src="" class="show" style="width:60px;height:60px;display:none;" /> -->
                <div  id="wy-imgs-upload" style="display:inline-block;vertical-align:top;">
                  <!-- <img src="" class="show" style="width:60px;height:60px;display:none;" /> -->
                </div>
                <div class="upload_item" v-for="(item,index) in gruploadImgs">
                  <i class="iconfont icon-weiwancheng cancel_upload_img" @click="grdeleteImg(item)"></i>
                  <img class="upload_img" @click="grpreviewImg(item)" :src="item" alt="">
                </div>
                <div id="wy-fix-postimgs" class="upload_item">
                  <img class="upload_img" id="uploaderBox" src="../../../static/images/upload.png" alt="无" @click="grhandleClick">
                  <!-- <input id="imageFile"  name="imageFile" onchange="changepic(this,'wy-fix-private')"  type="file" multiple accept="image/*" /> -->

                </div>
              </div>
              <div class="tkDiv" id="addLOGO" style="z-index:12;height:auto;">
        </div>
              <mt-button id="saveBtn" class="wy-sug-button" :disabled="disabled" type="primary" @click="postWyServiceSave('prv')">确认提交</mt-button>
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
        <mt-popup
          v-model="grfpsheetVisible"
          position="bottom">
            <span class="wy-fix-pop-btn" @click="grfpokValuesChange">确定</span>
            <mt-picker :slots="grfpslots" @change="grfponValuesChange" valueKey="name"></mt-picker>
        </mt-popup>
        <mt-popup
          v-model="ggfpsheetVisible"
          position="bottom">
            <span class="wy-fix-pop-btn" @click="ggfpokValuesChange">确定</span>
            <mt-picker :slots="ggfpslots" @change="ggfponValuesChange" valueKey="name"></mt-picker>
        </mt-popup>
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
      [DatetimePicker.name]: DatetimePicker,
      [Toast.name]: Toast,

  },
  data () {
    return {
      disabled: false,
      problemTime:'',
      problemTimeEnd:'',
      username:'',
      phone:'',
      problemday:'',
      ggsheetVisible:false,
      grsheetVisible:false,
      grfpsheetVisible:false,
      ggfpsheetVisible:false,
      selected:'kjbx',
      listStatus:'doing',
      fixTypes:'public',
      ggfixplace:'',
      ggintroduction:'',
      ggproblem:'',
      ggproblemid:'',
      gguploadImgs:[],
      ggslots: [
        {
          values: [],
        }
      ],
      ggchooseResult:{},

      grfixplace:'',
      grfixplaceid:'',
      grintroduction:'',
      grproblem:'',
      grproblemid:'',
      gruploadImgs:[],
      grslots: [
        {
          values: [],
        }
      ],
      grchooseResult:{},
      grfpslots: [
        {
          values: [],
        }
      ],
      ggfpslots: [
        {
          values: [],
        }
      ],
      grfpchooseResult:{},
      ggfpchooseResult:{}
    }
  },
  created(){
    // console.log(utils)
    // debugger;
    document.title = '快捷报修';
    window.userInfo = JSON.parse(localStorage.getItem('_userInfo'));
    this.username=window.userInfo.ownerName;
    this.phone=window.userInfo.ownerMobile;
    var tmpArr= window.userInfo.wyOwnerHouseEntityList.map(function(item){
      var tmp = {
        id:item.id,
        name:item.communityName +'/'+item.address
      };
      return tmp
    });
    this.$set(this.grfpslots[0],'values',tmpArr);
    this.$set(this.ggfpslots[0],'values',tmpArr);

    this.$nextTick(() => {
        this.$refs['privateDiv'].style.height = (document.body.clientHeight - 90) + 'px';
    });
    this.getProblemsInPublic();
    this.getProblemsInPrivate();

    this.$nextTick(function(){

        $(".wy-fix").on("click",'#uploaderBox', function(e) {
           var newFileInput = "<input id='uploaderInput' type='file' name='imageFile' accept='image/*' multiple />";
           $(e.currentTarget).parent().append($(newFileInput));
           $("#uploaderInput").bind("change", function(e){
             //onFileUploaded(e);预览等操作
             $(e.currentTarget).removeAttr("id");
             changepic(this,'.wy-fix')
           });
           $("#uploaderInput").click();
        });
    });

    // this.getWyserviceListIn();
    // this.getWyserviceListComplete();
  },
  watch:{
    ggchooseResult(val){
      if (val && val.name) {
        console.log('val',val)
        this.ggproblem = val.name;
        this.ggproblemid = val.id;
      }
    },
    grchooseResult(val){
      if (val && val.name) {
        console.log('val',val)
        this.grproblem = val.name;
        this.grproblemid = val.id;
      }
    },
    grfpchooseResult(val){
      if (val && val.name) {
        console.log('val',val)
        this.grfixplace = val.name;
        this.grfixplaceid = val.id;
      }
    },
    ggfpchooseResult(val){
      if (val && val.name) {
        console.log('val',val)
        this.ggfixplace = val.name;
        this.ggfixplaceid = val.id;
      }
    }
  },
  methods:{
    openTimePicker(){
      this.$refs.timepiker.open();
    },
    openTimePickerEnd(){
      this.$refs.timepikerend.open();
    },
    getProblemsInPublic(){
      var param = {
        page:1,
        limit:100,
        typeId:"1"
      };
      var that = this;
      utils.Get('getWyservicecategory',param).then(function(res){
        if (res.data.code ==0) {
          var arr = res.data.page.list.map(function(item){
            var tmp = {
              id:item.id,
              name:item.catNames
            };
            // item.name = item.catNames;
            return tmp;
          });
          console.log('arr---',arr)
          that.$set(that.ggslots[0],'values',arr);
        }else {
          Toast('请求失败');
        }

        // that.ggslots[0].value = res.data.page.list;
      });
    },
    getProblemsInPrivate(){
      var param = {
        page:1,
        limit:100,
        typeId:"2"
      };
      var that = this;
      utils.Get('getWyservicecategory',param).then(function(res){
        if (res.data.code ==0) {
          var arr = res.data.page.list.map(function(item){
            var tmp = {
              id:item.id,
              name:item.catNames
            };
            // item.name = item.catNames;
            return tmp;
          });
          console.log('arr---',arr)
          that.$set(that.grslots[0],'values',arr);
        }else {
          Toast('请求失败');
        }

        // that.ggslots[0].value = res.data.page.list;
      });
    },
    postWyServiceSave(type){

      // 业主ID 4f895cb1ac2ef28b2178089a1ead421d
      // 物业ID 998bac69aeb0e363a455b28c32b3cfa9
      var that = this;
      if (type == 'pub' && !this.ggintroduction) {
        Toast('请填写故障描述~~！');
        return;
      }else if (type == 'prv' && !this.grintroduction) {
        Toast('请填写故障描述~~！');
        return;
      }
      var imageFile = $("#wy-fix-postimgs").find('input');
      // var imageFile = $("#imageFile").val();
      // console.log('imageFile',imageFile)
      if (!this.disabled) {
        this.disabled = true;
        if(imageFile && imageFile.length > 0){
          sendMoreRequest("#wy-fix-postimgs",function(res){
            var param = {
              propertyId: window.userInfo.propertyId,
              companyId: window.userInfo.companyId ,
              communityId: window.userInfo.companyId ,
              ownerId: window.userInfo.ownerId,
              ownerName: window.userInfo.ownerName ,
              ownerMobile: window.userInfo.ownerMobile ,
              houseId:that.grfixplaceid,
              imgUrl: res.join(',')
            };
            if (type == 'pub') {
              param.typeId = "1";
              param.serviceType  = that.ggproblemid;
              param.serviceAddress = that.ggfixplace;
              param.serviceContent = that.ggintroduction;
            } else {
              // param.serviceAddress = that.grfixplaceid;
              param.serviceContent = that.grintroduction;
              param.typeId = "2";
              param.serviceAddress = that.grfixplace;
              param.serviceType  = that.grproblemid;
              param.doorDate=that.problemday;
              param.beginTime=that.problemTime;
              param.endTime=that.problemTimeEnd;
            }
            utils.Post('postWyServiceSave',param).then(function(res){
              if (res.data.code ==0) {
                Toast('提交成功~');
                window.history.go(-1);
              }else {
                Toast('提交失败,'+res.data.msg+'！');
              }
              // that.list = res.data.page.list;
            });
          });
        }else {
          var param = {
            propertyId: window.userInfo.propertyId,
            companyId: window.userInfo.companyId ,
            communityId: window.userInfo.companyId ,
            ownerId: window.userInfo.ownerId,
            ownerName: window.userInfo.ownerName ,
            houseId:that.grfixplaceid,
            ownerMobile: window.userInfo.ownerMobile
          };
          if (type == 'pub') {
              param.typeId = "1";
              param.serviceType  = that.ggproblemid;
              param.serviceAddress = that.ggfixplace;
              param.serviceContent = that.ggintroduction;
            } else {
              // param.serviceAddress = that.grfixplaceid;
              param.serviceContent = that.grintroduction;
              param.typeId = "2";
              param.serviceAddress = that.grfixplace;
              param.serviceType  = that.grproblemid;
              param.doorDate=that.problemday;
              param.beginTime=that.problemTime;
              param.endTime=that.problemTimeEnd;
            }

          utils.Post('postWyServiceSave',param).then(function(res){
            if (res.data.code ==0) {
              Toast('提交成功~');
              window.history.go(-1);
            }else {
              Toast('提交失败,'+res.data.msg+'！');
            }
            // that.list = res.data.page.list;
          });
        }
      }
    },
    ggdeleteImg(){

    },
    ggpreviewImg(){

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
    },
    ggfpshowSheet(){
      // debugger;
      this.ggfpsheetVisible = true;
    },
    ggfponValuesChange(e,val){
      if (val) {
        this.ggfpchooseResult = val[0];
      }
      // console.log(values)
    },
    ggfpokValuesChange(){
      if (!this.ggfpchooseResult.name) {
        this.ggfpchooseResult = this.ggfpslots[0].values;
      }
      this.ggfpsheetVisible = false;
    },
    grfpshowSheet(){
      // debugger;
      this.grfpsheetVisible = true;
    },
    grfponValuesChange(e,val){
      if (val) {
        this.grfpchooseResult = val[0];
      }
      // console.log(values)
    },
    grfpokValuesChange(){
      if (!this.grfpchooseResult.name) {
        this.grfpchooseResult = this.grfpslots[0].values;
      }
      this.grfpsheetVisible = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.wy-fix .mint-cell-allow-right::after {
    border: solid 1px #c8c8cd;
    border-bottom-width: 0;
    border-left-width: 0;
     right: 10px;
    width: 6px;
    height: 6px;
}
.wy-fix .mint-cell-value.is-link{
margin-right: 10px;
}
.mint-field .mint-cell-value input[type="date"] {
      text-align: right;
}
.mint-field .mint-cell-value input[type="date"] ::placeholder {
  text-align: right;
}
.wy-fix-ggform .wy-select-problem:first-child .mint-cell .mint-cell-value.is-link {
  /*width: 190px;*/
  width: calc(100% - 90px);
  text-align: left;
  margin-right: 0;
}
#wy-fix-postimgs input {
   position: absolute;
  top: 0;
  right: 0;
  z-index:-1;
}
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
        top: 0;
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
  height: calc(100% - 16px);
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

}
.wy-select-problem .mint-cell-value.is-link span{
  color:#333;
}
.wy-fix-private .mint-cell-value span {
  color:#333;
  font-size: 14px;
}
.wy-fix-fixtime{
      padding: 12px 0 12px 18px;
  /*padding: 12px 10px;*/
    text-align: left;
    font-size: 14px;
    color: inherit;
    border-bottom: solid 1px #d9d9d9;
}
.wy-fix-fixtime span {
  width: 105px;
  display: inline-block;
  color: #747474;
}
.wy-fix-fixtimevalue {
float: right;
color: #333;
/*font-size: 16px;*/
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
  /*text-align: right;*/
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
.wy-select-problem .mint-cell .mint-cell-value.is-link span {
  font-size: 14px;
  word-break: break-all;
}
</style>

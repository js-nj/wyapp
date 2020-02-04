<template>
<div class="wy-fix-detail">
  <div class="wy-fix-detItem" style="">
    <div class="wy-fix-det-head">
      <span class="wy-fix-det-title">故障信息</span>
      <label class="wy-fix-det-status">{{status}}</label>
    </div>
    <div style="padding-bottom: 32px;">
      <div v-for="item in options" class="wy-fix-det-desitem" style="">
        <span>{{item.title}}</span>：
        <span class="wy-fix-det-desitemvalue" v-if="item.title != '故障图片'" >{{item.value}}</span>
        <div v-else class="wy-fix-det-desitemimgs">
          <img v-if="(item.value)" :src="src" v-for="src in item.value" class="wy-fix-det-desitemimg" />
        </div>
        <label v-if="item.title == '报修人员'" class="wy-fix-det-usertagdiv">
          <span class="wy-fix-det-usertag">
            产权用户
          </span>
        </label>
        <a :href="phone" class="wy-fix-det-userphone" v-if="item.title == '报修人员'">
          <img src="../../../static/images/wy/phone.png" />
        </a>
      </div>
    </div>
  </div>
  <div class="wy-fix-detItem" style="">
    <div class="wy-fix-det-head">
      <span class="wy-fix-det-title">维修信息</span>
    </div>
    <div style="">
      <div class="wy-sug-textarea">
        <mt-field label="" placeholder="请填写维修备注" type="textarea" rows="4" v-model="introduction"></mt-field>
      </div>
      <div style="padding: 12px 0;">
        <div class="wy-sug-index wy-fixer-detail">
          <div id="wy-imgs-upload" style="display:inline-block;vertical-align:top;">
            <!-- <img src="" class="show" style="width:60px;height:60px;display:none;" /> -->
          </div>
          <img style="width: 65px;" src="../../../static/images/upload.png" />
          <input id="imageFile1"  name="imageFile" onchange="changepic(this,'wy-fixer-detail')" type="file" multiple accept="image/png, image/jpeg, image/gif, image/jpg" />
        </div>
      </div>
    </div>
  </div>
  <mt-button class="wy-sug-button" type="primary" @click="postRepairSubmit">确认提交</mt-button>
</div>

</template>

<script>
import { Navbar, TabItem,TabContainer,TabContainerItem,Cell,Checklist,Field,Button,Toast  } from 'mint-ui';
import * as utils from '../../utils';
import $ from 'jquery';
export default {
  name: 'detail',
  components: {
      [Navbar.name]: Navbar,
      [TabItem.name]: TabItem,
      [TabContainer.name]: TabContainer,
      [TabContainerItem.name]: TabContainerItem,
      [Cell.name]: Cell,
      [Checklist.name]: Checklist,
      [Field.name]: Field,
      [Button.name]: Button,
      [Toast.name]: Toast,
  },
  data () {
    return {
      id:'',
      phone:'',
      status:'',
      steps:[],
      serviceStatus:'',
      introduction:'',
      options: [{
        title:'报修单号',
        value:''
      },{
        title:'报修区域',
        value:''
      },{
        title:'报修人员',
        value:''
      },{
        title:'报修时间',
        value:''
      },{
        title:'故障地址',
        value:''
      },{
        title:'故障描述',
        value:''
      },{
        title:'故障图片',
        value:[]
      }],
      problemOptions: [{
        title:'维修人',
        value:''
      },{
        title:'维修电话',
        value:''
      },{
        title:'维修时间',
        value:''
      },{
        title:'维修内容',
        value:''
      }
      // ,{
      //   title:'维修图片',
      //   value:[]
      // }
      ]
    }
  },
  created(){
    // console.log(utils)
    // debugger;
    document.title = '维修详情';
    window.wxuserInfo = JSON.parse(localStorage.getItem('wxuserInfo'));
    var param = {
      id:''
    };
    param.id = window.location.href.split('id=')[1];
    this.id = param.id;
    this.getWyServiceInfo(param);
  },
  watch:{

  },
  methods:{
    postRepairSubmit(){
      var that = this;
      var imageFile = $("#imageFile1").val();
      // console.log('imageFile',$("#imageFile1")[0].files);
      // var dateStr = new Date().toString();
      // dateStr = String(dateStr).replace('T','');
      // dateStr = dateStr.split('.')[0];
      if(imageFile && imageFile.length > 0){
        var formData = new FormData();
        // for (var i = 0; i < imageFile.length; i++) {
          // imageFile[i]
          formData.append("file", $("#imageFile1")[0].files[0]);
        // }
        // debugger
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
              console.log('img data',data);
                if(data.code == 0){
                  var param = {
                    id: that.id ,
                    repairUserId: window.wxuserInfo.id,
                    repairTime:(new Date()).Format("yyyy-MM-dd hh:mm:ss"),
                    repairContent: that.introduction,
                    imgUrl : data.imgUrl,//图片地址（多个以逗号隔开）
                  };
                  utils.Post('postRepairSubmit',param).then(function(res){
                    if (res.data.code ==0) {
                      Toast('提交成功~');
                      window.history.go(-1);
                    }else {
                      Toast('提交失败,'+res.data.msg+'！');
                    }
                    // that.list = res.data.page.list;
                  });
                }else{
                  Toast(data.msg)
                }
            }
        })
      }else {
        var param = {
          id: that.id ,
          repairUserId: window.wxuserInfo.id,
          repairTime:(new Date()).Format("yyyy-MM-dd hh:mm:ss.S"),
          repairContent: that.introduction,
          // repairImgUrl:''
        };
        utils.Post('postRepairSubmit',param).then(function(res){
          if (res.data.code ==0) {
            Toast('提交成功~');
            window.history.go(-1);
          }else {
            Toast('提交失败,'+res.data.msg+'！');
          }
          // that.list = res.data.page.list;
        });
      }
    },
    getWyServiceInfo(param){
      var that = this;
      utils.Get('getWyServiceInfo',param).then(function(res){
        if (res.data.code === 0 && res.data.wyService) {

          that.phone = 'tel:'+res.data.wyService.ownerMobile;
          that.status = res.data.wyService.serviceStatusName;
          that.steps = res.data.wyService.serviceRecordList;
          that.serviceStatus = res.data.wyService.serviceStatus;

          that.$set(that.options,0,{
            title:'报修单号',
            value:res.data.wyService.serviceNumber
          });
          that.$set(that.options,1,{
            title:'报修区域',
            value:res.data.wyService.typeName
          });
          that.$set(that.options,2,{
            title:'报修人员',
            value:res.data.wyService.ownerName
          });
          that.$set(that.options,3,{
            title:'报修时间',
            value:res.data.wyService.createDate
          });
          // that.$set(that.options,4,{
          //   title:'预约时间',
          //   value:res.data.wyService.doorDate+' '+res.data.wyService.beginTime+'-'+res.data.wyService.endTime
          // });
          that.$set(that.options,4,{
            title:'报修地址',
            value:res.data.wyService.serviceAddress
          });
          that.$set(that.options,5,{
            title:'报修内容',
            value:res.data.wyService.serviceContent
          });
          that.$set(that.options,6,{
            title:'故障图片',
            value:(res.data.wyService.imgUrl && res.data.wyService.imgUrl.split(','))||''
          });


          that.$set(that.problemOptions,0,{
            title:'维修人',
            value:res.data.wyService.repairUserName
          });
          that.$set(that.problemOptions,1,{
            title:'维修电话',
            value:res.data.wyService.repairUserMobile
          });
          that.$set(that.problemOptions,2,{
            title:'维修时间',
            value:res.data.wyService.repairTime
          });
          that.$set(that.problemOptions,3,{
            title:'维修内容',
            value:res.data.wyService.repairContent
          });


          // that.options = [];
          // for (var key in res.data.wyService) {
          //   var tmpObj = {};
          //   tmpObj.title = key;
          //   tmpObj.value = res.data.wyService[key];
          //   that.options.push(tmpObj);
          // }
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.wy-fix-detbuts {
  padding: 16px;
    background: #fff;
    /*position: absolute;*/
    width: calc(100% - 32px);
    bottom: 0;
}
.wy-fix-detbuts .wy-fix-detbut{
  display: inline-block;
  text-align: center;
  width: calc((100% - 20px) / 4);
  font-size: 14px;
  line-height: 14px;
  border-right: solid 2px #ddd;
}
.wy-fix-detbuts .wy-fix-detbut:last-child{

  border-right: none;
}
#wy-steps{
  background: #fff;
}
.wy-step-tag {
border-radius: 8px;
    border: 1px solid rgba(55,137,249,1);
    color: rgba(55,137,249,1);
    font-size: 10px;
    display: inline-block;
    line-height: 10px;
    padding: 2px 4px 1px 4px;
    vertical-align: text-bottom;
}
.wy-step-time,.wy-step-person {
  display: inline-block;
  vertical-align: top;
  padding: 0 4px;
}
.wy-fix-det-title{
  display: inline-block;
  vertical-align: top;
  font-size:16px;
font-weight:600;
color:rgba(51,51,51,1);
}
.wy-fix-det-status{
  font-size:14px;
  float: right;
font-weight:500;
color:rgba(55,137,249,1);
}
.wy-fix-detItem {
  background: #fff;
  padding:16px 24px;text-align: left;line-height:1;
  margin-bottom: 12px;
}
.wy-fix-det-head{
  padding-bottom: 16px;
    border-bottom: solid 1px #ddd;
}
.wy-fix-det-desitem {
  padding-top: 12px;
  font-size:14px;
font-weight:500;
color:rgba(51,51,51,1);
line-height: 14px;
position: relative;

}
.wy-fix-det-desitemvalue {
  display: inline-block;
  vertical-align: top;
  padding-left: 4px;
}
.wy-fix-det-usertagdiv{
display: inline-block;
    vertical-align: top;
    position: relative;
}
.wy-fix-det-usertag {
    width: 46px;
    /* height: 18px; */
    border-radius: 2px;
    border: 1px solid rgba(55,137,249,1);
    font-size: 10px;
    /* font-weight: 500; */
    color: rgba(55,137,249,1);
    /* line-height: 10px; */
    display: inline-block;
    padding: 2px 2px 0px 2px;
    margin-left: 4px;
    vertical-align: top;
    position: absolute;
    top: -3px;
}
.wy-fix-det-userphone {
  position: absolute;
      top: 8px;
  right: 0;
}
.wy-fix-det-userphone img {
  width: 18px;
  height: 18px;
}
.wy-fix-det-desitemimgs{
display: inline-block;
    /* position: relative; */
    /* top: 100%; */
    float: right;
    position: relative;
    top: 2px;
    left: 6px;
    /* overflow: hidden; */
    width: 200px;
}
.wy-fix-det-desitemimg {
  width: 50px;
  height: 50px;
  display: inline-block;
  margin-right: 4px;
}
.wy-sug-textarea{
  /*padding-top: 12px;*/
}
.wy-sug-textarea .mint-cell {
   /*background-color: #F6F8FA;*/
}
.wy-sug-textarea .mint-field.is-textarea textarea{
 /*background-color: #F6F8FA;*/
}
.wy-sug-textarea .mint-field.is-textarea textarea::-webkit-input-placeholder { /* WebKit browsers */
  color: #bbb;
  font-size: 14px;
}
.wy-sug-textarea .mint-field.is-textarea .mint-cell-wrapper{
  background-image: none;
  padding: 0;
  border-bottom: solid 1px #d9d9d9;
}
.wy-sug-textarea .mint-field.is-textarea .mint-cell-wrapper .mint-cell-value{
  padding: 8px 0;
}
.wy-sug-button{
  font-size: 16px;
      width: 80%;
    margin: 0 auto;
    display: block;
}
#imageFile1 {
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
</style>

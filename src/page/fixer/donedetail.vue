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
        <div v-else class="wy-fix-det-desitemimgs post">
          <img :src="src" v-for="src in item.value" class="wy-fix-det-desitemimg" />
        </div>
        <label v-if="item.title == '报修人员'" class="wy-fix-det-usertagdiv">
          <span class="wy-fix-det-usertag">
            <!-- 产权用户 -->
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
      <div v-for="item in problemOptions" class="wy-fix-det-desitem">
        <span>{{item.title}}</span>：
        <span class="wy-fix-det-desitemvalue" v-if="item.title != '故障图片'">{{item.value}}</span>
        <div v-else class="wy-fix-det-desitemimgs">
          <img v-if="item.value" :src="src" v-for="src in item.value" class="wy-fix-det-desitemimg" />
        </div>
        <div style="clear:both;"></div>
      </div>
    </div>
  </div>
  <div class="wy-fix-detItem" v-if="evaluateContent">
    <div class="wy-fix-det-head">
      <span class="wy-fix-det-title">评价信息</span>
    </div>
    <div style="padding: 8px 0;font-size: 14px;line-height: 16px;">
      {{evaluateContent}}
    </div>
  </div>
  <div id="wy-steps"></div>
</div>

</template>

<script>
import { Navbar, TabItem,TabContainer,TabContainerItem,Cell,Checklist  } from 'mint-ui';
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
  },
  data () {
    return {
      id:'',
      phone:'',
      status:'',
      steps:[],
      serviceStatus:'',
      evaluateContent:'',
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
        title:'维修人员',
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
    window.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    document.title = '报修详情';

    var param = {
      id:''
    };
    param.id = window.location.href.split('id=')[1];
    this.id = param.id;
    this.getWyServiceInfo(param);
  },
  watch:{
    steps(arr){
      var tmp = arr.map(function(item){
        return {
           title: "<span class='wy-step-tag'>"+item.typeName+"</span><span class='wy-step-time'>"+item.createDate+"</span><span class='wy-step-person'>"+item.createName+"</span>",
           description:'<br>'
        }
      });
      this.$nextTick(()=>{
        if (tmp && tmp.length>0) {
          var steps1 = window.steps({
            el: "#wy-steps",
            data:tmp,
            active: tmp.length-1,
            direction: "vertical"
          });
        }
      });
    }
  },
  methods:{
    gotoCancel(){
      var param = {
        id:this.id,
        ownerId:window.userInfo.ownerId
      };
      var that = this;
      utils.Get('postWyserviceCancel',param).then(function(res){
        if (res.data.code ==0) {
          Toast('撤销成功~');
        }else {
          Toast('撤销失败~');
        }
      });
    },
    gotoSure(){
      var param = {
        id:this.id,
        ownerId:window.userInfo.ownerId
      };
      var that = this;
      utils.Get('WyServiceSure',param).then(function(res){
        if (res.data.code ==0) {
          Toast('撤销成功~');
        }else {
          Toast('撤销失败~');
        }
      });
    },

    getWyServiceInfo(param){
      var that = this;
      utils.Get('getWyServiceInfo',param).then(function(res){
        if (res.data.code === 0 && res.data.wyService) {
          that.evaluateContent = res.data.wyService.evaluateContent;
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
            title:'维修人员',
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
    /*width: calc(100% - 32px);*/
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
    padding: 4px 4px 2px 4px;
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
    /*border: 1px solid rgba(55,137,249,1);*/
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
    width: calc(100% - 70px);
}
.wy-fix-det-desitemimg {
  width: 50px;
  height: 50px;
  display: inline-block;
  margin-right: 4px;
}
</style>

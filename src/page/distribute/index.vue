<template>
<div class="wy-fixer">
<mt-navbar v-model="selected">
  <mt-tab-item id="1">待分配</mt-tab-item>
  <mt-tab-item id="2">已分配</mt-tab-item>
</mt-navbar>

<!-- tab-container -->
<mt-tab-container v-model="selected">
  <mt-tab-container-item id="1">
    <div class="wy-fix-list-items">
      <div class="wy-fix-list-item" v-for="item in options">
        <div class="wy-fix-list-item-img" style="">
          <img  style="width:35px;height:35px;" src="../../../static/images/wy/kjbx_tmp.png" />
        </div>
        <div class="wy-fix-list-item-body" style="">
          <div style="font-size:14px;color:#333;">{{item.serviceAddress}}</div>
          <div style="color:#444;">{{item.typeName+'-'+item.serviceTypeName}}</div>
          <div style="position:relative;">
            <span style="color:#999;">{{item.createDate}}</span>
            <label class="wy-fix-list-item-more" @click="gotoDetail(item.id)" style="">
              <span v-if="item.serviceStatusName && item.serviceStatusName.indexOf('待')>-1" style="color: #3789F9;">{{item.serviceStatusName}}</span>
              <span v-else style="color: #999;">{{item.serviceStatusName}}</span>
              <i class="mint-cell-allow-right"></i>
            </label>
          </div>
        </div>
      </div>

      <!-- <mt-cell :title="item.typeName">
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
      <mt-cell :title="item.serviceContent " value="详情" is-link :to="'./fixerDetail?id='+item.id">
        <img slot="icon" src="../../../static/images/wy/bxnr.png" width="24" height="24" >
      </mt-cell> -->
    </div>
    <div v-if="options.length==0" style="padding:16px 0;">
      <img style="width:128px;height:103px;" src="../../../static/images/wy/none.png" />
      <div  style="color:#ADB7BA;font-size:15px;">暂无内容</div>
    </div>
    <!-- <mt-cell v-for="n in 10" :title="'内容 ' + n" /> -->
  </mt-tab-container-item>
  <mt-tab-container-item id="2">
    <div class="wy-fix-list-items">
      <div class="wy-fix-list-item" v-for="item in doneOptions">
        <div class="wy-fix-list-item-img" style="">
          <img  style="width:35px;height:35px;" src="../../../static/images/wy/kjbx_tmp.png" />
        </div>
        <div class="wy-fix-list-item-body" style="">
          <div style="font-size:14px;color:#333;">{{item.serviceAddress}}</div>
          <div style="color:#444;">{{item.typeName+'-'+item.serviceTypeName}}</div>
          <div style="position:relative;">
            <span style="color:#999;">{{item.createDate}}</span>
            <label class="wy-fix-list-item-more" @click="gotoDetail(item.id)" style="">
              <span v-if="item.serviceStatusName && item.serviceStatusName.indexOf('待')>-1" style="color: #3789F9;">{{item.serviceStatusName}}</span>
              <span v-else style="color: #999;">{{item.serviceStatusName}}</span>
              <i class="mint-cell-allow-right"></i>
            </label>
          </div>
        </div>
        <!-- <mt-cell :title="item.typeName">
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
        <mt-cell :title="item.serviceContent " value="详情" is-link :to="'./fixerDoneDetail?id='+item.id">
          <img slot="icon" src="../../../static/images/wy/bxnr.png" width="24" height="24" >
        </mt-cell> -->
      </div>
    </div>
    <div v-if="doneOptions.length==0" style="padding:16px 0;">
      <img style="width:128px;height:103px;" src="../../../static/images/wy/none.png" />
      <div @click="gotoFixerLogin" style="color:#ADB7BA;font-size:15px;">暂无内容</div>
    </div>
    <!-- <mt-cell v-for="n in 4" :title="'测试 ' + n" /> -->
  </mt-tab-container-item>
</mt-tab-container>
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
      msg:'',
      selected:'1',
      options:[],
      doneOptions:[]
    }
  },
  watch:{
    selected(val){
      sessionStorage.setItem('wyFixerIndex',val);
    }
  },
  created(){
    document.title = '我的派单';
    window.userInfo = JSON.parse(localStorage.getItem('_userInfo'));
    var wyFixerIndex = sessionStorage.getItem('wyFixerIndex');
    if (wyFixerIndex) {
      this.selected = wyFixerIndex;
    }
    this.getWyserviceListIn();
    this.getWyserviceListComplete();
  },
  methods:{
    gotoFixerLogin(){
      // localStorage.wxuserInfo = '';
      // this.$router.push({
      //   name:'fixerLogin'
      // });
    },
    gotoDetail(id){
      window.location.href = window.location.origin+window.location.pathname + '#/disDetail?id='+id;
    },
    getWyserviceListIn(){
      var param = {
        // repairUserId:window.userInfo.id,
        page:1,
        limit:9999
      };
      var that = this;
      utils.Get('getListwaitallocate',param).then(function(res){
        if (res.data.code ==0) {
          that.options = res.data.page.list;
        }else {
          Toast('获取数据失败');
        }

      });
    },
    getWyserviceListComplete(){
      var param = {
        // repairUserId:window.userInfo.id,
        page:1,
        limit:9999
      };
      var that = this;
      utils.Get('getListcompleteallocate',param).then(function(res){
        if (res.data.code ==0) {
          that.doneOptions = res.data.page.list;
        }else {
          Toast('获取数据失败');
        }

      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.wy-fixer {
  height:100%;
  background-color: #fff;
}
.wy-fix-list-item {
margin-top: 8px;
border-bottom: solid 1px #ddd;
    position: relative;
    text-align: left;
    padding-left: 8px;

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
.wy-fixer .mint-tab-item-label {
font-size: 16px;
}
.wy-fix-list-items {
  padding: 0 16px;
      background-color: #fff;
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

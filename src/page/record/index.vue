<template>
<div class="wy-rec">
  <mt-navbar v-model="selected">
    <mt-tab-item id="1">待缴账单</mt-tab-item>
    <mt-tab-item id="2">已缴账单</mt-tab-item>
  </mt-navbar>

  <!-- tab-container -->
  <mt-tab-container v-model="selected" ><!-- height:calc(100% - 46px); -->
    <mt-tab-container-item id="1" style="padding-bottom: 64px;">
      <div v-if="options.length!=0">
        <div class="wy-rec-item" v-for="item in options">
          <mt-checklist
            v-model="item.value"
            :options="item.options">
          </mt-checklist>
          <div class="wy-rec-item-des">
            <div class="wy-rec-item-time">
              <span>费用周期</span>
              <div style="padding-top:2px;">{{item.time}}</div>
            </div>
            <div class="wy-rec-item-money">
              <span>金额</span>
              <div style="padding-top:2px;">{{item.money}}</div>
            </div>
            <!-- <div class="wy-rec-icon" >></div> -->
          </div>
        </div>
        <div class="wy-rec-action">
          <!-- <mt-radio
            style="width: 105px;display: inline-block;vertical-align:top;"
            v-model="allCheck"
            :options="['全选']">
          </mt-radio> -->
          <mt-checklist
            style="width: 105px;display: inline-block;vertical-align:top;"
            v-model="allCheck"
            :options="['全选']">
          </mt-checklist>
          <label style="font-size: 14px;display: inline-block;padding: 0 16px 0 0;">
            合计：<span style="color:#DE3116;">¥</span><span style="color:#DE3116;display:inline-block;min-width:32px;">{{allMoney}}</span>
          </label>
          <mt-button class="wy-rec-button" :disabled="disabled" type="primary" @click="postCreateOrder">去支付</mt-button>
        </div>
      </div>
      <div v-else style="padding:16px 0;">
        <img style="width:128px;height:103px;" src="../../../static/images/wy/none.png" />
        <div style="color:#ADB7BA;font-size:15px;">暂无内容</div>
      </div>
    </mt-tab-container-item>
    <mt-tab-container-item id="2" class="wy-rec-index-done-tabcon">
      <div v-if="doneoptions.length>0" class="wy-rec-done-items" :style="{'height':newsHeight,'overflow':'scroll'}">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="wyrecindexloadmore">
          <div class="wy-rec-item wy-rec-mt-8" v-for="item in doneoptions" :show="item.show">
            <div class="wy-rec-item-title">{{item.options[0].label}}</div>
            <div class="wy-rec-item-des">
              <div class="wy-rec-item-time">
                <span>费用周期</span>
                <div style="padding-top:2px;">{{item.time}}</div>
              </div>
              <div class="wy-rec-item-money">
                <span>金额</span>
                <div style="padding-top:2px;">{{item.money}}</div>
              </div>
              <div class="wy-rec-icon mint-cell-allow-right" @click="gotoRecDetail(item)" ></div>
            </div>
          </div>
        </mt-loadmore>
      </div>
      <div v-if="doneoptions.length==0" style="padding:16px 0;">
        <img style="width:128px;height:103px;" src="../../../static/images/wy/none.png" />
        <div style="color:#ADB7BA;font-size:15px;">暂无内容</div>
      </div>
    </mt-tab-container-item>
  </mt-tab-container>
</div>

</template>

<script>
import { Navbar, TabItem,TabContainer,TabContainerItem,Cell,Checklist,Radio,Button,Toast,Loadmore  } from 'mint-ui';
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
      [Radio.name]: Radio,
      [Button.name]: Button,
      [Toast.name]: Toast,
      [Loadmore.name]: Loadmore,
  },
  data () {
    return {
      allCheck: [],
      disabled:false,
      allMoney:0,
      selected:'1',
      chooseValue:[],
      options: [
        // {
        //   time: '物业费2222',
        //   id:'',
        //   money: '1111',
        //   value:[],
        //   options:[{
        //     label: '物业费',
        //     value: '11111',
        //   }]
        //   // disabled: true
        // },
        // {
        //   time: '物业费2222',
        //   id:'',
        //   money: '1111',
        //   value:[],
        //   options:[{
        //     label: '物业费',
        //     value: '11111',
        //   }]
        //   // disabled: true
        // },
      ],
      doneoptions:[],
      allLoaded:false,
      totalCount:0,
      currPage:1,
      newsHeight:(document.documentElement.clientHeight - 53)+'px',
    }
  },
  created(){
    document.title = '账单列表';
    window.userInfo = JSON.parse(localStorage.getItem('_userInfo'));
    if (window.location.href.indexOf('open_id')>-1) {
      window.open_id = window.location.href.split('open_id=')[1];
    }
    this.getPayDoingList();
    var wyRecIndex = sessionStorage.getItem('wyRecIndex');
    if (wyRecIndex) {
      this.selected = wyRecIndex;
    }
  },
  watch:{
    selected(val){
      sessionStorage.setItem('wyRecIndex',val);
      if (val == '1') {
        this.getPayDoingList();
      } else if(val == '2' && this.doneoptions.length == 0) {
        this.doneoptions.push({
          show:'hide',
          time: '',
          money: '',
          id:'',
          value:'',
          options:[{
            label: '',
            value: '',
          }]
        });
      }else if (val == '2' && this.doneoptions.length > 0) {
        this.getPayDoneList();
      }
    },
    allCheck(val){
      // console.log(val)
      var that = this;
      that.allMoney = 0;
      if (val && val.length>0) {
        // console.log(this.options)
        this.options.forEach(function(item){
          item.value.push(item.options[0].value);
          that.allMoney += Number(item.value[0]);
        });
        that.allMoney = Number(that.allMoney).toFixed(2);
      }else {
        // console.log('else',this.options)
        this.options.forEach(function(item){
          // item.value.pop();
          item.value = [];
        });
        this.allMoney = 0;
        console.log('else',this.options)
      }
    },
    options:{
      handler:function(){
        var that = this;
        that.allMoney = 0;
        this.options.forEach(function(item){
          // console.log('item',item)
          // item.value.push(item.options[0].value);
          if (item.value[0]) {
            that.allMoney += Number(item.value[0]);
          }

        });
        that.allMoney = Number(that.allMoney).toFixed(2);
      },
      deep: true
    }
  },
  methods:{
    loadBottom(){
      this.getPayDoneList();
    },
    getPayDoingList(){
      var param = {
        page:1,
        limit:9999,
        ownerId:window.userInfo.ownerId,
        payStatus:1
      };
      var that = this;
      utils.Get('getPayList',param).then(function(res){
        if (res.data.page.list && res.data.page.list.length>0) {
          that.options = [];
          res.data.page.list.forEach(function(item){
              var objTmp ={
                time: item.payStart+' - '+item.payEnd,
                money: item.payMoney,
                id:item.id,
                value:[],
                options:[{
                  label: item.payItemName+'-'+item.payAddress,//item.payItemName+'-'+item.communityName+'-'+item.payAddress,
                  value: item.payMoney,
                }]
              };
              that.options.push(objTmp);
          });
        }
      });
    },
    getPayDoneList(){
      var that = this;
      var param = {
        page:that.currPage,
        limit:10,
        ownerId:window.userInfo.ownerId,
        payStatus:3
      };

      utils.Get('getPayList',param).then(function(res){
        if (res.data.page.list && res.data.page.list.length>0) {

          if (that.currPage == 1) {
            console.log('9999')
            that.doneoptions = [];
          }
          res.data.page.list.forEach(function(item){
              var objTmp ={
                time: item.payStart+' - '+item.payEnd,
                money: item.payMoney,
                id:item.id,
                value:[],
                options:[{
                  label: item.payItemName+'-'+item.payAddress,//item.payItemName+'-'+item.communityName+'-'+item.payAddress,
                  value: item.payMoney,
                }]
              };
              that.doneoptions.push(objTmp);
          });


          that.totalCount = res.data.page.totalCount;

          if ((that.totalCount == that.doneoptions.length) || that.currPage == that.totalPage) {
            that.allLoaded = true;// 若数据已全部获取完毕
            that.$refs.wyrecindexloadmore.onBottomLoaded();
          }else {
            that.allLoaded = false;
            that.currPage++
            that.$refs.wyrecindexloadmore.onBottomLoaded();
          }
          that.$nextTick(function(){
            $('.wy-rec-done-items').scrollTop(0);
          })
        }else {
          that.doneoptions = [];
        }
      });
    },
    postCreateOrder(){
      var param = {
        ids:'',
        redirectUrl:window.location.origin + '/index.html#/recResult'
      };
      if (!this.disabled) {
        this.disabled = true;
        if (this.options.length>0) {
          this.options.forEach(function(item){
            if (item.value[0]) {
              param.ids = param.ids + item.id + ',';
            }
          });
          param.ids = param.ids.slice(0,param.ids.length -1);
          utils.Get('postCreateOrder',param).then(function(res){
            if (res.data.code === 0 && res.data.result.paymentUrl) {
              window.location.href = res.data.result.paymentUrl+'&openId='+window.open_id;
            }else {
              Toast('缴费失败~')
            }
          });
        }else {
          Toast('请至少选择一单~')
        }
      }
    },
    gotoRecDetail(item){
      this.$router.push({
        name:'recDetail',
        params:{
          item:item
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.wy-rec {
  height: 100%;
}
.wy-rec-action .mint-checklist .mint-checklist-title {
  display: none;
}
.wy-rec-action .mint-checklist{
  position: relative;
    left: -16px;
}
.wy-rec-action .mint-checklist .mint-cell-wrapper {
  background-image: none;
  padding: 0;
}
.wy-rec-action .mint-checklist .mint-checkbox-label{
  font-size: 14px;
}
.wy-rec-action {
  line-height: 48px;
    background: #fff;
    position: absolute;
    width: 100%;
    bottom: 0;
}
.wy-rec-button.mint-button{
  font-size: 16px;
    padding: 0 16px;
    height: 34px;
    border-radius: 18px;
}
.wy-rec-item-des{
      text-align: left;
   padding: 8px 32px 8px 0px;
   margin-left: 32px;
   border-top: solid 1px #EEEEEE;
}
.wy-rec-item {
  background-color: #fff;
  font-size: 12px;
}
.wy-rec-item[show="hide"] {
  display: none;
}
.wy-rec-item .mint-checklist .mint-checklist-label {
  text-align: left;
}
.wy-rec-item .mint-checklist .mint-cell,.wy-rec-item .mint-checklist .mint-cell .mint-cell-wrapper{
background-image:none;
padding: 0 0 0 10px;
}
.wy-rec-item .mint-checklist .mint-cell,.wy-rec-item .mint-checklist .mint-cell .mint-cell-wrapper .mint-checklist-label{
  padding: 0 0 0 10px;
  font-size: 14px;
}
.wy-rec-item-des >div {
  display: inline-block;
  vertical-align: top;
}
.wy-rec-icon{
  float: right;
  position: relative;
    top: 8px;
}
.wy-rec-item-money {
  width: 50px;
}
.wy-rec-item-time {
  width: calc(100% - 100px);
}
.wy-rec-item-money span,.wy-rec-item-time span {
  color: #999;
}
.wy-rec-item-money div,.wy-rec-item-time div{
  color:#333333;
  font-weight: 500;
}
.wy-rec-item-title {
  height: 48px;
    line-height: 48px;
    text-align: left;
    font-size: 16px;
    padding: 0 0 0 32px;
}
.wy-rec-mt-8 {
  margin-top: 8px;
}
.wy-rec .mint-tab-item-label {
  font-size: 16px;
}
.wy-rec-index-done-tabcon .wy-rec-item-title{
font-size: 14px;
padding: 0 0 0 32px;
}
.wy-rec-index-done-tabcon .wy-rec-item-des {
margin-left: 32px;
}
.wy-rec-icon.mint-cell-allow-right::after {
border: solid 1px #c8c8cd;
    border-bottom-width: 0;
    border-left-width: 0;
    width: 8px;
    height: 8px;
    top: 12px;
}
</style>

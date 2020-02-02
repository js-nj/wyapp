<template>
<div class="wy-rec">
  <mt-navbar v-model="selected">
    <mt-tab-item id="1">待缴账单</mt-tab-item>
    <mt-tab-item id="2">已缴账单</mt-tab-item>
  </mt-navbar>

  <!-- tab-container -->
  <mt-tab-container v-model="selected" style="height:calc(100% - 46px);">
    <mt-tab-container-item id="1">
      <div class="wy-rec-item" v-for="item in options">
        <mt-checklist
          v-model="item.value"
          :options="item.options">
        </mt-checklist>
        <div class="wy-rec-item-des">
          <div class="wy-rec-item-time">
            <span>时间</span>
            <div style="padding-top:2px;">2019年 9月-10月</div>
          </div>
          <div class="wy-rec-item-money">
            <span>总金额</span>
            <div style="padding-top:2px;">{{item.money}}</div>
          </div>
          <div class="wy-rec-icon" @click="gotoRecDetail(item)">></div>
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
        <mt-button class="wy-rec-button" type="primary" @click="postCreateOrder">去支付</mt-button>
      </div>
    </mt-tab-container-item>
    <mt-tab-container-item id="2">
      <div class="wy-rec-item wy-rec-mt-8" v-for="item in options">
        <div class="wy-rec-item-title">物业费</div>
        <div class="wy-rec-item-des">
          <div class="wy-rec-item-time">
            <span>时间</span>
            <div style="padding-top:2px;">2019年 9月-10月</div>
          </div>
          <div class="wy-rec-item-money">
            <span>金额</span>
            <div style="padding-top:2px;">{{item.money}}</div>
          </div>
          <div class="wy-rec-icon">></div>
        </div>
      </div>
    </mt-tab-container-item>
  </mt-tab-container>
</div>

</template>

<script>
import { Navbar, TabItem,TabContainer,TabContainerItem,Cell,Checklist,Radio,Button  } from 'mint-ui';
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
  },
  data () {
    return {
      allCheck: [],
      allMoney:666,
      selected:'1',
      chooseValue:[],
      options: [
        {
          time: '物业费2222',
          id:'',
          money: '1111',
          value:[],
          options:[{
            label: '物业费',
            value: '11111',
          }]
          // disabled: true
        },
        {
          time: '物业费2222',
          id:'',
          money: '1111',
          value:[],
          options:[{
            label: '物业费',
            value: '11111',
          }]
          // disabled: true
        },
      ]
    }
  },
  created(){
    document.title = '账单列表';
    this.getPayList();

  },
  watch:{
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
      }else {
        // console.log('else',this.options)
        this.options.forEach(function(item){
          item.value.pop();
        });
        this.allMoney = 0;
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
      },
      deep: true
    }
  },
  methods:{
    getPayList(){
      var param = {
        page:1,
        limit:10,
        ownerId:''
      };
      var that = this;
      utils.Get('getPayList',param).then(function(res){
        if (res.data.page.list && res.data.page.list.length>0) {
          that.options = [];
          res.data.page.list.forEach(function(item){
              var objTmp ={
                time: item.needPay,
                money: item.payNeed,
                wid:item.payNumber,
                value:[],
                options:[{
                  label: item.payItem,
                  value: item.payNeed,
                }]
              };
              that.options.push(objTmp);
          });
          // id (String, optional): id ,
          // propertyId (String, optional): 物业ID ,
          // companyId (String, optional): 公司ID ,
          // communityId (String, optional): 楼宇ID ,
          // ownerId (String, optional): 业主ID ,
          // typeId (String, optional): 类型ID ,
          // payNumber (String, optional): 单号 ,
          // payAddress (String, optional): 位置 ,
          // ownerName (String, optional): 联系人 ,
          // ownerMobile (String, optional): 电话 ,
          // needPay (String, optional): 应付时间 ,
          // orderId (String, optional): 排序ID ,
          // payStart (String, optional): 付款周期开始 ,
          // payEnd (String, optional): 付款周期结束 ,
          // payNeed (String, optional): 应付金额 ,
          // payItem (String, optional): 应收项目 ,
          // payType (String, optional): 收款方式 ,
          // payTime (String, optional): 实收时间 ,
          // payMoney (String, optional): 实收金额 ,
          // waiverAmount (String, optional): 减免金额 ,
          // payLeft (String, optional): 欠款金额 ,
          // payLeftReason (String, optional): 欠款原因 ,
          // payStatus (String, optional): 付款状态 ,
          // checkStatus (String, optional): 审核状态 ,
          // checkUser (String, optional): 审核人 ,
          // checkTime (String, optional): 审核时间 ,
          // remarks (String, optional): 备注
        }
        // that.list = res.data.page.list;
      });
    },
    postCreateOrder(){
      var param = {
        ids:'',
        redirectUrl:'http://www.waiqinzx.com/index.html#/recResult'
      };
      this.options.forEach(function(item){
        if (item.value[0]) {
          param.ids = param.ids + item.id + ',';
        }
      });

      utils.Post('postCreateOrder',param).then(function(res){
        if (res.data.code === 0) {

        }
      });
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
.wy-rec-button{
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
.wy-rec-item .mint-checklist .mint-checklist-label {
  text-align: left;
}
.wy-rec-item .mint-checklist .mint-cell,.wy-rec-item .mint-checklist .mint-cell .mint-cell-wrapper{
background-image:none;
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
    padding: 0 32px;
}
.wy-rec-mt-8 {
  margin-top: 8px;
}
</style>

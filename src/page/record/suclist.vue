<template>
<div class="wy-rec wy-rec-result" style="padding-top:32px;">
  <div>本次成功支付：</div>
   <div class="wy-rec-item wy-rec-mt-8" v-for="item in doneoptions">
    <div class="wy-rec-item-title">{{item.options[0].label}}</div>
    <div class="wy-rec-item-des">
      <div class="wy-rec-item-time">
        <span>时间</span>
        <div style="padding-top:2px;">{{item.time}}</div>
      </div>
      <div class="wy-rec-item-money">
        <span>金额</span>
        <div style="padding-top:2px;">{{item.money}}</div>
      </div>
      <!-- <div class="wy-rec-icon" @click="gotoRecDetail(item)">></div> -->
    </div>
  </div>
</div>

</template>

<script>
import {Cell } from 'mint-ui';
import * as utils from '../../utils';
export default {
  name: 'result',
  components: {
      [Cell.name]: Cell
  },
  data () {
    return {
      doneoptions:[],
      batchPaymentNo:''
    }
  },
  created(){
    document.title = '支付结果';
    // http://www.waiqinzx.com/index.html#/recSucList?ORDER_NO=202002051541391072&CODE=4&MSG=%E5%8F%96%E6%B6%88%E6%94%AF%E4%BB%98
    // if (window.location.href.indexOf('&MSG=')>-1 && window.location.href.split('&MSG=')[1]) {
    //   this.msg = decodeURI(window.location.href.split('&MSG=')[1]);
    // }
    // this.code = window.location.href.split('&CODE=')[1].split('&MSG=')[0];
    this.batchPaymentNo = window.location.href.split('batchPaymentNo=')[1];
    window.userInfo = JSON.parse(localStorage.getItem('_userInfo'));
    this.getPayList();
  },
  methods:{
    getPayList(){
      var that = this;
      var param = {
        page:1,
        limit:100,
        ownerId:window.userInfo.ownerId,
        batchPaymentNo:this.batchPaymentNo
        // payStatus:1
      };
      utils.Get('getPayList',param).then(function(res){
        if (res.data.page.list && res.data.page.list.length>0) {
          that.doneoptions = [];
          res.data.page.list.forEach(function(item){
              var objTmp ={
                time: item.payStart+' - '+item.payEnd,
                money: item.payMoney,
                id:item.id,
                value:[],
                options:[{
                  label: item.payItemName+'-'+item.communityName+'-'+item.payAddress,
                  value: item.payMoney,
                }]
              };
              that.doneoptions.push(objTmp);
          });
        }
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
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
.wy-rec .mint-tab-item-label {
  font-size: 16px;
}
</style>

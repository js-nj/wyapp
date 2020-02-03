<template>
<div class="wy-rec wy-rec-detail">
  <div>
    <img src="../../../static/images/success.jpg" />
    <div class="wy-rec-detail-title">支付成功</div>
  </div>
  <div style="padding:0 16px;background:#fff;">
    <mt-cell v-for="item in options" :title="item.title" :key="item.title" :value="item.value"></mt-cell>
  </div>

  <!-- <mt-cell title="标题文字" value="说明文字"></mt-cell> -->
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
      options: [{
        title:'支付方式',
        value:''
      },{
        title:'创建时间',
        value:''
      }
      // ,{
      //   title:'交易订单号',
      //   value:''
      // }
      ,{
        title:'商户订单号',
        value:''
      },{
        title:'家庭住址',
        value:''
      },{
        title:'缴纳费用项目',
        value:''
      },{
        title:'缴纳时段',
        value:''
      },{
        title:'费用金额',
        value:''
      },{
        title:'订单备注',
        value:''
      }]
    }
  },
  created(){
    // console.log(utils)
    // debugger;
    document.title = '账单详情';
    var param = {
      id:''
    };
    var that = this;
    param.id = this.$route.params.item.id;
    utils.Get('getPayInfo',param).then(function(res){
        if (res.data.code === 0 && res.data.wyPay) {
          // this.options = [];
          // for (var key in res.data.wyPay) {
          //   var tmpObj = {};
          //   tmpObj[key] = res.data.wyPay[key];
          //   this.options.push(tmpObj);
          // }
          that.$set(that.options,0,{
            title:'支付方式',
            value:res.data.wyPay.payTypeName
          });
          that.$set(that.options,1,{
            title:'创建时间',
            value:res.data.wyPay.createDate
          });
          // that.$set(that.options,2,{
          //   title:'交易订单号',
          //   value:res.data.wyPay.id
          // });
          that.$set(that.options,2,{
            title:'商户订单号',
            value:res.data.wyPay.payNumber
          });
          that.$set(that.options,3,{
            title:'家庭住址',
            value:res.data.wyPay.payAddress
          });
          that.$set(that.options,4,{
            title:'缴纳费用项目',
            value:res.data.wyPay.payItemName
          });
          that.$set(that.options,5,{
            title:'缴纳时段',
            value:res.data.wyPay.needPayTime
          });
          that.$set(that.options,6,{
            title:'费用金额',
            value:res.data.wyPay.payMoney
          });
          that.$set(that.options,7,{
            title:'订单备注',
            value:res.data.wyPay.remarks
          });
          // this.options =
          // "id": "bddcd5cf78e3475bbedee8c2895ab0e5",
          // "propertyId": "998bac69aeb0e363a455b28c32b3cfa9",
          // "communityId": "8a59832ab1e0c8ef236dde5f8c978f71",
          // "ownerId": "7538cab87a164e48c9e9cce6d83663d4",
          // "houseId": "3",
          // "payNumber": "",
          // "ePayNumber": null,
          // "payAddress": "A组/1幢/1单元/101室",
          // "ownerName": "小通",
          // "ownerMobile": "17712852616",
          // "needPayTime": null,
          // "orderId": null,
          // "payStart": "2020-01",
          // "payEnd": "2020-02",
          // "payMoney": 10,
          // "payItem": "1",
          // "payItemName": "物业费",
          // "payType": null,
          // "payTypeName": null,
          // "payTime": null,
          // "payStatus": 1,
          // "payStatusName": "待收费",
          // "remarks": "123",
          // "createBy": "1",
          // "createDate": "2020-01-29 11:54:08",
          // "updateBy": "1",
          // "updateDate": "2020-01-29 11:54:08",
          // "delFlag": "0",
          // "epayNumber": null
        }
        // that.list = res.data.page.list;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.wy-rec-detail {
  text-align: left;
    /*padding: 0 16px;*/
    background: #fff;
    font-size: 14px !important;
    background-color: #F7F7F7
}
.wy-rec-detail .mint-cell-wrapper {
font-size: 14px;
background-image: linear-gradient(180deg, #d9d9d9, #eee 50%, transparent 50%);
margin: 0 auto;
/*display: block;*/
}
.wy-rec-detail .mint-cell:first-child .mint-cell-wrapper {
  background-image: none;
}
.wy-rec-detail .mint-cell .mint-cell-wrapper .mint-cell-text{
  color: #666;
}
.wy-rec-detail .mint-cell .mint-cell-wrapper .mint-cell-value{
  color: #333;
}
.wy-rec-detail-title {
width:56px;
margin: 0 auto;
height:14px;
font-size:14px;
font-family:PingFang-SC-Medium,PingFang-SC;
font-weight:500;
color:rgba(24,136,255,1);
line-height:14px;
padding-top: 12px;
}
.wy-rec-detail img {
  display: block;
  width: 60px;
  margin:0 auto;
}
.wy-rec-detail > div:first-child {
  background-color: #f7f7f7;
  padding: 16px 0;
}
</style>

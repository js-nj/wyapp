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
        value:'123'
      },{
        title:'创建时间',
        value:'34'
      },{
        title:'交易订单号',
        value:'6'
      },{
        title:'商户订单号',
        value:'7'
      },{
        title:'家庭住址',
        value:'8'
      },{
        title:'缴纳费用项目',
        value:'9'
      },{
        title:'缴纳时段',
        value:'09'
      },{
        title:'费用金额',
        value:'08'
      },{
        title:'订单备注',
        value:'07'
      }]
    }
  },
  created(){
    // console.log(utils)
    // debugger;

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

<template>
<div class="wy-rec wy-rec-result" style="padding-top:32px;">
  <div v-if="code == '0' ||code === 0">
    <img src="../../../static/images/wy/success.png" style="width:70px;" />
    <div class="wy-rec-detail-title" style="height:40px;">支付成功</div>
  </div>
  <div v-else>
    <img src="../../../static/images/wy/fail.png" style="width:70px;" />
    <div class="wy-rec-detail-title" style="height:40px;color:#f96868;">支付失败</div>
  </div>
  <!-- <div style="padding:0 16px;background:#fff;text-align:left;">
    <mt-cell  title="支付号"  :value="order_no"></mt-cell>
  </div> -->
  <mt-button class="wy-rec-result-button" type="primary" @click="gotoRecIndex">返回</mt-button>
</div>

</template>

<script>
import {Cell,Button } from 'mint-ui';
import * as utils from '../../utils';
export default {
  name: 'result',
  components: {
      [Cell.name]: Cell,
      [Button.name]: Button,
  },
  data () {
    return {
      msg:'',
      code:'',
      order_no:'',
    }
  },
  created(){
    document.title = '支付结果';
    // http://www.waiqinzx.com/index.html#/recSucList?ORDER_NO=202002051541391072&CODE=4&MSG=%E5%8F%96%E6%B6%88%E6%94%AF%E4%BB%98
    if (window.location.href.indexOf('&MSG=')>-1 && window.location.href.split('&MSG=')[1]) {
      this.msg = decodeURI(window.location.href.split('&MSG=')[1]);
    }
    this.code = window.location.href.split('&CODE=')[1].split('&MSG=')[0];
    this.order_no = window.location.href.split('ORDER_NO=')[1].split('&CODE=')[0];
  },
  methods:{
    gotoRecIndex(){
      this.$router.push({
        // name:'recIndex',
        name:'index',
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.wy-rec-result-button{
  font-size: 16px;
      width: 80%;
    margin: 32px auto;
    display: block;
}
</style>

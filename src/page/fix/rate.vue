<template>
<div class="wy-fix-rate">
  <div class="wy-fix-rateItem" style="">
    <div class="wy-fix-rate-head">
      <img  style="width:20px;height:20px;" src="../../../static/images/wy/kjbx.png" />
      <span class="wy-fix-rate-title">维修</span>
      <label class="wy-fix-rate-status" style="color:#333;">已完成</label>
    </div>
    <div class="wy-fix-rate-content">
      3楼洗脸台下面的开关坏了，需要师傅重新换一下，材料已经买好，请师傅上户处理。
    </div>
  </div>
  <div class="wy-fix-rateItem" style="">
    <div class="wy-fix-rate-head">
      <span class="wy-fix-rate-title">评价</span>
      <div class="wy-fix-rate-levs">
        <label class="wy-fix-rate-lev">好评</label>
        <label class="wy-fix-rate-lev">中评</label>
        <label class="wy-fix-rate-lev">差评</label>
      </div>
    </div>
    <mt-field label="" placeholder="这里可以填写详细评价哦" type="textarea" rows="4" v-model="introduction"></mt-field>

  </div>
  <mt-button class="wy-fix-rate-button" type="primary" @click="">确认提交</mt-button>
</div>

</template>

<script>
import { Field,Button  } from 'mint-ui';
import * as utils from '../../utils';
export default {
  name: 'detail',
  components: {

      [Field.name]: Field,
      [Button.name]: Button,
  },
  data () {
    return {
      introduction:''
    }

  },
  created(){
    // console.log(utils)
    // debugger;
    this.$nextTick(()=>{

    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.wy-fix-rate-button{
  font-size: 16px;
  width: 90%;
  margin: 24px auto 0;
  display: block;
}
.wy-fix-rateItem .mint-cell-wrapper {
  background-image: none;

}
.wy-fix-rateItem {
    background: #fff;
    padding: 16px 24px;
    text-align: left;
    line-height: 1;
    margin-bottom: 12px;
}
.wy-fix-rate-head {
    padding-bottom: 16px;
        line-height: 20px;
    border-bottom: solid 1px #ddd;
}
.wy-fix-rate-title {
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
    font-weight: 600;
    color: rgba(51,51,51,1);
}
.wy-fix-rate-status {
    font-size: 14px;
    float: right;
    font-weight: 500;
    color: rgba(55,137,249,1);
}
.wy-fix-rate-content{
  padding: 16px 0;
  font-size:14px;
font-weight:500;
color:rgba(153,153,153,1);
line-height:22px;
}
.wy-fix-rate-levs {
  display: inline-block;
  vertical-align: top;
  font-size:12px;
  color:rgba(170,170,170,1);
  padding-left: 32px;
}
.wy-fix-rate-levs .wy-fix-rate-lev {
  display: inline-block;
  vertical-align: top;
  padding: 0 8px;
}
</style>

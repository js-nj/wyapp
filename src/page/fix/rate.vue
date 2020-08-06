<template>
<div class="wy-fix-rate">
  <div class="wy-fix-rateItem" style="">
    <div class="wy-fix-rate-head">
      <img  style="width:20px;height:20px;" src="../../../static/images/wy/kjbx_tmp.png" />
      <span class="wy-fix-rate-title">{{serviceTypeName}}</span>
      <label class="wy-fix-rate-status" style="color:#333;">{{status}}</label>
    </div>
    <div class="wy-fix-rate-content">
      {{serviceContent}}
    </div>
  </div>
  <div class="wy-fix-rateItem" style="">
    <div class="wy-fix-rate-head">
      <span class="wy-fix-rate-title">评价</span>
      <div class="wy-fix-rate-levs">
        <label class="wy-fix-rate-lev wy-fix-ratelev-select" level="1">
          <img class="fix-img-rate" src="../../../static/images/wy/pj_hp.png" />
          <img class="fix-img-rate-select" src="../../../static/images/wy/pj_hp_select.png" />
          <span class="fix-rate-span">好评</span>
        </label>
        <label class="wy-fix-rate-lev" level="2">
          <img class="fix-img-rate" src="../../../static/images/wy/pj_zp.png" />
          <img class="fix-img-rate-select" src="../../../static/images/wy/pj_zp_select.png" />
          <span class="fix-rate-span">中评</span>
        </label>
        <label class="wy-fix-rate-lev" level="3">
          <img class="fix-img-rate" src="../../../static/images/wy/pj_cp.png" />
          <img class="fix-img-rate-select" src="../../../static/images/wy/pj_cp_select.png" />
          <span class="fix-rate-span">差评</span>
        </label>
      </div>
    </div>
    <mt-field label="" placeholder="这里可以填写详细评价哦" type="textarea" rows="4" v-model="introduction"></mt-field>

  </div>
  <mt-button class="wy-fix-rate-button" :disabled="disabled" type="primary" @click="postWyserviceEvaluate">确认提交</mt-button>
</div>

</template>

<script>
import { Field,Button,Toast,Indicator  } from 'mint-ui';
import * as utils from '../../utils';
import $ from "jquery";
export default {
  name: 'detail',
  components: {

      [Field.name]: Field,
      [Button.name]: Button,
      [Toast.name]: Toast,
      [Indicator.name]: Indicator,
  },
  data () {
    return {
      disabled:false,
      introduction:'',
      level:'1',
      serviceStatus:this.$route.params.serviceStatus,
      status:this.$route.params.status,
      serviceContent:this.$route.params.serviceContent,
      serviceTypeName:this.$route.params.serviceTypeName,
    }

  },
  created(){
    var that = this;
    document.title = '报修评价';
    // param.id = this.$route.params.id;
    this.$nextTick(()=>{
      $('.wy-fix-rate-lev','.wy-fix-rate-levs').on('click', function (ele) {
            // debugger;
            that.level = $(this).attr('level');
            $(this).addClass('wy-fix-ratelev-select').siblings('.wy-fix-ratelev-select').removeClass('wy-fix-ratelev-select');
        });
    })
  },
  methods:{
    postWyserviceEvaluate(){
      var that = this;
      var param = {
        id : this.$route.params.id ,
        evaluateLevel : this.level ,
        evaluateContent : this.introduction ,
        ownerId : window.userInfo.ownerId
      };
      if (!that.disabled) {
        that.disabled = true;
        Indicator.open();
        utils.Post('postWyserviceEvaluate',param).then(function(res){
          Indicator.close();
          if (res.data.code == 0) {
            // that.disabled = false;
            Toast('评价成功');
            window.history.go(-1);
          }else {
            Toast('评价失败');
          }
        });
      }
    }
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
  padding-left: 24px;
}
.wy-fix-rate-levs .wy-fix-rate-lev {
  display: inline-block;
  vertical-align: top;
  padding: 0 8px;
}
.wy-fix-rate-levs .wy-fix-rate-lev img{
  width: 20px;
  /*display: inline-block;*/
  vertical-align: top;
}
.wy-fix-rate-lev .fix-img-rate{
  display: inline-block;
}
.wy-fix-rate-lev .fix-img-rate-select{
  display: none;
}
.wy-fix-rate-lev.wy-fix-ratelev-select .fix-img-rate{
  display: none;
}
.wy-fix-rate-lev.wy-fix-ratelev-select .fix-img-rate-select{
  display: inline-block;
}
.fix-rate-span {
  display: inline-block;
  padding-left: 4px;
}
.wy-fix-rate-lev.wy-fix-ratelev-select .fix-rate-span{
  color:#EA521F;
}
</style>

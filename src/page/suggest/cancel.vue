<template>
<div class="wy-sug-cancel">
  <div>撤销原因</div>
  <div class="wy-cancel-textarea">
    <mt-field label="" placeholder="请输入撤销的原因" type="textarea" rows="4" v-model="introduction"></mt-field>
  </div>
  <mt-button class="wy-sug-button" type="primary" :disabled="disabled" @click="postWyOpitionCancel">确认撤销</mt-button>
</div>

</template>

<script>
import { Field,Button,Toast,Cell,Indicator} from 'mint-ui';
// import utils from '../utils.js';
import * as utils from '../../utils';
import $ from "jquery";
export default {
  name: 'detail',
  data () {
    return {
      introduction:'',
      id:'',
      disabled:false
    }
  },
  components:{
    [Field.name]:Field,
    [Button.name]:Button,
    [Toast.name]:Toast,
    [Cell.name]:Cell,
    [Indicator.name]:Indicator
  },
  watch:{

  },
  created(){
    document.title = '提交建议';
    // var that = this;
    this.id = this.$route.params.id;
  },
  methods:{
    postWyOpitionCancel(){
      var that = this;
      var param = {
        id:that.id,// 物业ID ,
        returnContent:that.introduction,
      };
      if (!that.disabled) {
        that.disabled = true;
        Indicator.open();
        utils.Post('postWyoptionCancel',param).then(function(res){
          Indicator.close();
          if (res.data.code ==0) {
            Toast('撤销成功~');
            window.history.go(-1);
          }else {
            Toast('撤销失败,'+res.data.msg+'！');
          }
          // that.list = res.data.page.list;
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.wy-sug-cancel {
  padding-top: 16px;
}
.wy-sug-body {
  margin:8px 0 16px 0;
  padding:8px 16px;
  text-align:left;
  background: #fff;
}
.wy-sug-name {
  /*width:97px;*/
/*height:20px;*/
font-size:16px;
font-family:PingFang-SC-Medium,PingFang-SC;
font-weight:500;
color:rgba(85,85,85,1);
line-height:20px;
padding-bottom: 12px;
}
.wy-sug-types span {
  display: inline-block;
      padding: 2px 8px;
  margin-right: 8px;
  color: #3789F9;
  border: solid 1px #3789F9;
  border-radius: 2px;
  font-size: 12px;
}
.wy-sug-types span.wy-sug-type{
  background: #3789F9;
  color: #fff;
}
.wy-cancel-textarea{
  padding: 16px;
}
.wy-cancel-textarea .mint-cell {
   /*background-color: #F6F8FA;*/
}
.wy-cancel-textarea .mint-field.is-textarea textarea{
 /*background-color: #F6F8FA;*/
 padding-left: 8px;
}
.wy-cancel-textarea .mint-field.is-textarea textarea::-webkit-input-placeholder { /* WebKit browsers */
  color: #bbb;
  font-size: 14px;
}
.wy-cancel-textarea .mint-field.is-textarea .mint-cell-wrapper{
  /*background-image: none;*/
  padding: 0;
  border: solid 1px #d9d9d9;
}
.wy-cancel-textarea .mint-field.is-textarea .mint-cell-wrapper .mint-cell-value{
  padding: 8px 0;
}
.wy-sug-button{
  font-size: 16px;
      width: 80%;
    margin: 0 auto;
    display: block;
}
.wy-sug-body .wy-select-problem .mint-cell-wrapper{
padding: 0;
}
.wy-sug-body .wy-select-problem .mint-cell-wrapper .mint-cell-title {
  padding-left: 0;
}
</style>

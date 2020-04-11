<template>
<div class="wy-sug-cancel wy-reply-detail">
  <div class="wy-sug-item-hide">
    <div>
      <span>{{item.typeName}}单号</span>
      <div>{{item.opinionNumber}}</div>
    </div>
    <div>
      <span>{{item.typeName}}住户</span>
      <div>{{item.ownerName}}</div>
    </div>
    <div>
      <span>{{item.typeName}}手机</span>
      <div>{{item.ownerMobile}}</div>
    </div>
    <div>
      <span>{{item.typeName}}时间</span>
      <div>{{item.createDate}}</div>
    </div>

    <div>
      <span>{{item.typeName}}内容</span>
      <div>{{item.opinionContent}}</div>
    </div>
    <div v-if="item.imgUrl" style="height:60px;text-align: left;">
      <span>{{item.typeName}}图片</span>
      <div class="wy-sug-det-desitemimgs post">
        <img v-if="src" :src="src" v-for="src in (item.imgUrl.split(','))" class="wy-sug-det-desitemimg" />
      </div>
    </div>
    <!-- <mt-button class="wy-sug-list-but" v-if="item.opinionStatus == '1'" type="primary" size="small" @click="gotoCancel(item.id)">撤销</mt-button> -->
    <div v-if="item.opinionStatus == '0'">
      <span>撤销原因</span>
      <div>{{item.returnContent}}</div>
    </div>

    <template v-if="item.opinionStatus == '3' || item.opinionStatus == '4'">
      <div>
        <span>回复内容</span>
        <div>{{item.repairContent}}</div>
      </div>
      <div>
        <span>回复时间</span>
        <div>{{item.repairTime}}</div>
      </div>
    </template>
  </div>
  <div v-if="item.opinionStatus == '1' && roleWygj">
    <div class="wy-cancel-textarea">
      <mt-field label="" placeholder="请输入要回复的内容" type="textarea" rows="4" v-model="introduction"></mt-field>
    </div>
    <mt-button class="wy-sug-button" :disabled="disabled" type="primary" @click="postWyopinionreplay">确认回复</mt-button>
  </div>
</div>

</template>

<script>
import { Field,Button,Toast,Cell} from 'mint-ui';
// import utils from '../utils.js';
import * as utils from '../../utils';
import $ from "jquery";
export default {
  name: 'detail',
  data () {
    return {
      disabled:false,
      introduction:'',
      roleWygj:false,
      id:'',
      item:{
        typeName:'',
        opinionNumber:'',
        opinionContent:'',
        imgUrl:'',
        opinionStatus:'',
        returnContent:'',
        repairContent:'',
        repairTime:''
      }
    }
  },
  components:{
    [Field.name]:Field,
    [Button.name]:Button,
    [Toast.name]:Toast,
    [Cell.name]:Cell,
  },
  watch:{

  },
  created(){
    document.title = '详情';
    if (window.location.href.indexOf('org=msg')>-1) {
      this.id = window.location.href.split('id=')[1].split('&org=msg')[0];
    } else {
      this.id = window.location.href.split('id=')[1];
    }
    // this.id = window.location.href.split('id=')[1];
    window.userInfo = JSON.parse(localStorage.getItem('_userInfo'));
    if (window.userInfo.pushTypeId && window.userInfo.pushTypeId.indexOf('2')>-1) {
      this.roleWygj = true
    }
    this.getWyopinioninfo();
  },
  methods:{
    getWyopinioninfo(){
      var that = this;
      var param = {
        id:that.id
      };
      utils.Get('getWyopinioninfo',param).then(function(res){
        if (res.data.code ==0) {
          that.item = res.data.wyOpinion;
        }else {
          Toast('获取投诉详情失败,'+res.data.msg+'！');
        }
        // that.list = res.data.page.list;
      });
    },
    postWyopinionreplay(){
      var that = this;
      var param = {
        id:that.id,
        repairContent:that.introduction,
        repairUserId:window.userInfo.ownerId

      };
      if (!that.disabled) {
        that.disabled = true;
        utils.Post('postWyopinionreplay',param).then(function(res){
          if (res.data.code ==0) {
            Toast('保存成功~');
            if (window.location.href.indexOf('org=msg')>-1) {
              // debugger;
              window.history.go(0);
              // window.reload()
              // window.location.href = window.location.href+'&repeat';
            } else {
              window.history.go(-1);
            }
            // window.history.go(-1);
          }else {
            Toast('保存失败,'+res.data.msg+'！');
          }
          // that.list = res.data.page.list;
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wy-reply-detail .wy-sug-item-hide{
  text-align: left;
      padding: 16px 16px;
    background: #fff;
}
.wy-sug-det-desitemimgs{
display: inline-block;
    /* position: relative; */
    /* top: 100%; */
    float: right;
    position: relative;
    top: 2px;
    left: 6px;
    /* overflow: hidden; */
    /*width: 200px;*/
    width: calc(100% - 70px);
}
.wy-sug-det-desitemimg {
  width: 50px;
  height: 50px;
  display: inline-block;
  margin-right: 4px;
}
.wy-reply-detail .wy-sug-item-hide >div >span {
  display: inline-block;
  vertical-align: top;
  padding-right: 8px;
}
.wy-reply-detail .wy-sug-item-hide >div >div {
 display: inline-block;
  vertical-align: top;
      width: calc(100% - 70px);
}
.wy-sug-cancel {
  /*padding-top: 16px;*/
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

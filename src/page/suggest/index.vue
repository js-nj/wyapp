<template>
<div class="wy-sug">
  <div>
    <img style="width: 100%;" src="../../../static/images/feedback.jpg" />
  </div>
  <div class="wy-sug-body" style="">
    <p class="wy-sug-name">请选择反馈类型</p>
    <div class="wy-sug-types">
      <span class="wy-sug-type">投诉</span>
      <span>建议</span>
      <span>表扬</span>
    </div>
    <div class="wy-sug-textarea">
      <mt-field label="" placeholder="请输入您要反馈的内容" type="textarea" rows="4" v-model="introduction"></mt-field>
    </div>
    <div style="padding: 12px 0;">
      <p class="wy-sug-name">添加图片（可选）</p>
      <div class="wy-sug-index">
        <img src="" class="show" style="width:60px;height:60px;display:none;" />
        <img style="width: 65px;" src="../../../static/images/addimage.jpg" />
        <input id="imageFile1"  name="imageFile" onchange="changepic(this,'wy-sug-index')" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" />
      </div>
    </div>
  </div>
  <mt-button class="wy-sug-button" type="primary" @click="postWyOpitionSave">确认提交</mt-button>
</div>

</template>

<script>
import { Field,Button,Toast } from 'mint-ui';
// import utils from '../utils.js';
import * as utils from '../../utils';
import $ from "jquery";
export default {
  name: 'detail',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      introduction:''
    }
  },
  components:{
    [Field.name]:Field,
    [Button.name]:Button,
    [Toast.name]:Toast
  },
  created(){
    this.$nextTick(function(){
        $('span','.wy-sug-types').on('click', function (ele) {
            // debugger;
            // that.tabId = $(this).attr('tabid');
            $(this).addClass('wy-sug-type').siblings('.wy-sug-type').removeClass('wy-sug-type');
        });
        // that.getGgList();
    });

  },
  methods:{
    gotoSugList(){
      this.$router.push({
        name:'sugList'
      })
    },
    postWyOpitionSave(){
      var imageFile = $("#imageFile1").val();
      if(imageFile && imageFile.length > 0){
        var formData = new FormData();
        formData.append("file", $("#imageFile1")[0].files[0]);
        $.ajax({
            url:window.hostPath+"/app/upload/img",
            type:"post",
            data:formData,
            dataType:"json",
            // 告诉jQuery不要去处理发送的数据
            processData: false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType: false,
            beforeSend: function () {
               console.log("正在进行，请稍候");
            },
            success:function(data){
                if(data.code == 0){
                  var param = {
                    propertyId :'',// 物业ID ,
                    companyId :'',// 公司ID ,
                    communityId :'',// 楼宇ID ,
                    ownerId : '',//业主ID ,
                    typeId : '',//类型ID ,
                    opinionContent : this.introduction,//投诉内容 ,
                    imgUrl : '',//图片地址（多个以逗号隔开）
                  };
                  utils.Get('postWyOpinionSave',param).then(function(res){
                    if (res.data.code ==0) {
                      Toast('提交成功~');
                    }else {
                      Toast('提交失败,'+res.data.msg+'！');
                    }
                    // that.list = res.data.page.list;
                  });
                }else{
                  alert(data.msg)
                    // $("#imageForm").submit();
                }
            }
        })
      }else {
        var param = {
          propertyId :'',// 物业ID ,
          companyId :'',// 公司ID ,
          communityId :'',// 楼宇ID ,
          ownerId : '',//业主ID ,
          typeId : '',//类型ID ,
          opinionContent : this.introduction,//投诉内容 ,
          imgUrl : '',//图片地址（多个以逗号隔开）
        };
        utils.Get('postWyOpinionSave',param).then(function(res){
          if (res.data.code ==0) {
            Toast('提交成功~');
          }else {
            Toast('提交失败,'+res.data.msg+'！');
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
#imageFile1 {
      /* margin-left: 40px; */
    /* display: inline-block; */
    /* height: 34px; */
    /* visibility: hidden; */
    position: absolute;
    /* top: -29px; */
    width: 60px;
    height: 60px;
    left: 0px;
    opacity: 0;
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
font-size:13px;
font-family:PingFang-SC-Medium,PingFang-SC;
font-weight:500;
color:rgba(85,85,85,1);
line-height:20px;
padding-bottom: 12px;
}
.wy-sug-types span {
  display: inline-block;
  padding:0px 4px;
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
.wy-sug-textarea{
  padding-top: 12px;
}
.wy-sug-textarea .mint-cell {
   /*background-color: #F6F8FA;*/
}
.wy-sug-textarea .mint-field.is-textarea textarea{
 /*background-color: #F6F8FA;*/
}
.wy-sug-textarea .mint-field.is-textarea textarea::-webkit-input-placeholder { /* WebKit browsers */
  color: #bbb;
  font-size: 14px;
}
.wy-sug-textarea .mint-field.is-textarea .mint-cell-wrapper{
  /*background-image: none;*/
  padding: 0;
  border-bottom: solid 1px #d9d9d9;
}
.wy-sug-textarea .mint-field.is-textarea .mint-cell-wrapper .mint-cell-value{
  padding: 8px 0;
}
.wy-sug-button{
  font-size: 16px;
      width: 80%;
    margin: 0 auto;
    display: block;
}
</style>

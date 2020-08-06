<template>
  <div class="wy-ma-post">
    <div class="wy-ma-post-body" style="margin-left: -32px;">
      <mt-field label="标题" placeholder="公告标题" type="textarea" rows="2" v-model="title"></mt-field>
      <mt-radio
        class="wy-ma-radio"
        title="选项"
        v-model="radiovalue"
        align="left"
        :options="options">
      </mt-radio>
      <mt-field v-if="radiovalue == 'nr'" label="内容" placeholder="公告内容" type="textarea" rows="12" v-model="content"></mt-field>
      <mt-field v-if="radiovalue == 'wz'" label="网址" placeholder="网址链接" type="textarea" rows="3" v-model="cmsUrlUrl"></mt-field>
      <div class="a" style="padding: 16px 24px;text-align: left;background:#fff;">
        <span style="display: inline-block;padding: 12px 24px 12px 26px;">图片</span>
        <div id="wy-imgs-upload" style="display:inline-block;vertical-align:top;"></div>
        <div class="upload_item" v-for="(item,index) in gguploadImgs">
          <i class="iconfont icon-weiwancheng cancel_upload_img" @click="ggdeleteImg(index)"></i>
          <img class="upload_img" :src="item" alt="">
        </div>
        <div id="wy-ma-postimgs" class="upload_item">
          <img class="upload_img" id="uploaderBox" style="width:65px;" src="../../../static/images/upload.png" alt="无" >
        </div>
      </div>
      <div class="wy-ma-switch">
        <span style="">轮播</span>
        <mt-switch v-model="isLb"></mt-switch>
        <span>{{isLb_dispaly}}</span>
      </div>
    </div>
    <mt-button class="wy-sug-button" :disabled="disabled" type="primary" @click="postAnnounce">提交</mt-button>
  </div>

</template>
<script>
  import { Toast,Indicator,Button,MessageBox,Switch,Field,Radio } from 'mint-ui';
  import * as utils from '../../utils';
  import $ from "jquery";
  export default {
  name: 'index',
  components: {
      [Toast.name]: Toast,
      [Indicator.name]: Indicator,
      [Button.name]: Button,
      [MessageBox.name]: MessageBox,
      [Switch.name]: Switch,
      [Field.name]: Field,
      [Radio.name]: Radio,
  },
  data () {
    return {
      isLb:false,
      // isContent:false
      isLb_dispaly:'否',
      title:'',
      content:'',
      cmsUrlUrl:'',
      gguploadImgs:[],
      disabled:false,
      announceId:'',
      radiovalue:'',
      options:[
        {
          label: '内容',
          value: 'nr'
        },
        {
          label: '网址',
          value: 'wz'
        }
      ]
    }
  },
  beforeCreate(){

  },
  created(){
    window.userInfo = JSON.parse(localStorage.getItem('_userInfo'));
    if (window.location.href.indexOf('id=')>-1) {
      document.title = '编辑公告';
      this.announceId = window.location.href.split('id=')[1];
      this.getGgDetail();
    }else {
      document.title = '新增公告';
    }
    this.$nextTick(function(){
        $("#uploaderBox").on("click", function(e) {
           var newFileInput = "<input id='uploaderInput' type='file' name='imageFile' accept='image/*' multiple />";
           $(this).parent().append($(newFileInput));
           $("#uploaderInput").bind("change", function(e){
             //onFileUploaded(e);预览等操作
             $(this).removeAttr("id");
             changepic(this,'.wy-ma-post')
           });
           $("#uploaderInput").click();
        });
    });
  },
  watch:{
    isLb(val){
      if (val) {
        this.isLb_dispaly = '是';
      } else {
        this.isLb_dispaly = '否';
      }
    },
    radiovalue(val){

    }
  },
  methods:{
    ggdeleteImg(index){
      this.gguploadImgs.splice(index,1);
    },
    htmlDecodeByRegEx(str){
         var temp = "";
         if(!str || str.length == 0) return "";
         temp = str.replace(/&amp;/g,"&");
         temp = temp.replace(/&lt;/g,"<");
         temp = temp.replace(/&gt;/g,">");
         temp = temp.replace(/&nbsp;/g," ");
         temp = temp.replace(/&#39;/g,"\'");
         temp = temp.replace(/&quot;/g,"\"");
         temp = temp.replace(/&ldquo;/g,"\“");
         temp = temp.replace(/&rdquo;/g,"\”");
         return temp;
    },
    getGgDetail(){
      var that = this;
      var param = {
        id:that.announceId
      };
      utils.Get('getGgDetail',param).then(function(res){
        // console.log('res----',res)
        if (res.data.code === 0) {
          that.title = that.htmlDecodeByRegEx(res.data.wyCms.cmsTitle);
          that.isLb = res.data.wyCms.isCarousel=='1'?true:false;
          if (res.data.wyCms.cmsImgUrl) {
            that.gguploadImgs = res.data.wyCms.cmsImgUrl.split(',');
          }
          if (res.data.wyCms.cmsUrlUrl) {
            that.radiovalue = 'wz';
            that.cmsUrlUrl = res.data.wyCms.cmsUrlUrl;
          } else {
            that.radiovalue = 'nr';
            that.content = that.htmlDecodeByRegEx(res.data.wyCms.cmsContent);
          }
        }

        // that.list = res.data.page.list;
      });
    },
    postAnnounce(){
      var that = this;
      if (!that.disabled) {
        var imageFile = $("#wy-ma-postimgs").find('input');
        var param = {
          propertyId: window.userInfo.propertyId,
          communityId: window.userInfo.communityEntityList[0].id,
          cmsTitle: this.title ,
          cmsContent: this.content ,
          cmsImgUrl: '' ,
          cmsUrlUrl:this.cmsUrlUrl,
          isCarousel: this.isLb?'1':'0'
        };
        if (!that.title) {
          Toast('请填写标题！');
          return;
        }
        if (!that.radiovalue) {
          Toast('请选择选项！');
          return;
        }
        if (!that.cmsUrlUrl && !that.content) {
          Toast('请填写内容或者网址！');
          return;
        }
        that.disabled = true;
        if(imageFile && imageFile.length > 0){
          Indicator.open();
          sendMoreRequest("#wy-ma-postimgs",function(res){
            console.log('res~~',res)
            if (that.gguploadImgs.length>0) {
              param.cmsImgUrl = res.concat(that.gguploadImgs).join(',');
            }else {
              param.cmsImgUrl = res.join(',');//图片地址（多个以逗号隔开）
            }
            if (that.announceId) {
              param.id = that.announceId;
              utils.Post('updateGgitem',param).then(function(res){
                Indicator.close();
                if (res.data.code == 0) {
                  Toast('提交成功！');
                  history.go(-1);
                } else {
                  Toast('提交失败,'+res.data.msg+'！');
                }
              });
            } else {
              utils.Post('saveGgitem',param).then(function(res){
                Indicator.close();
                if (res.data.code == 0) {
                  Toast('提交成功！');
                  history.go(-1);
                } else {
                  Toast('提交失败,'+res.data.msg+'！');
                }
              });
            }
          });
        }else {
          if (that.gguploadImgs.length>0) {
            param.cmsImgUrl = that.gguploadImgs.join(',');
          }
          if (that.announceId) {
              param.id = that.announceId;
              Indicator.open();
              utils.Post('updateGgitem',param).then(function(res){
                Indicator.close();
                if (res.data.code == 0) {
                  Toast('提交成功！');
                  history.go(-1);
                } else {
                  Toast('提交失败,'+res.data.msg+'！');
                }
              });
            } else {
              Indicator.open();
              utils.Post('saveGgitem',param).then(function(res){
                Indicator.close();
                if (res.data.code == 0) {
                  Toast('提交成功！');
                  history.go(-1);
                } else {
                  Toast('提交失败,'+res.data.msg+'！');
                }
              });
            }
        }
      }
    },
  }
}
</script>
<style scoped>
.wy-sug-button{
  font-size: 16px;
      width: 80%;
    margin: 16px auto;
    display: block;
}

.upload_item {
        display: inline-block;
        width: 60px;
        height: 60px;
        margin: 0px 8px 12px 0;
        position: relative;
        vertical-align: top;
    }
    .upload_item_none{
        line-height: 60px;
        margin: 0;
    }
    .cancel_upload_img {
        position: absolute;
        top: -13px;
        right: -7px;
        font-size: 18px;
    }
    .upload_img {
        width: 60px;
        height: 60px;
    }
</style>
<style>
.wy-ma-switch  .mint-switch{
  display: inline-block !important;
  vertical-align: middle;
}
.wy-ma-post .mint-field-core{
  box-shadow: 0px 0px 3px 0px #ddd;
}
#wy-ma-postimgs input {
  position: absolute;
  top: 0;
  right: 0;
  z-index:-1;
}
.wy-ma-post .wy-ma-radio>.mint-cell {
  background-image: none !important;
}
.wy-ma-post .wy-ma-radio>.mint-cell .mint-cell-wrapper {
  background-image: none !important;
}
.wy-ma-radio {
  position: relative;
  background-color: #fff;
  border-bottom: solid 1px #ddd;
}
.wy-ma-radio > .mint-cell {
      display: inline-block;
      background-image: none;
}
/*.wy-ma-radio >>> .mint-cell-title {
  text-align: left;
    padding-left: 22%;
}
.wy-ma-radio >>> .mint-radiolist-label{
  display: inline-block;
}*/
.wy-ma-radio > .mint-radiolist-title {
      position: absolute;
    left: 4%;
    width: 80px;
    z-index: 1;
    padding: 8px 20px;
    font-size: 16px;
    color: #333;
}
.wy-ma-post-body > a {
  border-bottom:solid 1px #ddd;
}
.wy-ma-post-body > div.a {
  border-bottom:solid 1px #ddd;
}
.wy-ma-switch{
  text-align: left;
    padding: 8px 0 8px 45px;
    background: #fff;
}
.wy-ma-switch >span:first-child {
  padding-right: 16px;
  padding-left: 4px;
}
#wy-ma-postimgs{
  display: inline-block;
    vertical-align: top;
    position: relative;
}
</style>

<template>
<div class="wy-sug">
  <div>
    <img style="width: 100%;" src="../../../static/images/feedback.jpg" />
  </div>
  <div class="wy-sug-body" style="">
    <div v-if="grfpslots[0].values.length>1" @click="grfpshowSheet" class="wy-select-problem">
      <mt-cell title="选择住址" :value="grfixplace" is-link  ></mt-cell>
    </div>
    <mt-popup
      v-model="grfpsheetVisible"
      position="bottom" style="text-align:center;">
        <span class="wy-fix-pop-btn" @click="grfpokValuesChange">确定</span>
        <mt-picker :slots="grfpslots" @change="grfponValuesChange" valueKey="name"></mt-picker>
    </mt-popup>
    <div style="padding-top:8px;">
      <p class="wy-sug-name">请选择反馈类型</p>
      <div class="wy-sug-types">
        <span class="wy-sug-type" typeid="1">投诉</span>
        <span typeid="2">建议</span>
        <span typeid="3">表扬</span>
      </div>
    </div>

    <div class="wy-sug-textarea">
      <mt-field label="" placeholder="请输入您要反馈的内容" type="textarea" rows="4" v-model="introduction"></mt-field>
    </div>
    <div style="padding: 12px 0;">
      <p class="wy-sug-name">添加图片（可选）</p>
      <div class="wy-sug-index">
        <div id="wy-imgs-upload" style="display:inline-block;vertical-align:top;">
          <!-- <img src="" class="show" style="width:60px;height:60px;display:none;" /> -->
        </div>
        <div id="wy-sug-postimgs" style="display:inline-block;vertical-align:top;position:relative;">
          <img id="uploaderBox" style="width: 65px;" src="../../../static/images/upload.png" />
          <!-- <input id="imageFile1"  name="imageFile" onchange="changepic(this,'.wy-sug-index')" type="file" multiple accept="image/*" /> -->
        </div>
      </div>
    </div>
  </div>
  <mt-button class="wy-sug-button" :disabled="disabled" type="primary" @click="postWyOpitionSave">确认提交</mt-button>
</div>

</template>

<script>
import { Field,Button,Toast,Cell,Popup,Picker,Indicator } from 'mint-ui';
// import utils from '../utils.js';
import * as utils from '../../utils';
import $ from "jquery";
export default {
  name: 'detail',
  data () {
    return {
      disabled:false,
      introduction:'',
      typeId:'1',
      grfpchooseResult:{},
      grfixplace:'',
      grfixplaceid:'',
      grfpsheetVisible:false,
      grfpslots: [
        {
          values: [],
        }
      ],
    }
  },
  components:{
    [Field.name]:Field,
    [Button.name]:Button,
    [Toast.name]:Toast,
    [Cell.name]:Cell,
    [Popup.name]:Popup,
    [Picker.name]:Picker,
    [Indicator.name]:Indicator
  },
  watch:{
    grfpchooseResult(val){
      if (val && val.name) {
        console.log('val',val)
        this.grfixplace = val.name;
        this.grfixplaceid = val.id;
      }
    }
  },
  created(){
    document.title = '提交建议';
    var that = this;
    window.userInfo = JSON.parse(localStorage.getItem('_userInfo'));
    var tmpArr= window.userInfo.wyOwnerHouseEntityList.map(function(item){
      var tmp = {
        id:item.id,
        name:item.communityName +'/'+item.address
      };
      return tmp
    });
    this.$set(this.grfpslots[0],'values',tmpArr);
    this.grfixplaceid = window.userInfo.wyOwnerHouseEntityList[0].id;

    this.$nextTick(function(){
        $('span','.wy-sug-types').on('click', function (ele) {
            // debugger;
            // that.tabId = $(this).attr('tabid');
            that.typeId = $(this).attr('typeid');
            $(this).addClass('wy-sug-type').siblings('.wy-sug-type').removeClass('wy-sug-type');
        });

        $("#uploaderBox").on("click", function(e) {
           var newFileInput = "<input id='uploaderInput' type='file' name='imageFile' accept='image/*' multiple />";
           $(this).parent().append($(newFileInput));
           $("#uploaderInput").bind("change", function(e){
             //onFileUploaded(e);预览等操作
             $(this).removeAttr("id");
             changepic(this,'.wy-sug-index')
           });
           $("#uploaderInput").click();
        });
    });

  },
  methods:{
    grfpshowSheet(){
      // debugger;
      this.grfpsheetVisible = true;
    },
    grfponValuesChange(e,val){
      if (val) {
        this.grfpchooseResult = val[0];
      }
      // console.log(values)
    },
    grfpokValuesChange(){
      if (!this.grfpchooseResult.name) {
        this.grfpchooseResult = this.grfpslots[0].values;
      }
      this.grfpsheetVisible = false;
    },
    gotoSugList(){
      this.$router.push({
        name:'sugList'
      })
    },
    postWyOpitionSave(){
      var that = this;
      if (!that.disabled) {
        that.disabled = true;
        var imageFile = $("#wy-sug-postimgs").find('input');
        // var imageFile = $("#imageFile1").val();
        if(imageFile && imageFile.length > 0){
          Indicator.open();
          sendMoreRequest("#wy-sug-postimgs",function(res){
            console.log('res~~~',res);
            var param = {
              propertyId :window.userInfo.propertyId,// 物业ID ,
              // companyId :window.userInfo.companyId,// 公司ID ,
              // communityId :that.grfixplaceid,// 楼宇ID ,
              ownerId : window.userInfo.ownerId,//业主ID ,
              houseId:that.grfixplaceid,
              typeId : that.typeId,//类型ID ,
              opinionContent : that.introduction,//投诉内容 ,
              imgUrl : res.join(','),//图片地址（多个以逗号隔开）
            };
            utils.Post('postWyOpinionSave',param).then(function(res){
              Indicator.close();
              if (res.data.code ==0) {
                Toast('提交成功~');
                window.history.go(-1);
              }else {
                Toast('提交失败,'+res.data.msg+'！');
              }
            });
          })
        }else {
          var param = {
            propertyId :window.userInfo.propertyId,// 物业ID ,
            // companyId :window.userInfo.companyId,// 公司ID ,
            // communityId :that.grfixplaceid,// 楼宇ID ,
            ownerId : window.userInfo.ownerId,//业主ID ,
            houseId:that.grfixplaceid,
            typeId : that.typeId,//类型ID ,
            opinionContent : that.introduction,//投诉内容 ,
            // imgUrl : res.join(','),//图片地址（多个以逗号隔开）
          };
          Indicator.open();
          utils.Post('postWyOpinionSave',param).then(function(res){
            Indicator.close();
            if (res.data.code ==0) {
              Toast('提交成功~');
              window.history.go(-1);
            }else {
              Toast('提交失败,'+res.data.msg+'！');
            }
            // that.list = res.data.page.list;
          });
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
textarea.mint-field-core {
  color: rgba(85,85,85,1);
}
#wy-sug-postimgs input {
  position: absolute;
  top: 0;
  right: 0;
  z-index:-1;
}
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
    top:0;
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
.wy-sug-body .wy-select-problem .mint-cell-wrapper{
padding: 0;
}
.wy-sug-body .wy-select-problem .mint-cell-wrapper .mint-cell-title {
  padding-left: 0;
}
.wy-sug-body .wy-select-problem .mint-cell-wrapper .mint-cell-text{
padding-left: 0 !important;
}
.mint-cell-value.is-link {
  color: rgba(85,85,85,1) !important;
}
</style>

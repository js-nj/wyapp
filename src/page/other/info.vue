<template>
  <div class="pageContainer" v-if="isReady">
    <h3 style="padding:16px 12px;">
      <span v-if="check_status == '0'">请首先完善个人信息：</span>
    </h3>
    <div>
      <van-form>
        <van-field
          :readonly="true"
          :value="statusName"
          label="状态"
        />
        <van-field
          v-if="check_status == 3"
          :rows="1"
          autosize
          type="textarea"
          :readonly="true"
          :value="check_reson"
          label="原因"
        />
        <van-field
          :readonly="true"
          :clickable="!disabled"
          name="ld_picker"
          :value="form.name_Display"
          label="楼栋"
          placeholder="点击选择楼栋"
          @click="ld_showPicker = true"
        />
        <van-popup v-if="!disabled" v-model="ld_showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="LDoptions"
            @confirm="ld_onConfirm"
            @cancel="ld_showPicker = false"
          />
        </van-popup>
        <van-field
          :readonly="true"
          :clickable="!disabled"
          name="hh_picker"
          :value="form.name2_Display"
          label="户号"
          placeholder="点击选择户号"
          @click="hh_showPicker = true"
        />
        <van-popup v-if="!disabled" v-model="hh_showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="HHoptions"
            @confirm="hh_onConfirm"
            @cancel="hh_showPicker = false"
          />
        </van-popup>
        <van-field
          v-model="form.name6"
          :readonly="disabled"
          name="面积"
          label="面积"
          placeholder="房产面积"
        />
        <van-field
          v-model="form.name3"
          :readonly="disabled"
          name="姓名"
          label="姓名"
          placeholder="姓名"
        />
        <van-field
          v-model="form.name4"
          :readonly="disabled"
          name="手机号"
          label="手机号"
          placeholder="手机号"
        /><van-field
          v-if="!disabled"
          v-model="form.name5"
          name="验证码"
          label="验证码"
          placeholder="验证码">
            <van-button slot="button" size="small" type="primary" @click="getSMS" :disabled="butDisabled">{{snsLabel}}</van-button>
          </van-field>

         <!--  <el-form :disabled="disabled" ref="form" :model="form" label-width="62px"  style="padding:0 8px;">
            <el-form-item label="身份证" v-if="setting.is_need_id == '1'" style="margin-top:8px;border-bottom: 1px solid #ebedf0;">
                <van-uploader :deletable="!disabled"  :readonly="disabled" :afterRead="uploadImages" v-model="fileList" max-count="1"/>
            </el-form-item>
            <el-form-item label="房产证" v-if="setting.is_need_house == '1'" style="margin-top:8px;">
                <van-uploader :deletable="!disabled" :readonly="disabled" :afterRead="uploadImages2" v-model="fileList2" max-count="1"/>
            </el-form-item>
          </el-form> -->
        <div style="margin: 16px;">
          <van-button round block type="info" v-if="!disabled" @click="onSubmit">
            提交
          </van-button>
          <!-- <van-button round block type="info" v-else @click="onEdit">
            修改
          </van-button> -->
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
var flag = 1;
var i = 60;
window.countDown = function() {
  // console.log()
    i = i - 1;
    // console.log(i)
    window._vue_info.snsLabel = i+"秒后重新发送";
    if (i == 0) {
        window._vue_info.snsLabel = "重新发送";
        window._vue_info.butDisabled = false;
        flag = 1;
        i = 60;
        // cleartimeout(t);
        return;
    }
    var t = setTimeout('window.countDown()',1000);
}
  import {
    Post
  } from '../../utils';
  // import { mapState, mapGetters, mapActions } from 'vuex'
   import { Indicator } from 'mint-ui';
  // import {vanUploader} from 'vant';
  export default {
    async created(){
      window._vue_info = this;
        // console.log('缓存的用户数据2');
        window._userInfo = JSON.parse(sessionStorage.getItem('_userInfo'));
        window._ids = JSON.parse(sessionStorage.getItem('_ids'));
        Indicator.open();
        // let infoDone = await this.GetUserCheckDetails();
        console.log('window._userInfo',window._userInfo)
        let infoDone = window._userInfo;
        if(infoDone){
          this.check_status = infoDone.check_status;
          this.check_reson = infoDone.check_reson
          if (infoDone.check_status != '0') {
            // if (infoDone.check_status == '3') {
            //   this.disabled = false;
            // }else {
            //   this.disabled = true;
            // }
            this.disabled = true;
            if(infoDone.houses){
              this.form.name = infoDone.houses[0] && infoDone.houses[0].house_parent_id;
              this.form.name_Display = infoDone.houses[0] && infoDone.houses[0].full_name.split('/')[0];
              this.form.name2 = infoDone.houses[0] && infoDone.houses[0].house_id;
              this.form.name2_Display = infoDone.houses[0] && infoDone.houses[0].full_name.split('/')[1];
              this.form.name6 = infoDone.houses[0] && infoDone.houses[0].house_area;
            }
            this.form.name3 = infoDone.user_name;
            this.form.name4 = infoDone.user_phone;
            // this.form.name6 = infoDone.houses[0].house_parent_id;
            // this.fileList.push({
            //   url:infoDone.user_id_img
            // });
            // this.fileList2.push({
            //   url: infoDone.houses[0] && infoDone.houses[0].house_img_url
            // });
          }
        }
        // this.setting = await this.GetCommunityDetails();
        Indicator.close();
        this.isReady = true
        this.buildings = await this.GetHouseList();
        this.buildings.forEach( item => {
          let tmpobj = {
            text:item.house_name,
            id:item.id
          };
          this.LDoptions.push(tmpobj);
          this.buildingsObj[item.id] = item;
        });
        if (this.form.name) {
          this.buildingsObj[this.form.name].childrens.forEach(item => {
            this.HHoptions.push({
              text:item.house_name,
              id:item.id
            });
          });
          console.log('this.HHoptions',this.HHoptions)
        }

        // console.log('this.setting-after',this.setting);
    },
    data () {
      return {
        isReady:false,
        check_status:'0',
        check_reson:'',
        fileList: [],
        fileList2: [],
        disabled:false,
        snsLabel:'获取验证码',
        form: {
          name: '',
          name_Display:'',
          name2: '',
          name2_Display:'',
          name3: '',
          name4: '',
          name5: '',
          name6: '',
        },
        buildings:[],
        buildingsObj:{},
        LDoptions:[],
        HHoptions:[],
        butDisabled:false,
        setting:{
          is_need_house:'1',
          is_need_id:'1'
        },
        ld_showPicker: false,
        hh_showPicker: false,
      }
    },
    computed: {
      statusName(){
        if (this.check_status == '0') {
          return '未提交'
        }
        if (this.check_status == '1') {
          return '待审核'
        }
        if (this.check_status == '2') {
          return '通过审核'
        }
        if (this.check_status == '3') {
          return '未通过审核'
        }
      }
      // ...mapState('common', ['currentQuestionnaire', 'currentQuestions']),
    },
    filter: {
    },
    watch: {
    },
    components: {

    },
    methods: {
      // ...mapActions('common', ['GetCommunityDetails','GetHouseList','PostSMS','UserCheckAdd','GetUserCheckDetails','UploadImage']),
      async GetHouseList() {
        let param = {
          request_content: JSON.stringify({
            user_id: window._userInfo.id,
            community_id: window._ids.community_id,
            property_id: window._ids.property_id
          })
        };
        var result = {};
        await Post('GetHouseList', param).then(res => {
          let tmpResult = JSON.parse(res.data.d);
          if (tmpResult.code == 0) {
            result = tmpResult.list;
          }
        });
        console.log('GetHouseList', result)
        return result;
      },
      // async GetUserCheckDetails(){
      //   var tmpResult = '';
      //   let param = {
      //     request_content: JSON.stringify({
      //       // user_id: window._userInfo.id,
      //       // community_id: window._ids.community_id,
      //       // property_id: window._ids.property_id
      //     })
      //   };
      //   await Post('GetUserCheckDetails', param).then(res => {
      //     if (tmpResult.code == 0) {
      //       tmpResult = JSON.parse(res.data.d);
      //       window.$toast('获取个人信息成功~');
      //       // this.form = tmpResult.result;
      //     } else {
      //       window.$toast('获取个人信息失败~');
      //     }
      //   }); 
      //   return tmpResult;
      // },
      ld_onConfirm(e){
        console.log('ld_onConfirm',e)
        // this.form.name = e.id;
        this.form.name = e.id;
        this.form.name_Display = e.text;
        this.ld_showPicker = false;
        // this.setHHoptions();
        this.buildingsObj[this.form.name].childrens.forEach(item => {
            this.HHoptions.push({
              text:item.house_name,
              id:item.id
            });
          });
      },
      hh_onConfirm(e){
        console.log('hh_onConfirm',e)
        this.form.name2 = e.id;
        this.form.name2_Display =e.text;
        this.hh_showPicker = false;
      },
      getSMS(){
        var that = this;
        if (!this.form.name4) {
          window.$toast('请输入手机号~');
          // return;
        }
        if (this.form.name4.length == 11 && !isNaN(this.form.name4)) {
          this.PostSMS(this.form.name4);
          this.butDisabled = true;
          countDown();
        }else {
          window.$toast('请输入正确的手机号~');
        }
      },
      async PostSMS(params) {
        let param = {
          request_content: JSON.stringify({
            community_id: window._ids.community_id,
            property_id: window._ids.property_id,
            user_mobile: params
          })
        };
        var result = {};
        await Post('PostSMS', param).then(res => {
          // console.log('PostSMS', res)
          let tmpResult = JSON.parse(res.data.d);
          if (tmpResult.code == 0) {
            result = tmpResult.result;
          } else {
            window.$toast(tmpResult.msg);
          }
        });
        // console.log('PostSMS', result)
        return result;
      },
      // uploadImages(file){
      //   var that = this;
      //   console.log('file1',file)
      //   var tmpFile = JSON.parse(JSON.stringify(file));
      //   this.dealImage(file.content,{},function(base64){
      //     tmpFile.content = base64;
      //     that.UploadImage(tmpFile).then(imgres=>{
      //       console.log('imgres-fileList1',imgres)
      //       that.fileList=[];
      //       that.fileList.push({
      //         url:imgres
      //       });
      //     })
      //   });
      // },
      // uploadImages2(file){
      //   var that = this;
      //   console.log('file2',file)
      //   var tmpFile = JSON.parse(JSON.stringify(file));
      //   this.dealImage(file.content,{},function(base64){
      //     tmpFile.content = base64;
      //     that.UploadImage(tmpFile).then(imgres=>{
      //       console.log('imgres-fileList1',imgres)
      //       that.fileList2=[];
      //       that.fileList2.push({
      //         url:imgres
      //       });
      //     })
      //   });
      // },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      onEdit(){
        this.disabled = !this.disabled;
      },
      onSubmit(){
        console.log('submit!');
        if (!this.form.name) {
          window.$toast('请先选择楼栋');
          return;
        }
        if (!this.form.name2) {
          window.$toast('请先选择户号');
          return;
        }
        if (!this.form.name3) {
          window.$toast('请填写姓名');
          return;
        }
        if (!this.form.name4) {
          window.$toast('请填写手机号');
          return;
        }
        if (!this.form.name5) {
          window.$toast('请填写验证码');
          return;
        }
        if (!this.form.name6) {
          window.$toast('请填写房产面积');
          return;
        }
        // if (this.setting.is_need_house == '1') {
        //   if (this.fileList2[0] && this.fileList2[0].url) {

        //   }else {
        //     window.$toast('请上传房产证');
        //     return;
        //   }
        // }
        // if (this.setting.is_need_id == '1') {
        //   if (this.fileList[0] && this.fileList[0].url) {

        //   }else {
        //     window.$toast('请上传身份证');
        //     return;
        //   }
        // }
        let param = {
          user_id: window._userInfo.id,
          community_id: window._ids.community_id,
          property_id: window._ids.property_id,
          user_name:this.form.name3,
          user_phone:this.form.name4,
          sms_code:this.form.name5,
          // user_id_img:this.fileList[0]?this.fileList[0].url:'',
          houses:[{
            house_parent_id:this.form.name,
            house_id:this.form.name2,
            // house_img_url:this.fileList2[0]?this.fileList2[0].url:'',
            house_area:this.form.name6,
          }]
        };
        this.UserCheckAdd(param);
      },
      UserCheckAdd(params){
        var that = this;
        let param = {
          request_content: JSON.stringify(Object.assign({
            // user_id: window._userInfo.id,
            // community_id: window._ids.community_id,
            // property_id: window._ids.property_id
          }, params))
        };
        var result = {};
        Post('UserCheckAdd', param).then(res => {
          let tmpResult = JSON.parse(res.data.d);
          if (tmpResult.code == '0') {
            window.$toast('提交成功~');
            window._userInfo.check_status = "1";
            sessionStorage.setItem('_userInfo', JSON.stringify(window._userInfo));
            that.disabled = true;
            // window.history.go(-1);
          } else {
            window.$toast(tmpResult.msg || '提交失败！');
          }
        });
      },
      home(){
        this.$router.push('/')
      },
      // dealImage(path, obj, callback){
      //   let img = new Image();
      //   img.src = path;
      //   img.onload = function () {
      //     let that = this;
      //     // 默认按比例压缩
      //     let w = that.width,
      //       h = that.height,
      //       scale = w / h;
      //     w = obj.width || w;
      //     h = obj.height || (w / scale);

      //     //生成canvas
      //     let canvas = document.createElement('canvas'),
      //       ctx = canvas.getContext('2d');
      //     canvas.width = w;
      //     canvas.height = h;
      //     ctx.drawImage(that, 0, 0, w, h);

      //     // 默认图片质量为0.75
      //     let quality = 0.75;
      //     if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      //       quality = obj.quality;
      //     }

      //     // 回调函数返回base64的值
      //     let base64 = canvas.toDataURL('image/jpeg', quality);
      //     callback(base64);
      //   }
      // }
    },
  }
</script>

<style scoped >
  .pageContainer{
    background-color: #fff;
  }
  .pageContainer .infoC{
      margin-top: 30vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-weight: bold;
      text-align: center;
    }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .upload-demo {
    padding-left: 20px;
  }
  h3 > label {
    font-size: 12px;
    /*// float: right;*/
    line-height: 12px;
  }
  .pageContainer .el-button--primary.is-disabled {
        font-size: 12px;
    padding: 12px;
  }
  .pageContainer .el-form-item {
    margin-bottom:12px;
  }
  .pageContainer .van-uploader {
    margin-left: 48px;
  }

</style>

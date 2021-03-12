<template>
  <div class="pageContainer wy-info" v-if="isReady">
    <div>
      <van-form>
        <van-field
          :readonly="true"
          :value="statusName"
          label="状态"
        />
        <van-field
          v-model="form.name5"
          :readonly="disabled"
          name="微信昵称"
          label="微信昵称"
          placeholder="微信昵称"
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
        />
        <!-- <van-field
          :readonly="true"
          :clickable="!disabled"
          name="ld_picker"
          :value="form.name_Display"
          label="楼栋"
          placeholder="点击选择楼栋"
          @click="ld_showPicker = true"
        />
        <van-field
          :readonly="true"
          :clickable="!disabled"
          name="dy_picker"
          :value="form.name1_Display"
          label="单元"
          placeholder="点击选择单元"
          @click="dy_showPicker = true"
        />
        <van-field
          :readonly="true"
          :clickable="!disabled"
          name="hh_picker"
          :value="form.name2_Display"
          label="户号"
          placeholder="点击选择户号"
          @click="hh_showPicker = true"
        /> -->
        <van-field
          v-model="form.name6"
          :readonly="disabled"
          name="房号"
          label="房号"
          placeholder="房号"
        />
        <van-field
          v-model="form.name7"
          :readonly="disabled"
          name="加入时间"
          label="加入时间"
          placeholder="加入时间"
        />
        <!-- <van-field
          v-model="form.name8"
          :readonly="disabled"
          name="小区id"
          label="小区id"
          placeholder="小区id"
        /> -->
        <div style="margin: 16px;">
          <van-button round block type="info" @click="onSubmit">
            审核通过
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
        if (window.location.href.indexOf('org=msg')>-1) {
          if(!window._userInfo){
            window._userInfo = {};
          }
          if(!window._ids){
            window._ids = {};
          }
          window._userInfo.id = window.location.href.split('&user_id=')[1].split('&org=msg')[0];
          window._ids.community_id = window.location.href.split('community_id=')[1].split('&property_id=')[0];
          window._ids.property_id = window.location.href.split('&property_id=')[1].split('&user_id=')[0];
        } else {
          window._userInfo = JSON.parse(sessionStorage.getItem('_userInfo'));
          window._ids = JSON.parse(sessionStorage.getItem('_ids'));
        }
        // window._userInfo = JSON.parse(sessionStorage.getItem('_userInfo'));
        // window._ids = JSON.parse(sessionStorage.getItem('_ids'));
        // Indicator.open();
        // let infoDone = await this.GetUserCheckDetails();
        console.log('window._userInfo',window._userInfo)
        this.disabled = true;
        let infoDone = {};
        if(this.$route.params){
          infoDone = this.$route.params;
        }
        if(infoDone){
          this.check_status = infoDone.check_status;
          // this.check_reson = infoDone.check_reson
          if(infoDone.full_name){
            this.form.name_Display = infoDone.full_name.split('/')[0];
            this.form.name1_Display = infoDone.full_name.split('/')[1];
            this.form.name2_Display = infoDone.full_name.split('/')[2];
          }
          this.form.name3 = infoDone.user_name;
          this.form.name4 = infoDone.user_phone;
          this.form.name5 = infoDone.wx_name;
          this.form.name6 = infoDone.full_name;
          this.form.name7 = infoDone.join_time;
          this.form.name8 = infoDone.community_id;
          this.form.name9 = infoDone.user_id;
        }else {
          console.log('个人信息传参有误！')
        }
        // this.setting = await this.GetCommunityDetails();
        Indicator.close();
        this.isReady = true
        // this.buildings = await this.GetHouseList();
        // this.buildings.forEach( item => {
        //   let tmpobj = {
        //     text:item.house_name,
        //     id:item.id
        //   };
        //   this.LDoptions.push(tmpobj);
        //   this.buildingsObj[item.id] = item;
        // });
        // if (this.form.name) {
        //   this.buildingsObj[this.form.name].childrens.forEach(item => {
        //     this.HHoptions.push({
        //       text:item.house_name,
        //       id:item.id
        //     });
        //   });
        //   console.log('this.HHoptions',this.HHoptions)
        // }

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
          name1: '',
          name1_Display:'',
          name2: '',
          name2_Display:'',
          name3: '',
          name4: '',
          name5: '',
          name6: '',
          name7: '',
          name8: '',
          name9:''
          // name6: '',
        },
        buildings:[],
        buildingsObj:{},
        LDoptions:[],
        DYoptions:[],
        HHoptions:[],
        butDisabled:false,
        setting:{
          is_need_house:'1',
          is_need_id:'1'
        },
        ld_showPicker: false,
        dy_showPicker: false,
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
            this.DYoptions.push({
              text:item.house_name,
              id:item.id
            });
          });
      },
      dy_onConfirm(e){
        console.log('dy_onConfirm',e)
        // this.form.name = e.id;
        this.form.name1 = e.id;
        this.form.name1_Display = e.text;
        this.dy_showPicker = false;
        // this.setHHoptions();
        this.buildingsObj[this.form.name].childrens.forEach(item => {
          if(item.id === e.id){
            item.childrens.forEach(subitem => {
              this.HHoptions.push({
                text:subitem.house_name,
                id:subitem.id
              });
            });
          }else {
            console.log('没找到此单元')
          }
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
        let param = {
          request_content: JSON.stringify({
            user_id: this.$route.params.user_id?this.$route.params.user_id:window._userInfo.id,
            community_id: window._ids.community_id,
            property_id: window._ids.property_id,
          })
        };
        Post('CheckByUserId', param).then(res => {
          let tmpResult = JSON.parse(res.data.d);
          if (tmpResult.code == '0') {
            window.$toast('审核成功~');
            history.go(-1);
          } else {
            window.$toast(tmpResult.msg || '审核失败！');
          }
        });
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
            this.check_status = '1';
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
  .wy-info .van-cell {
    font-size: 18px;
  }


</style>

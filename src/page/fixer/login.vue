<template>
  <div >
    <div keep-alive="" >
      <div class="jy-login">
        <div class="jy-log">
          <div class="jy-log-h2">登录</div>
          <div class="jy-log-block"></div> <span class="jy-log-span"></span>
        </div>
        <div class="login_form">
          <!-- <input type="text" placeholder="请输入手机号" class="qxs-icon">
          <input type="text" id="password" placeholder="请输入密码" class="qxs-icon"> -->
          <input type="text" class="qxs-icon" :placeholder="nameholder" v-model="userName">
        <input type="text" class="qxs-icon" id="password" placeholder="请输入密码" v-model="password"  />
          <button type="button" @click="login" class="el-button login_btn el-button--primary">
            <!---->
            <!----><span>登 录</span>
          </button>
          <div>
            <div class="jy-log-change"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//  import { userLogin } from '../../api/api';
function changePassword(that, id, origin) {
  var str = ""; //str变量用于存储密码
  //获取input元素
  // debugger;
  var input = document.getElementById(id);
  //获取span元素
  // var span = document.getElementById("span")[0];
  input.oninput = function(evt) {
    var val = this.value; //取到输入框的值
    if (val.length > str.length) {
      //输入值
      str += val.charAt(val.length - 1);
    } else {
      //回删值
      str = str.substr(0, val.length);
    }
    //将输入框除最后一位的字符替换成*
    this.value =
      val.substr(0, val.length - 1).replace(/./g, "*") +
      val.charAt(val.length - 1);
    /* 取当前输入框长度，用于判断是否正在输入
    停止输入时，一秒后将最后一个字符变成*号 */
    var len = this.value.length;
    setTimeout(() => {
      /*这时的this指向在延迟器触发时输入框的状态，
    而不是延迟器创建时的状态*/
      if (this.value.length == len) {
        //一秒后输入框的值长度不变，将所有字符替换为*
        this.value = this.value.replace(/./g, "*");
      }
    }, 1000);
    that[origin] = str;
    // span.innerHTML = str;
  };
}
import * as utils from '../../utils';
import { Toast  } from 'mint-ui';
export default {
  name:'login',
  components: {
      [Toast.name]: Toast,
  },
  data() {
    return {
      userName: '',
      password: '',
      password2: '',
      checkNumber: '',
      checkCodeContent: '获取验证码',
      isBtnLoading: false,
      logType: 'pw',
      nowFlag: true,
      updatePassword: 0,
      nameholder: "请输入手机号"
    }
  },
  created() {

    document.title = "";

    this.$nextTick(() => {
      // debugger;
      if (this.logType == 'pw') {
        changePassword(this, 'password', 'password2');
      }
    })
  },
  watch: {
    logType(val) {
      // debugger;
      this.$nextTick(() => {
        if (val == 'pw') {
          changePassword(this, 'password', 'password2');
        }
      })
    }
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...';
      return '登录';
    }
  },
  methods: {
    login() {
      if (!this.userName) {
        Toast('请输入用户名');
        return;
      }

        if (!this.password) {
          Toast('请输入密码');
          return;
        }

      utils.Post('postLogin', {
        "userPhone": this.userName,
        "userPwd": this.password2,
      }).then((response) => {
        let data = response.data;
        if (data.code === 0) {
          //验证微信的jssdk
          // this.checkWxCode();
          // data.result.userType = this.station;
          // localStorage.setItem('updatePassword', 1);
          // window.logoutFlag = false;
            localStorage.wxuserInfo = JSON.stringify(data.result);
          // window.userInfo = data.result;
            window.wxuserInfo = data.result;
            Toast('登录成功！');
            this.$router.push({
              name: 'fixerIndex'
            });

        } else {
          Toast(data.msg || '登录失败！');
        }

      }).catch((error) => {
        Toast('登录失败！');
      })
    },
  }
}

</script>
<style>
body {
  padding: 0;
  margin: 0;
  font-size: 16px;
  font-family: PingFang-SC;
  /*background-color: #fff;*/
}
.jy-login {
  background: #fff;
}
.jy-log {
  position: relative;
  text-align: left;
  padding: 58px 0 0 35px;
}

.jy-log-h2 {

  height: 40px;
  font-size: 28px;
  font-family: PingFang-SC;
  font-weight: bold;
  color: rgba(34, 36, 42, 1);
  line-height: 40px;
  padding-left: 2px;
}

.jy-log-span {

  /*height:21px;*/
  font-size: 15px;
  font-family: PingFangSC;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
  /*line-height:21px;*/
  padding-top: 12px;
  display: inline-block;
}

.jy-log-block {
  width: 59px;
  height: 9px;
  background: rgba(255, 197, 0, 1);
  border-radius: 2px;
  position: absolute;
  top: 100px;
  z-index: -1;
}

.login_form {
  padding-top: 10%;
  padding-left: 10%;
  padding-right: 10%;
}

.login_form input {
  border: 0;
  border-bottom: solid 1px #eee;
  margin: 0;
  -webkit-appearance: none;
  height: 50px;
  margin-top: 14px;
  width: 100%;
  -webkit-tap-highlight-color: transparent !important;
}

.login_form ::-moz-placeholder {
  color: #999;
}

.login_form ::-webkit-input-placeholder {
  color: #999;
}

.login_form :-ms-input-placeholder {
  color: #999;
}

input.qxs-ic_check {
  width: 60%;
  border-radius: 6px 0 0 6px;
}

.qxs-ic_user {
  background: url("../../../static/images/ic_user.png") no-repeat;
  background-size: 13px 15px;
  background-position: 3%;
}

.qxs-ic_check {
  background: url("../../../static/images/check.png") no-repeat;
  background-size: 13px 15px;
  background-position: 3%;
}

.jy-type {
  height: 100%;
  /*background: url('../../assets/bg_1.png') no-repeat top center;*/
  background-size: cover;
  padding-top: 20px;
}

.jy-type-item {
  padding-top: 50px;
}

.qxs-ic_password {
  background: url("../../../static/images/ic_password.png") no-repeat;
  background-size: 13px 15px;
  background-position: 3%;
  margin-bottom: 20px;
}

.login_logo {
  height: 100%;
  width: 100%;
}


.login_btn.el-button {
  margin-top: 66px;
  /*width: 279px;*/
  width: 100%;
  height: 48px;
  background: linear-gradient(282deg, rgba(255, 193, 0, 1) 0%, rgba(255, 215, 0, 1) 100%);
  border-radius: 24px;
  border-color: #fff;
}

.login_btn.el-button span {
  /*width:42px;*/
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC;
  font-weight: 500;
  color: rgba(58, 52, 32, 1);
  line-height: 25px;
}

.jy-getcode {
  /*display: inline-block;
  width: 40%;
  height: 55px;
  margin-top: 14px;
  line-height: 55px;
  text-align: center;
  vertical-align: top;
  border-top: solid 1px lavender;
  border-bottom: solid 1px lavender;
  border-right: solid 1px lavender;
  border-radius: 0 6px 6px 0;*/
  position: absolute;
  top: 28px;
  right: 0px;
  width: 80px;
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC;
  font-weight: 300;
  color: rgba(255, 197, 0, 1);
  line-height: 22px;
  text-align: center;
}

.jy-log-change {
  width: 98px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 300;
  color: rgba(153, 153, 153, 1);
  line-height: 20px;
  margin: 16px auto 0;
}

.jy-type-item-name {
  width: 108px;
  height: 108px;
  margin: 0px auto 0;
  line-height: 100px;
  text-align: center;
  border-radius: 54px;
  background: rgba(255, 255, 255, .15);
  border: 3px solid rgba(255, 255, 255, 1);

  font-size: 18px;
  font-family: PingFangSC;
  /*font-weight:600;*/
  color: rgba(255, 255, 255, 1);
  /*border:3px solid rgba(0,0,0,1);*/
}

</style>

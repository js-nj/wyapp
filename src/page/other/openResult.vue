<template>
<div class="wy-openList">
    <div v-if="result == 'success'">
      <img class="openr-img" src="../../../static/images/wy/success.png" />
      <div class="openr-des">开门成功</div>
    </div>
    <div v-if="result == 'fail'">
      <img class="openr-img" src="../../../static/images/wy/fail.png" />
      <div class="openr-des">开门失败</div>
    </div>
</div>

</template>

<script>
import * as utils from '../../utils';
export default {
  name: 'openResult',
  data () {
    return {
      result:''
    }
  },
  created(){
    document.title = '门禁';
    window._userInfo = JSON.parse(sessionStorage.getItem('_userInfo'));
    window._ids = JSON.parse(sessionStorage.getItem('_ids'));
    let terminal_code = location.href.split('terminal_code=')[1].split('&community_id')[0];
    this.handleOpenDoor(terminal_code);
    // this.options = window.userInfo.wyOwnerHouseEntityList;
  },
  methods:{
    handleOpenDoor(terminal_code){
      var that = this;
      let param = {
        request_content: JSON.stringify({
          user_id: window._userInfo.id,
          community_id: window._ids.community_id,
          property_id: window._ids.property_id,
          terminal_code:terminal_code
        })
      };
      // debugger
      utils.Post('DoorOpen',param).then(function(res){
        let tmpResult = JSON.parse(res.data.d);
        console.log('DoorOpen--tmpResult',tmpResult)
        if (tmpResult.code == 0){
          that.result = 'success';
          window.$toast('开门成功！')
        }else {
          that.result = 'fail';
          window.$toast('开门失败！')
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wy-openList {
  text-align: center;
  background-color: #fff;
  padding: 16px;
  min-height: 100%;
  padding-top: 64px;
}
.openr-img {
  display: block;
    margin: 0 auto;
    width:60px;
}
.openr-des {
  padding: 16px 0;
}
</style>

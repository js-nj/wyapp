<template>
<div class="wy-openList">
  <div class="wy-openList-item" v-for="item in options">
    <van-row>
      <van-col span="4">
        <img style="width:40px;position: relative;top: 4px;" src="../../../static/images/wy/open.png" />
      </van-col>
      <van-col span="16">
        <h5 style="font-weight: 600;">{{item.house_name}}</h5>
        <span style="font-size: 12px;color: #999;line-height: 12px;display: inline-block;padding-top: 4px;">{{item.house_info}}</span>
      </van-col>
      <van-col span="4">
        <van-button type="info" size="mini" style="position: relative;top: 6px;right: -8px;" @click="handleOpenDoor(item)">开门</van-button>
      </van-col>
    </van-row>
  </div>
</div>

</template>

<script>
import * as utils from '../../utils';
export default {
  name: 'openList',
  data () {
    return {
      options:[]
    }
  },
  created(){
    document.title = '门禁开锁';
    window._userInfo = JSON.parse(sessionStorage.getItem('_userInfo'));
    window._ids = JSON.parse(sessionStorage.getItem('_ids'));
    this.getOpenDoorList();
    // this.options = window.userInfo.wyOwnerHouseEntityList;
  },
  methods:{
    getOpenDoorList(){
      var that = this;
      // var param = {
      //   propertyId:window.userInfo.propertyId
      // };
      let param = {
        request_content: JSON.stringify({
          user_id: window._userInfo.id,
          community_id: window._ids.community_id,
          property_id: window._ids.property_id
        })
      };
      // debugger
      utils.Post('DoorList',param).then(function(res){
        let tmpResult = JSON.parse(res.data.d);
        if (tmpResult.code == 0 ) {
          that.options = tmpResult.list;
        }
      });
    },
    handleOpenDoor(params){
      let param = {
        request_content: JSON.stringify({
          user_id: window._userInfo.id,
          community_id: window._ids.community_id,
          property_id: window._ids.property_id,
          terminal_code:params.terminal_code
        })
      };
      // debugger
      utils.Post('DoorOpen',param).then(function(res){
        let tmpResult = JSON.parse(res.data.d);
        if (tmpResult.code == 0){
          window.$toast('开门成功！')
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wy-openList {
  background-color: #ddd;
  padding: 16px;
  min-height: 100%;
}
.wy-openList-item {
  padding:8px;
  text-align: left;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 6px;
  /*border-bottom: solid 1px #d9d9d9;*/
}
/*.wy-openList .wy-openList-item:last-child {
  border-bottom: none;
}*/
</style>

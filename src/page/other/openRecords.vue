<template>
<div class="wy-openList">
  <div class="wy-openList-item" v-for="item in options">
    <van-row>
      <van-col span="8">
        {{item.house_name}}
      </van-col>
      <!-- <van-col span="6">
        {{item.user_name}}
      </van-col> -->
      <van-col span="12">
        {{item.open_time}}
      </van-col>
      <van-col span="4">
        <span :style="{color:(item.open_status == '成功'?'green':'red' )}">{{item.open_status}}</span>
      </van-col>
    </van-row>
  </div>
</div>

</template>

<script>
import * as utils from '../../utils';
export default {
  name: 'openRecords',
  data () {
    return {
      options:[]
    }
  },
  created(){
    document.title = '开锁记录';
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
      utils.Post('DoorOpenList',param).then(function(res){
        let tmpResult = JSON.parse(res.data.d);
        if (tmpResult.code == 0 ) {
          that.options = tmpResult.list;
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

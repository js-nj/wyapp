<template>
<div class="wy-openList">
  <div class="wy-openList-item" v-for="item in options" @click="gotoPage(item)">
    <van-row>
      <van-col span="4">
        {{item.user_name}}
      </van-col>
      <van-col span="10">
        {{item.full_name}}
      </van-col>
      <van-col span="10">
        {{item.join_time}}
      </van-col>
      <!-- <van-col span="6">
        {{item.community_id}}
      </van-col> -->
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
    document.title = '审核住户';
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
    this.getCheckList();
    // this.options = window.userInfo.wyOwnerHouseEntityList;
  },
  methods:{
    gotoPage(param){
      this.$router.push({
        name:'checkInfo',
        params:param
      })
    },
    getCheckList(){
      var that = this;
      let param = {
        request_content: JSON.stringify({
          user_id: window._userInfo.id,
          community_id: window._ids.community_id,
          property_id: window._ids.property_id
        })
      };
      // debugger
      utils.Post('CheckList',param).then(function(res){
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

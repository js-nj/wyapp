<template>
<div class="wy-detail">
  <div class="wy-detail-title">{{title}}</div>
  <div class="wy-detail-des">
    <span class="wy-detail-des-item">{{auther}}</span>
    <span class="wy-detail-des-item">{{mfrom}}</span>
    <span class="wy-detail-des-item">{{time}}</span>
  </div>
  <div class="wy-detail-body">{{content}}</div>
</div>

</template>

<script>
// import utils from '../utils.js';
import * as utils from '../utils';
export default {
  name: 'detail',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      id:'',
      title:'',
      auther:'',
      mfrom:'',
      time:'',
      content:''
    }
  },
  created(){
    document.title = '资讯公告详情';
    // console.log(utils)
    // debugger;
    var param = {
      id:''
    };
    param.id = this.$route.params.item.id;
    this.getGgDetail(param);
  },
  methods:{
    getGgDetail(param){
      var that = this;
      utils.Get('getGgDetail',param).then(function(res){
        console.log('res----',res)
        if (res.data.code === 0) {
          that.title = res.data.wyCms.cmsTitle;
          that.auther = res.data.wyCms.checkUserName ;
          that.mfrom = res.data.wyCms.copyfrom;
          that.time = res.data.wyCms.createDate;
          that.content = res.data.wyCms.cmsContent;
        }
        // that.list = res.data.page.list;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wy-detail {
  padding: 16px;
  text-align: left;
}
.wy-detail-title {
  font-size: 20px;
}
.wy-detail-des-item {
  display: inline-block;
  padding-right: 6px;
  font-size: 14px;
  color: #999;
}
.wy-detail-body {
  font-size: 13px;
}
</style>

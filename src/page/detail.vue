<template>
<div class="wy-detail">
  <div class="wy-detail-title">{{'题目'+title}}</div>
  <div class="wy-detail-des">
    <span class="wy-detail-des-item">{{'作者'+auther}}</span>
    <span class="wy-detail-des-item">{{'来源'+mfrom}}</span>
    <span class="wy-detail-des-item">{{'时间'+time}}</span>
  </div>
  <div class="wy-detail-body">{{'操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是属性，所以我们可以用 v-bind 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 v-bind 用于 class 和 style 时，Vue.js 做了'+content}}</div>
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
      title:'1',
      auther:'2',
      mfrom:'3',
      time:'4',
      content:'5'
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
      utils.Get('getGgDetail',param).then(function(res){
        if (res.data.code === 0) {
          this.title = res.data.result.title;
          this.auther = res.data.result.auther;
          this.mfrom = res.data.result.mfrom;
          this.time = res.data.result.time;
          this.content = res.data.result.content;
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

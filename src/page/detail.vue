<template>
<div class="wy-detail">
  <div class="wy-detail-title">题目</div>
  <div class="wy-detail-des">
    <span class="wy-detail-des-item">作者</span>
    <span class="wy-detail-des-item">来源</span>
    <span class="wy-detail-des-item">时间</span>
  </div>
  <div class="wy-detail-body">操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是属性，所以我们可以用 v-bind 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 v-bind 用于 class 和 style 时，Vue.js 做了</div>
</div>

</template>

<script>
// import utils from '../utils.js';
import * as utils from '../utils';
export default {
  name: 'detail',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created(){
    // console.log(utils)
    // debugger;

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

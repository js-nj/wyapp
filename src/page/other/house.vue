<template>
<div class="wy-houses">
  <div class="wy-house" v-for="item in options">
    {{item.community_name +'&nbsp;&nbsp;'+ item.full_name}}
    <!-- {{item.address}} -->
  </div>
</div>

</template>

<script>
// import utils from '../utils.js';
import * as utils from '../../utils';
export default {
  name: 'detail',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      options:[]
    }
  },
  created(){
    document.title = '我的房屋';
    this.options = window.userInfo.houses;
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wy-houses {
  background-color: #fff;
  margin: 16px;
}
.wy-house {
  padding:8px 16px;
  text-align: left;
  margin-bottom: 4px;
  border-bottom: solid 1px #d9d9d9;
}
.wy-houses .wy-house:last-child {
  border-bottom: none;
}
</style>

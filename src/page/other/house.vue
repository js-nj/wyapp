<template>
<div class="wy-houses">
  <div class="wy-house" v-for="item in options">
    {{item.communityName +'&nbsp;&nbsp;'+ item.address}}
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
    this.options = window.userInfo.communityEntityList;
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
}
</style>

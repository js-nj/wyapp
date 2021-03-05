<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
      window.$toast = this.$toast;
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
html,body,.page,#app {
  height: 100%;
}
body {
  font-family:PingFang-SC-Medium,PingFang-SC;
  background-color: #F6F8FA !important;
}
.wy-fix-pop-btn {
    color: #26a2ff;
    display: block;
    background: #eee;
    font-size: 20px;
    padding: 6px;
}
.wy-news-items{
      padding: 0 16px;
      overflow: auto;
}
.wy-news-item{
  padding: 12px 0;
      border-top: solid 1px #F7F7F7;
      position: relative;
}
.wy-gg-body .wy-news-item-body {
  width: calc(100% - 104px);
      padding-left: 8px;
}
.wy-news-item-body,.wy-news-item-img {
  display: inline-block;
  vertical-align: top;
}
.wy-news-item-img {
  /*width: 100px;*/
  line-height: 1;
  padding-top: 4px;
}
.wy-news-item-body {
  width: calc(100% - 101px);
  /*width: calc(100% - 105px);*/
    text-align: left;
}
.wy-news-item-title {
  padding: 0 0 4px 0;
  color: #333;
  width:100%;
/*    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;*/

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}
.wy-news-item-des {
  font-size: 12px;
  color: #666;
}
.wy-news-item-read {
  display: inline-block;
  padding-left: 8px;
}
.wy-news-item-img img {
  width: 95px;
  height: 65px;
}
</style>

<template>
<div class="wy-zx">
  <div class="wy-ggmenu">
    <div v-for="(item,index) in ggMenu" :class="{'wy-ggmenu-item':true,'wy-ggmenu-item-selected':index===0}" @click="ggmenuClick(item,index)">
      <span>{{item.catName}}</span>
      <i></i>
    </div>
  </div>
  <div class="wy-news-items">
    <div class="wy-news-item" v-for="item in indexNews" @click="gotoDetail(item)">
      <div class="wy-news-item-body">
        <div class="wy-news-item-title">{{item.cmsTitle}}</div>
        <div class="wy-news-item-des">
          <span>{{item.checkTime}}</span>
          <span class="wy-news-item-read">{{item.hits+'人阅读'}}</span>
        </div>
      </div>
      <div class="wy-news-item-img">
        <img v-if="item.cmsImgUrl" :src="item.cmsImgUrl" />
        <img v-else src="../../../static/images/zxdefault.jpg" />
      </div>
    </div>
    <div v-if="indexNews.length==0" style="padding:16px 0;">
      <img style="width:128px;height:103px;" src="../../../static/images/wy/none.png" />
      <div style="color:#ADB7BA;font-size:15px;">暂无内容</div>
    </div>
  </div>
</div>

</template>

<script>
// import utils from '../utils.js';
import * as utils from '../../utils';
import $ from "jquery";
export default {
  name: 'detail',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      indexNews:[],
      ggMenu:[]
    }
  },
  created(){
    document.title = '资讯';
    this.getZxList();
    this.getGgType();
    // this.options = window.userInfo.communityEntityList;
  },
  methods:{
    gotoDetail(item){
      this.$router.push({
        name:'detail',
        params:{
          item:item
        }
      })
    },
    getGgType(){
      var that = this;
      utils.Get('getGgType',{}).then(function(res){
        console.log('getGgType',res)
        that.ggMenu = res.data.page.list;
        that.ggMenu.unshift({
          id:0,
          catName:'全部'
        });
      });
    },
    ggmenuClick(item,index){
      $('.wy-ggmenu-item-selected').removeClass('wy-ggmenu-item-selected');
      $('.wy-ggmenu-item').eq(index).addClass('wy-ggmenu-item-selected');
      this.getZxList(item.id);
    },
    getZxList(id){
      var that = this;
      var param = {
        page:1,
        limit:10,
        categoryId:'2',
        propertyId:window.userInfo.propertyId,
        ownerId:window.userInfo.ownerId,
      };
      if (id) {
        param.categoryId = id;
      }
      utils.Get('getGgList',param).then(function(res){
        console.log('getGgList',res)
        // that.ggNews = res.data.page.list;
        that.indexNews = res.data.page.list;
      });
    }
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
.wy-zx .wy-news-items{
      background: #fff;
}
</style>

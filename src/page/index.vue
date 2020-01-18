<template>

<div class="page">
    <div class="page__bd" style="height: 100%;">
        <div class="weui-tab">
            <div class="weui-tab__panel">
              <div v-if="tabId=='1'">
                <div class="wy-location">
                  <img class="wy-location-img" src="../../static/images/wy/location.png" />
                  <span class="wy-location-name">龙湖国际（双龙大道）</span>
                </div>
                <div class="wy-head">
                  <div class="wy-header">
                    <img class="wy-head-img" src="../../static/images/wy-1.jpg" />
                  </div>
                  <div class="wy-menu">
                    <div class="wy-menu-item" @click="gotoPage('recIndex')">
                      <img src="../../static/images/wy/jf.png" style="width: 24px;" alt="" class="weui-tabbar__icon">
                      <div>缴费</div>
                    </div>
                    <div class="wy-menu-item" @click="gotoPage('fixIndex')">
                      <img src="../../static/images/wy/bx.png" alt="" class="weui-tabbar__icon">
                      <div>报修</div>
                    </div>
                    <div class="wy-menu-item" @click="gotoPage('sugIndex')">
                      <img src="../../static/images/wy/ts.png" alt="" class="weui-tabbar__icon">
                      <div>投诉</div>
                    </div>
                  </div>
                </div>
                <div class="wy-news">
                    <div class="wy-news-head">
                      <span class="wy-news-head-name">热门资讯</span>
                      <span class="wy-news-head-more" @click="clickMoreNews">更多资讯 ></span>
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
                          <img src="../../static/images/wy-2.png" />
                        </div>
                      </div>
                      <div v-if="indexNews.length==0" style="padding:16px 0;">
                        <img style="width:128px;height:103px;" src="../../static/images/wy/none.png" />
                        <div style="color:#ADB7BA;font-size:15px;">暂无内容</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div v-else-if="tabId=='2'" style="background:#fff;">
                  <mt-search
                    class="wy-gg-search"
                    v-model="searchValue"
                    cancel-text="取消"
                    placeholder="搜索">
                  </mt-search>
                  <div class="wy-ggmenu">
                    <div v-for="(item,index) in ggMenu" :class="{'wy-ggmenu-item':true,'wy-ggmenu-item-selected':index===0}" @click="ggmenuClick(item,index)">
                      <span>{{item.catName}}</span>
                      <i></i>
                    </div>
                  </div>
                  <div class="wy-gg-body">
                    <div class="wy-news-items">
                      <div class="wy-news-item" v-for="item in ggNews" @click="gotoDetail(item)">
                        <div class="wy-news-item-img">
                          <img src="../../static/images/wy-2.png" />
                        </div>
                        <div class="wy-news-item-body">
                          <div class="wy-news-item-title">{{item.cmsTitle}}</div>
                          <div class="wy-news-item-des">
                            <span>{{item.checkTime}}</span>
                            <span class="wy-news-item-read">{{item.hits+'人阅读'}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- <div v-if="ggNews.length==0">暂无数据~</div> -->
                      <div v-if="ggNews.length==0" style="padding:16px 0;">
                        <img style="width:128px;height:103px;" src="../../static/images/wy/none.png" />
                        <div style="color:#ADB7BA;font-size:15px;">暂无内容</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div v-else="tabId=='3'">
                <div class="wy-myhead" style="background-color:#3789F9;color:#fff;">
                  <div><img class="wy-myhead-img" src="../../static/images/wy/man.jpg" /></div>
                  <div>
                    <p style="text-align:left;font-size:16px;">张三</p>
                    <span style="font-size:14px;">颐秀居 7栋-1单元-1002</span>
                  </div>
                  <div>
                    <p>30.00</p>
                    <span style="font-size:12px;">积分</span>
                  </div>
                </div>
                <div class="wy-mybody">
                  <div class="wy-mybody-content">
                    <mt-cell title="我的缴费" to="/recIndex" is-link>
                      <img style="width: 18px;" slot="icon" src="../../static/images/wy/jf.png" />
                    </mt-cell>
                    <mt-cell title="我的报修" to="/fixIndex" is-link>
                      <img slot="icon" src="../../static/images/wy/bx.png" />
                    </mt-cell>
                    <mt-cell title="我的建议" to="/sugList" is-link>
                      <img slot="icon" src="../../static/images//wy/ts.png" />
                    </mt-cell>
                  </div>
                </div>
              </div>
            </div>
            <div class="weui-tabbar">
                <a href="javascript:;" tabid="1" class="weui-tabbar__item weui-bar__item_on">
                    <span style="display: inline-block;position: relative;">
                        <img src="../../static/images/wy/sy.png" alt="" class="weui-tabbar__icon wy-img-noselect">
                        <img src="../../static/images/wy/sy_select.png" alt="" class="weui-tabbar__icon wy-img-selected">
                        <!-- <span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">8</span> -->
                    </span>
                    <p class="weui-tabbar__label">首页</p>
                </a>
                <a href="javascript:;" tabid="2" class="weui-tabbar__item">
                    <span style="display: inline-block;position: relative;">
                        <img src="../../static/images/wy/gg.png" alt="" class="weui-tabbar__icon wy-img-noselect">
                        <img src="../../static/images/wy/gg_select.png" alt="" class="weui-tabbar__icon wy-img-selected">
                        <!-- <span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span> -->
                    </span>
                    <p class="weui-tabbar__label">公告</p>
                </a>
                <a href="javascript:;" tabid="3" class="weui-tabbar__item">
                    <img src="../../static/images/wy/wd.png" alt="" class="weui-tabbar__icon wy-img-noselect">
                    <img src="../../static/images/wy/wd_select.png" alt="" class="weui-tabbar__icon wy-img-selected">
                    <p class="weui-tabbar__label">我的</p>
                </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import 'weui';
import weui from 'weui.js';
import $ from "jquery";
import { Search,Cell } from 'mint-ui';
import * as utils from '../utils';
export default {
  name: 'index',
  components: {
      [Search.name]: Search,
      [Cell.name]: Cell
  },
  data () {
    return {
      tabId:'1',
      indexNews:[],
      ggNews:[],
      ggMenu:[],
      searchValue:''
    }
  },
  created(){
    var that = this;
    that.getUserInfo();
    this.$nextTick(function(){
        $('.weui-tabbar__item').on('click', function (ele) {
            // debugger;
            that.tabId = $(this).attr('tabid');
            $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
        });
        that.getGgList();
    });

  },
  watch:{
    tabId(id){
      if (id==='2') {
        this.getGgType();
        this.getGgList();
      }
    },
    searchValue(value){
      this.getGgList('1',value);
    }
  },
  methods:{
    getUserInfo(){
      var param = {
        residentCode:window.location.href.split('resident_code=')[1]
      };
      if (param.residentCode) {
        utils.Get('getUserInfo',param).then(function(res){
          console.log('getUserInfo',res)
          if (res.code == 0) {
            window.userInfo = res.result;
          }
          // that.ggMenu = res.data.page.list;
        });
      }else {
        alert('未获取到resident_code');
      }
    },
    gotoPage(route){
      this.$router.push({
        name:route,
      })
    },
    gotoDetail(item){
      // weui.alert('go to detail');
      this.$router.push({
        name:'detail',
        params:{
          item:item
        }
      })
    },
    ggmenuClick(item,index){
      $('.wy-ggmenu-item-selected').removeClass('wy-ggmenu-item-selected');
      $('.wy-ggmenu-item').eq(index).addClass('wy-ggmenu-item-selected');
      this.getGgList(item.id);
    },
    getGgType(){
      var that = this;
      utils.Get('getGgType',{}).then(function(res){
        console.log('getGgType',res)
        that.ggMenu = res.data.page.list;
      });
    },
    getGgList(id,value){
      var that = this;
      var param = {
        page:1,
        limit:10
      };
      if (id) {
        param.typeId=id;
      }
      if (value) {
        param.cmsContent=value;
      }
      utils.Get('getGgList',param).then(function(res){
        console.log('getGgList',res)
        that.ggNews = res.data.page.list;
        that.indexNews = res.data.page.list;
      });
    },
    clickMoreNews(){
      $('.weui-tabbar__item').eq(1).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
      this.tabId = '2';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  /*color: #42b983;*/
}
.wy-menu {
  padding-top: 16px;
}
.wy-menu-item {
  display: inline-block;
  width: 32%;
  vertical-align: top;
}
.wy-head-img {
  width: 100%;
}
.wy-head {
  border-radius: 16px 16px 0 0;
      background: #fff;
  padding: 16px;
  position: relative;
    top: -16px;
}
.wy-location {
  background-color: #365FB2;
  height: 55px;
  text-align: left;
  padding-left: 16px;
  color: #fff;
}
.wy-location-img{
  display: inline-block;
    width: 14px;
    height: 18px;
    margin-bottom: 2px;
    /* position: absolute; */
    position: relative;
    top: 12px;
}
.wy-location-name{
  font-size: 14px;
    position: relative;
    top: 6px;
}
.wy-news {
  background: #fff;
}
.wy-news-head {
  text-align: left;
    padding: 8px 16px;
}
.wy-news-head-name{
    font-size: 18px;
}
.wy-news-head-more{
    float: right;
    font-size: 12px;
    position: relative;
    top: 6px;
}
.wy-news-items{
      padding: 0 16px;
}
.wy-news-item{
  padding: 12px 0;
      border-top: solid 1px #F7F7F7;
}
.wy-news-item-body,.wy-news-item-img {
  display: inline-block;
  vertical-align: top;
}
.wy-news-item-img {
  /*width: 100px;*/
  line-height: 1;
}
.wy-news-item-body {
  width: calc(100% - 96px);
  /*width: calc(100% - 105px);*/
    text-align: left;
}
.wy-news-item-title {
  padding: 4px 0;
  color: #333;
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
  width: 90px;
  height: 60px;
}
.wy-gg-search {
  height: auto;
}
.wy-gg-search .mint-searchbar {
  padding: 16px;
  background-color: #F2F2F2;
}
.wy-gg-search .mint-searchbar-inner {
  border-radius: 6px;
}
.wy-ggmenu{
  text-align: left;
    padding: 16px;
}
.wy-ggmenu-item {
      display: inline-block;
    font-size: 14px;
    position: relative;
    margin-right: 20px;
    padding-bottom: 4px;
}
.wy-ggmenu-item i{
  display: none;
    height: 1px;
    width: 14px;
    border-top: solid 2px #325CAF;
    position: absolute;
    bottom: 0;
    left: calc(50% - 7px);
}
.wy-ggmenu-item.wy-ggmenu-item-selected {
  color: #325CAF;
}
.wy-ggmenu-item.wy-ggmenu-item-selected i{
  display: inline-block;
}
.wy-gg-body .wy-news-item-body {
  width: calc(100% - 104px);
      padding-left: 8px;
}
.wy-myhead {
padding: 16px;
overflow: hidden;
}
.wy-myhead-img{
      width: 62px;
      display: block;
    border-radius: 33px;
}
.wy-myhead >div {
  display: inline-block;
  vertical-align: top;
  float: left;
}
.wy-myhead >div:nth-child(2) {
  padding: 6px 4px 0 16px;
}
.wy-myhead >div:last-child {
  padding-top: 6px;
  float: right;
}
.wy-mybody {
  padding: 16px 12px;
}
.wy-mybody .wy-mybody-content{
  background:rgba(255,255,255,0.9);
box-shadow:0px 1px 7px 0px rgba(196,210,231,0.46);
border-radius:9px;
}
.wy-mybody .wy-mybody-content .mint-cell:first-child .mint-cell-wrapper {
  background-image: none;
}
.wy-mybody .wy-mybody-content .mint-cell{
  min-height: 52px;
  padding: 0 4px;
}
.wy-mybody .wy-mybody-content .mint-cell .mint-cell-title{
  text-align: left;
}
  .mint-cell-text{
    color: #747474;
    font-size: 15px;
    display: inline-block;
    padding-left: 8px;
}
.weui-tabbar__item .wy-img-noselect {
  display: inline-block;
}
.weui-tabbar__item .wy-img-selected {
  display: none;
}
.weui-tabbar__item.weui-bar__item_on .wy-img-noselect{
  display: none;
}
.weui-tabbar__item.weui-bar__item_on .wy-img-selected{
  display: inline-block;
}
.weui-tabbar__label {
    color:#000;
    font-size: 12px;
    line-height: 1;
}
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    color: rgb(55, 137, 249);
}
.weui-tabbar .weui-tabbar__icon {
  height: 22px;
  width: 22px;
}
.weui-tabbar__item {
  padding: 6px 0;
}

 .wy-mybody-content .mint-cell img {
    vertical-align: middle;
    width: 20px;
    height: 20px;
}

</style>

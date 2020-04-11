<template>
<div class="wy-zx">
  <div :style="{'width':clientWidth,'overflow':'scroll'}">
    <div class="wy-ggmenu" :style="{'width':menuWidth}">
      <div v-for="(item,index) in ggMenu" :class="{'wy-ggmenu-item':true,'wy-ggmenu-item-selected':index===0}" @click="ggmenuClick(item,index)">
        <span>{{item.catName}}</span>
        <i></i>
      </div>
    </div>
  </div>

  <div class="wy-news-items" :style="{'height':newsHeight}">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul>
        <div class="wy-news-item" v-for="item in indexNews" @click="gotoDetail(item)">
          <div class="wy-news-item-body">
            <div class="wy-news-item-title">{{htmlDecodeByRegEx(item.cmsTitle)}}</div>
            <div class="wy-news-item-des">
              <span>{{item.createDate}}</span>
              <!-- <span class="wy-news-item-read">{{item.hits+'人阅读'}}</span> -->
            </div>
          </div>
          <div class="wy-news-item-img">
            <img v-if="item.cmsImgUrl" :src="item.cmsImgUrl" />
            <img v-else src="../../../static/images/zxdefault.jpg" />
          </div>
        </div>
      </ul>
    </mt-loadmore>

    <!-- <div class="wy-news-item" v-for="item in indexNews" @click="gotoDetail(item)">
      <div class="wy-news-item-body">
        <div class="wy-news-item-title">{{htmlDecodeByRegEx(item.cmsTitle)}}</div>
        <div class="wy-news-item-des">
          <span>{{item.createDate}}</span>
          <span class="wy-news-item-read">{{item.hits+'人阅读'}}</span>
        </div>
      </div>
      <div class="wy-news-item-img">
        <img v-if="item.cmsImgUrl" :src="item.cmsImgUrl" />
        <img v-else src="../../../static/images/zxdefault.jpg" />
      </div>
    </div> -->
    <div v-if="indexNews.length==0" style="padding:16px 0;">
      <img style="width:128px;height:103px;" src="../../../static/images/wy/none.png" />
      <div style="color:#ADB7BA;font-size:15px;">暂无内容</div>
    </div>
  </div>
</div>

</template>

<script>

import { Loadmore } from 'mint-ui';
// import utils from '../utils.js';
import * as utils from '../../utils';
import $ from "jquery";
export default {
  name: 'detail',
  components: {
      [Loadmore.name]: Loadmore
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      indexNews:[],
      ggMenu:[],
      allLoaded:false,
      totalCount:'null',
      currPage:1,
      tarTabId:'',
      // firstdoor:true,
      newsHeight:(document.documentElement.clientHeight - 61)+'px',
      clientWidth:document.documentElement.clientWidth +'px',
      menuWidth:'',
    }
  },
  created(){
    document.title = '资讯';
    window.userInfo = JSON.parse(localStorage.getItem('_userInfo'));
    this.getGgType();
    // window._vuezxlist = this;
    // this.options = window.userInfo.communityEntityList;
  },
  methods:{
    loadBottom() {
      var that = this;
      // console.log('this.totalCount',window._vuezxlist.totalCount)
      // console.log('this.indexNews.length',window._vuezxlist.indexNews.length)
      var xlistSelec = sessionStorage.getItem('_zxlistSelect');
      if (xlistSelec) {
        this.tarTabId = xlistSelec.split('$$')[0];
      }else {
        this.tarTabId = '0';
      }
      this.getZxList(this.tarTabId);
      // if (window._vuezxlist.totalCount=='null' || (window._vuezxlist.totalCount && window._vuezxlist.totalCount>window._vuezxlist.indexNews.length)) {
      //   // console.log('this.totalCount',this.totalCount);
      //   this.currPage++
      //   this.getZxList();
      // }else {
      //   console.log('this.allLoaded',this.allLoaded)
      //   this.allLoaded = true;// 若数据已全部获取完毕
      //   that.$refs.loadmore.onBottomLoaded();
      // }
    },
    // setDefaultType(){
    //   var xlistSelec = sessionStorage.getItem('_zxlistSelect');
    //   if (xlistSelec) {
    //     this.ggmenuClick({id:xlistSelec.split('$$')[0]},xlistSelec.split('$$')[1]);
    //   }
    //   // this.door = true;
    // },
    htmlDecodeByRegEx(str){
         var temp = "";
         if(str.length == 0) return "";
         temp = str.replace(/&amp;/g,"&");
         temp = temp.replace(/&lt;/g,"<");
         temp = temp.replace(/&gt;/g,">");
         temp = temp.replace(/&nbsp;/g," ");
         temp = temp.replace(/&#39;/g,"\'");
         temp = temp.replace(/&quot;/g,"\"");
         temp = temp.replace(/&ldquo;/g,"\“");
         temp = temp.replace(/&rdquo;/g,"\”");
         return temp;
    },
    gotoDetail(item){
      if (item.cmsUrlUrl) {
        window.location.href = item.cmsUrlUrl;
      }else {
        this.$router.push({
          name:'detail',
          params:{
            item:item
          }
        })
      }
    },
    getGgType(){
      var that = this;
      utils.Get('getGgType',{propertyId:window.userInfo.propertyId}).then(function(res){
        // console.log('getGgType',res)
        that.ggMenu = res.data.page.list;
        that.ggMenu.unshift({
          id:0,
          catName:'全部'
        });
        that.menuWidth = that.ggMenu.length * 48 + 32 +'px';
        //样式处理
        that.$nextTick(function(){
          var xlistSelec = sessionStorage.getItem('_zxlistSelect');
          if (xlistSelec) {
            $('.wy-ggmenu-item-selected').removeClass('wy-ggmenu-item-selected');
            $('.wy-ggmenu-item').eq(xlistSelec.split('$$')[1]).addClass('wy-ggmenu-item-selected');
          }

          // debugger;
          // that.setDefaultType();
        });
      });
    },
    ggmenuClick(item,index){
      this.tarTabId =item.id;
      $('.wy-ggmenu-item-selected').removeClass('wy-ggmenu-item-selected');
      $('.wy-ggmenu-item').eq(index).addClass('wy-ggmenu-item-selected');
      // if (item.id !='0') {
        this.getZxList(item.id);
      // }
      sessionStorage.setItem('_zxlistSelect',item.id+'$$'+index);
    },
    getZxList(id){
      // debugger
      var that = this;
      var param = {
        page:that.currPage,
        limit:10,
        propertyId:window.userInfo.propertyId,
        ownerId:window.userInfo.ownerId,
      };
      // debugger
      if (id !='0' && id) {
        param.categoryId = id;
        param.page = 1;
        that.currPage = 1;
      }else {
        delete param.categoryId
      }
      // var tmpId = id;
      utils.Get('getGgList',param).then(function(res){
        // console.log('getGgList',res)
        // that.ggNews = res.data.page.list;
        // res.data.page.list.map(function(item){
        //   console.log('that.indexNews',that.indexNews.length)
        //   that.indexNews.push(item);
        // });
        // debugger;
        if (that.currPage == 1) {
          that.indexNews = res.data.page.list;
        }else {
          that.indexNews = that.indexNews.concat(res.data.page.list)
        }


        // that.indexNews = that.indexNews.concat(res.data.page.list);
        that.totalCount = res.data.page.totalCount;
        // that.currPage = that.currPage + 1;
        // debugger
        if ((that.totalCount == that.indexNews.length) || that.currPage == that.totalPage) {
          that.allLoaded = true;// 若数据已全部获取完毕
          that.$refs.loadmore.onBottomLoaded();
        }else {
          that.allLoaded = false;
          that.currPage++
          that.$refs.loadmore.onBottomLoaded();
        }

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
.wy-news-items{
      padding: 0 16px;
    overflow: auto;
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
  padding-top: 7px;
}
.wy-news-item-body {
  width: calc(100% - 101px);
  /*width: calc(100% - 105px);*/
    text-align: left;
}
.wy-news-item-title {
  padding: 4px 0;
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

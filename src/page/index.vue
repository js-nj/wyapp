<template>

<div class="page" v-show="allready == '1'">
    <div class="page__bd" style="height: calc(100%);">
        <div class="weui-tab">
            <div class="weui-tab__panel">
              <div v-if="tabId=='1'">
                <!-- <div class="wy-location">
                  <img class="wy-location-img" src="../../static/images/wy/location.png" />
                  <span class="wy-location-name">龙湖国际（双龙大道）</span>
                </div> -->
                <div class="wy-head">
                  <div class="wy-header">
                    <!-- <img class="wy-head-img" src="../../static/images/wy-1.jpg" /> -->
                    <mt-swipe :show-indicators="false" style="height:144px;">
                      <mt-swipe-item v-for="item in swipes" :key="item.id">
                        <img class="wy-head-img" :src="item.cmsImgUrl" @click="clickSwipe(item)" />
                      </mt-swipe-item>
                    </mt-swipe>
                  </div>
                  <div class="wy-menu">
                    <div class="wy-menu-item" v-for="item in menulist" v-if="item.is_show" @click="gotoMenuPage(item)">
                      <img :src="item.show_img" style="" alt="" class="weui-tabbar__icon" />
                      <div>{{item.show_title}}</div>
                    </div>
                    <!-- <div class="wy-menu-item" @click="gotoPage('openList')">
                      <img src="../../static/images/wy/mj.png" style="width: 24px;" alt="" class="weui-tabbar__icon">
                      <div>门禁</div>
                    </div>
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
                    </div> -->
                  </div>
                </div>
                <div class="wy-news">
                    <div class="wy-news-head">
                      <span class="wy-news-head-name">热门资讯</span>
                      <span class="wy-news-head-more mint-cell-allow-right" @click="clickMoreNews">更多资讯</span>
                    </div>
                    <div class="wy-news-items">
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
                          <img v-else src="../../static/images/wy-2.png" />
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
                  <!-- <div class="wy-ggmenu">
                    <div v-for="(item,index) in ggMenu" :class="{'wy-ggmenu-item':true,'wy-ggmenu-item-selected':index===0}" @click="ggmenuClick(item,index)">
                      <span>{{item.catName}}</span>
                      <i></i>
                    </div>
                  </div> -->
                  <div class="wy-gg-body">
                    <div class="wy-news-items" :style="{'height':newsHeight}">
                      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="wyindexloadmore">
                        <div class="wy-news-item" v-for="item in ggNews" @click="gotoDetail(item)">
                          <div class="wy-news-item-img">
                            <img v-if="item.cmsImgUrl" :src="item.cmsImgUrl" />
                            <img v-else src="../../static/images/ggdefault.jpg" />
                          </div>
                          <div class="wy-news-item-body">
                            <div class="wy-news-item-title">{{htmlDecodeByRegEx(item.cmsTitle)}}</div>
                            <div class="wy-news-item-des">
                              <span>{{item.createDate}}</span>
                              <!-- <span class="wy-news-item-read">{{item.hits+'人阅读'}}</span> -->
                            </div>
                          </div>
                        </div>
                      </mt-loadmore>
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
                  <div>
                    <img v-if="userHeadimgurl" class="wy-myhead-img" :src="userHeadimgurl" />
                    <img v-else class="wy-myhead-img" src="../../static/images/wy/man.jpg" />
                  </div>
                  <div>
                    <p style="text-align:left;font-size:16px;">{{ownerName}}</p>
                    <span style="font-size:14px;">{{ownerMobile}}</span>
                  </div>
                  <div style="visibility:hidden;">
                    <p>30.00</p>
                    <span style="font-size:12px;">积分</span>
                  </div>
                </div>
                <div class="wy-mybody">
                  <div class="wy-mybody-content">
                    <!-- 公告管理 -->
                    <!-- <div class="wy-my-mj" v-if="pushTypeId && pushTypeId.indexOf('1')>-1" @click="gotoPage('maIndex')">
                      <mt-cell title="公告管理" is-link>
                        <img slot="icon" src="../../static/images/wy/gl.png" />
                      </mt-cell>
                    </div> -->
                    <div class="wy-my-mj" v-if="pushTypeId && (pushTypeId.indexOf('5')>-1)" @click="gotoPage('checkLive')">
                      <mt-cell title="住户审核"  is-link>
                        <img slot="icon" src="../../static/images/wy/gl.png" />
                      </mt-cell>
                    </div>
                    <!-- 我的派单 -->
                    <div class="wy-my-mj" v-if="pushTypeId && pushTypeId.indexOf('1')>-1" @click="gotoPage('disIndex')">
                      <mt-cell title="我的派单" is-link>
                        <img slot="icon" src="../../static/images/wy/mydistribute.png" />
                      </mt-cell>
                    </div>
                    <!-- 我的回复 -->
                    <div class="wy-my-mj" v-if="pushTypeId && pushTypeId.indexOf('2')>-1" @click="gotoPage('repIndex')">
                      <mt-cell title="我的回复" is-link>
                        <img slot="icon" src="../../static/images/wy/myreply.png" />
                      </mt-cell>
                    </div>
                    <!-- 我的接单 -->
                    <div class="wy-my-mj" v-if="pushTypeId && pushTypeId.indexOf('3')>-1" @click="gotoPage('fixerIndex')">
                      <mt-cell title="我的接单" is-link>
                        <img slot="icon" src="../../static/images/wy/mybills.png" />
                      </mt-cell>
                    </div>
                    <mt-cell title="我的房产" to="/otherHouse" is-link>
                      <img slot="icon" src="../../static/images/wy/myfw.png" />
                    </mt-cell>
                    <mt-cell title="开锁记录" to="/openRecords" is-link>
                      <img slot="icon" src="../../static/images/wy/gl.png" />
                    </mt-cell>
                    <div class="wy-my-mj" @click="gotoPage('recIndex')">
                      <mt-cell title="我的缴费" is-link>
                        <img  slot="icon" src="../../static/images/wy/jf.png" />
                      </mt-cell>
                    </div>
                    <div class="wy-my-mj" @click="gotoPage('fixList')">
                      <mt-cell title="我的报修" is-link>
                        <img slot="icon" src="../../static/images/wy/bx.png" />
                      </mt-cell>
                    </div>
                    <div class="wy-my-mj" @click="gotoPage('sugList')">
                      <mt-cell title="我的投诉" is-link>
                        <img slot="icon" src="../../static/images/wy/ts.png" />
                      </mt-cell>
                    </div>

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
import { Search,Cell,Swipe, SwipeItem,Toast,Indicator,Loadmore } from 'mint-ui';
import * as utils from '../utils';
export default {
  name: 'index',
  components: {
      [Search.name]: Search,
      [Cell.name]: Cell,
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Toast.name]: Toast,
      [Indicator.name]: Indicator,
      [Loadmore.name]: Loadmore
  },
  data () {
    return {
      allready:'0',
      tabId:'1',
      indexNews:[],
      ggNews:[],
      ggMenu:[],
      searchValue:'',
      swipes:[],
      ownerName:'',
      userHeadimgurl:'',
      ownerMobile:'',
      pushTypeId:'',
      menulist:[],
      allLoaded:false,
      totalCount:0,
      currPage:1,
      newsHeight:(document.documentElement.clientHeight - 61)+'px',
      clientWidth:document.documentElement.clientWidth +'px',
      wySelfUrlrecIndex:'',
      wySelfUrlsugIndex:'',
      wySelfUrlfixIndex:'',
    }
  },
  beforeCreate(){

  },
  created(){
    // alert('测试清除缓存~');
    var that = this;
    this.getUserInfo();
    this.$nextTick(function(){
        $('.weui-tabbar__item').on('click', function (ele) {
            // debugger;
            that.tabId = $(this).attr('tabid');
            $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
        });
        if (sessionStorage.getItem('tabId') && sessionStorage.getItem('tabId') == '3') {
          $('.weui-tabbar__item').eq(2).trigger('click');
        }
        if (sessionStorage.getItem('tabId') && sessionStorage.getItem('tabId') == '2') {
          $('.weui-tabbar__item').eq(1).trigger('click');
        }
    });

  },
  watch:{
    tabId(id){
      if (id==='2') {
        // this.getGgType();
        // this.getGgList();
      }
      sessionStorage.setItem('tabId',id);
    },
    searchValue(value){
      // debugger;
      if (!value) {
        this.currPage = 1;
      }
      this.getGgList(value);

    }
  },
  methods:{
    gotoMenuPage(param){
      if(param.custom_menu_url){
        window.location.href = param.custom_menu_url;
      }else {
        switch(param.menu_type){
          case '1':
            this.gotoPage('openList');
            break;
          case '2':
            this.gotoPage('recIndex');
            break;
          case '3':
            this.gotoPage('fixIndex');
            break;
          case '4':
            this.gotoPage('sugIndex');
            break;
        }
      }
    },
    getOpenDoor(){
      var param = {
        propertyId:window.userInfo.propertyId
      };
      // debugger
      utils.Get('getOpenDoor',param).then(function(res){
          // console.log('getOpenDoor',res)
          if (res.data.code === 0 && res.data.wyDoor && res.data.wyDoor.doorOpenUrl) {
            if (res.data.wyDoor.doorOpenUrl.indexOf('http')>-1) {
              window.location.href = res.data.wyDoor.doorOpenUrl;
            }else {
              window.location.href = 'http://'+res.data.wyDoor.doorOpenUrl;
            }
            // window.userInfo = res.result;
          }
          // that.ggMenu = res.data.page.list;
        });
      // window.location.href = "http://www.baidu.com";
    },
    getWySetting(){
      var param = {
        propertyId:window.userInfo.propertyId
      };
      var that = this;
      // debugger
      utils.Get('getwysetting',param).then(function(res){
          // console.log('getOpenDoor',res)
          if (res.data.code === 0 && res.data.page && res.data.page.list) {
            res.data.page.list.forEach(function(item){
              if (item.setType == '1') {
                that.wySelfUrlrecIndex = item.setUrl;
              } else if(item.setType == '2'){
                that.wySelfUrlfixIndex = item.setUrl;
              }else if(item.setType == '3'){
                that.wySelfUrlsugIndex = item.setUrl;
              }else {
                // wySelfUrlrecIndex:'',
                // wySelfUrlsugIndex:'',
                // wySelfUrlfixIndex:'',
                Toast('无法分辨的setType类型')
              }
            });
          }
        });
    },
    getUserInfo(){
      var that = this;
      // if (window.location.href.indexOf('resident_code=')>-1) {
      //   var param = {
      //     residentCode:window.location.href.split('resident_code=')[1].split('&open_id=')[0]
      //   };
      // }else {
      //   var param = {
      //     residentCode:''
      //   };
      // }
      if (window.location.href.indexOf('&code=')>-1) {
        var tmpCode = window.location.href.split('&code=');
        var code = tmpCode[1].split('&state=')[0];
        var tmpParam = tmpCode[0].split('community_id=')[1];
        var community_id = tmpParam.split('&property_id=')[0];
        var property_id = tmpParam.split('&property_id=')[1].split('&AppID=')[0];
      } else {
        var code = null;
        var community_id = null;
        var property_id = null;
      }
      var loginFlag = sessionStorage.getItem('logined');
      if (!loginFlag) {
        Indicator.open()
        let param = {
          request_content: JSON.stringify({
            code: code,
            community_id: community_id,
            property_id: property_id
          })
        };
        var result = {};
        utils.Post('GetWxUser', param).then(res => {
          let tmpResult = JSON.parse(res.data.d);
          console.log('tmpResult',tmpResult)
          if (tmpResult.code == 0 && tmpResult.list) {
            window.userInfo = tmpResult.list[0];
            window.userInfo.propertyId = window.userInfo.property_id;
            window.userInfo.ownerId = window.userInfo.id;
            window.userInfo.propertyName = window.userInfo.property_name;
            window.open_id = window.userInfo.open_id;
            // window.open_id = window.location.href.split('resident_code=')[1].split('&open_id=')[1];
            sessionStorage.setItem('_userInfo', JSON.stringify(window.userInfo));
            window._ids = {
              'community_id': community_id,
              'property_id': property_id
            };
            localStorage.setItem('_userInfo',JSON.stringify(tmpResult.list[0]));
            sessionStorage.setItem('_ids', JSON.stringify(window._ids));
            if(window.userInfo.check_status == '0' || window.userInfo.check_status == '1'){
              // console.log('otherMyinfo~~~~~~~~~')
              this.$router.push({
                name:'otherMyinfo',
                params:{}
              })
              return;
            }
            console.log('window.location.href',window.location.href)
            if(window.location.href.indexOf('wxscan')>-1){
              this.$router.push({
                name:'openResult',
                params:{}
              })
              Indicator.close()
              return;
            }
            // console.log('nononononononono')
            // localStorage.setItem('open_id',window.open_id);
          }else {
            window.userInfo = JSON.parse(localStorage.getItem('_userInfo'));
            window.userInfo.propertyId = window.userInfo.property_id;
            window.userInfo.ownerId = window.userInfo.id;
            window.userInfo.propertyName = window.userInfo.property_name;
            window.open_id =localStorage.getItem('open_id');
          }
          sessionStorage.setItem('logined','1');
          document.title = window.userInfo.propertyName?window.userInfo.propertyName:'智慧物业';
          that.allready = '1';
          that.ownerName=window.userInfo.user_name;
          that.userHeadimgurl=window.userInfo.wx_avatar;
          that.ownerMobile=window.userInfo.user_phone;
          that.pushTypeId = window.userInfo.pushTypeId;
          that.getMenuList();
          that.getZxList();
          that.getSwipeImgs();
          that.getWySetting();

          Indicator.close()
        });
      }else {
        window.userInfo = JSON.parse(localStorage.getItem('_userInfo'));
        window.open_id =localStorage.getItem('open_id');
        if(window.userInfo){
          that.allready = '1';
          that.ownerName=window.userInfo.user_name;
          that.userHeadimgurl=window.userInfo.wx_avatar;
          that.ownerMobile=window.userInfo.user_phone;
          that.pushTypeId = window.userInfo.pushTypeId;
          that.getMenuList();
          that.getZxList();
          that.getSwipeImgs();
          that.getWySetting();

          document.title = window.userInfo.propertyName?window.userInfo.propertyName:'智慧物业';
        }

        // Indicator.close()
      }

    },
    gotoPage(route){
      if (this['wySelfUrl'+route]) {
        window.location.href = this['wySelfUrl'+route];
      }else {
        this.$router.push({
          name:route,
        });
      }
    },
    getMenuList(){
      var that = this;
      let param = {
        request_content: JSON.stringify({
          user_id: window.userInfo.id,
          community_id: window.userInfo.community_id,
          property_id: window.userInfo.property_id
        })
      };
      utils.Post('MenuList',param).then(function(res){
        let tmpResult = JSON.parse(res.data.d);
        if(tmpResult.code == 0){
          that.menulist = tmpResult.list;
        }else {
          window.$toast(tmpResult.msg)
        }
        // that.indexNews = res.data.page.list;
      });
    },
    gotoDetail(item){
      if (item.cmsUrlUrl) {
        window.location.href = item.cmsUrlUrl;
      }else {
        window.location.href = window.location.origin+window.location.pathname + '#/detail?id='+item.id;
      }
    },
    // ggmenuClick(item,index){
    //   $('.wy-ggmenu-item-selected').removeClass('wy-ggmenu-item-selected');
    //   $('.wy-ggmenu-item').eq(index).addClass('wy-ggmenu-item-selected');
    //   this.getGgList(item.id);
    // },
    // getGgType(){
    //   var that = this;
    //   utils.Get('getGgType',{}).then(function(res){
    //     console.log('getGgType',res)
    //     that.ggMenu = res.data.page.list;
    //   });
    // },
    getSwipeImgs(){
      var that = this;
      var param = {
        page:1,
        limit:10,
        isCarousel:'1',
        categoryId:'1',
        propertyId:window.userInfo.propertyId,
        ownerId:window.userInfo.ownerId,
      };
      utils.Get('getGgList',param).then(function(res){
        if(res.data.code == 0){
          if (res.data.page.list.length>5) {
            that.swipes = res.data.page.list.splice(0, 4);
          } else {
            that.swipes = res.data.page.list;
          }
        }else {
          window.$toast(res.data.msg)
        }
        // that.indexNews = res.data.page.list;
      });
    },
    getGgList(value){
      var that = this;
      var param = {
        page:that.currPage,
        limit:10,
        categoryId:'1',
        propertyId:window.userInfo.propertyId,
        ownerId:window.userInfo.ownerId,
      };
      // if (id) {
      //   param.typeId=id;
      // }
      if (value) {
        param.cmsTitle=value;
        param.page = 1;
        that.currPage = 1;
      }
      utils.Get('getGgList',param).then(function(res){
        if(res.data.code == 0){
          if (param.cmsTitle) {
            that.ggNews = res.data.page.list;
          }else {
            if (that.currPage == 1) {
              that.ggNews = res.data.page.list;
            }else {
              that.ggNews = that.ggNews.concat(res.data.page.list);
            }
          }
          // that.indexNews = that.indexNews.concat(res.data.page.list);
          that.totalCount = res.data.page.totalCount;
          // that.currPage = that.currPage + 1;
          if ((that.totalCount == that.ggNews.length) || that.currPage == that.totalPage) {
            that.allLoaded = true;// 若数据已全部获取完毕
            that.$refs.wyindexloadmore.onBottomLoaded();
          }else {
            that.allLoaded = false;
            that.currPage++
            that.$refs.wyindexloadmore.onBottomLoaded();
          }
          that.$nextTick(function(){
            $('.wy-news-items').scrollTop(0);
          });
        }else {
          window.$toast(res.data.msg)
        }
      });
    },
    getZxList(value){
      var that = this;
      var param = {
        page:1,
        limit:10,
        propertyId:window.userInfo.propertyId,
        ownerId:window.userInfo.ownerId,
      };
      utils.Get('getGgList',param).then(function(res){
        // console.log('getGgList',res)
        // that.ggNews = res.data.page.list;
        if(res.data.code == 0){
          that.indexNews = res.data.page.list;
        }else {
          window.$toast(res.data.msg);
        }
      });
    },
    clickMoreNews(){
      // $('.weui-tabbar__item').eq(1).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
      // this.tabId = '2';
      this.$router.push({
        name:'otherZxlist'
      })
    },
    clickSwipe(param){
      if (param && param.cmsUrlUrl) {
        window.location.href = param.cmsUrlUrl;
      }else {
        this.$router.push({
          name:'detail',
          params:{
            item:param
          }
        })
      }
    },
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
    loadBottom() {
      // var that = this;
      this.getGgList(this.tarTabId);
    },
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
  width: 23.7%;
  vertical-align: top;
}
.wy-head-img {
  width: 100%;
  height:100%;
}
.wy-head {
  border-radius: 16px 16px 0 0;
      background: #fff;
  padding: 16px;
  position: relative;
    /*top: -16px;*/
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
    padding-right: 8px;
}



.wy-gg-search.mint-search {
  height: auto !important;
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
    color: #333;
    font-size: 16px;
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
    color: rgb(55, 137, 249) !important;
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
    width: 24px;
    height: 28px;
}
.wy-my-mj .mint-cell-wrapper{
      background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%) !important;
      padding: 0;
    margin: 0px 0px 0 10px;
}
.wy-my-mj .mint-cell {
  background-image: none !important;
}
.wy-gg-search .mint-search-list {
padding-top: 0;
position: unset;
}
.wy-mybody-content .mint-cell-allow-right::after {
    border: solid 1px #c8c8cd;
        border-bottom-width: 0;
    border-left-width: 0;
    width: 8px;
    height: 8px;
}
.wy-news-head-more.mint-cell-allow-right::after {
    right: 0px;
    width: 6px;
    height: 6px;
}
.wy-gg-body .wy-news-item-img {
  padding-top: 4px;
}
.wy-gg-search .mint-searchbar-inner {
     -webkit-box-flex: none;
    -ms-flex: none;
     flex: none;
    width: calc(100% - 50px);
}
</style>

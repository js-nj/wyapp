<template>
  <div class="wy-gg-body">
    <div class="wy-news-items" :style="{'height':newsHeight}">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="wyindexloadmore">
        <div class="wy-news-item" v-for="item in ggNews" @click="gotoDetail(item)">
          <div class="wy-news-item-img">
            <img v-if="item.cmsImgUrl" :src="item.cmsImgUrl" />
            <img v-else src="../../../static/images/ggdefault.jpg" />
          </div>
          <div class="wy-news-item-body">
            <div class="wy-news-item-title">{{htmlDecodeByRegEx(item.cmsTitle)}}</div>
            <div class="wy-news-item-des">
              <span>{{item.createDate}}</span>
              <!-- <span class="wy-news-item-read">{{item.hits+'人阅读'}}</span> -->
            </div>
          </div>
          <div class="wy-ma-buttons">
            <!-- <img @click.stop="noticeAnnounce(item.id,item.propertyId)" style="width:24px;height:24px;" src="../../../static/images/wy/ma-notice.png" v-if="item.isPush == '0'"/>
            <img @click.stop="editAnnounce(item.id)" style="width:24px;height:24px;" src="../../../static/images/wy/ma-edit1.png" v-if="item.isPush == '0'"/>
            <img @click.stop="deleteAnnounce(item.id)" style="width:24px;height:24px;" src="../../../static/images/wy/ma-delete.png"  /> -->
            <mt-button @click.stop="noticeAnnounce(item.id,item.propertyId)" v-if="item.isPush == '0'" size="small" type="primary">通知</mt-button>
            <mt-button @click.stop="editAnnounce(item.id)" v-if="item.isPush == '0'" size="small" type="primary">修改</mt-button>
            <mt-button @click.stop="deleteAnnounce(item.id)" size="small" type="danger">删除</mt-button>
          </div>
        </div>
      </mt-loadmore>
      <!-- <div v-if="ggNews.length==0">暂无数据~</div> -->
      <div v-if="ggNews.length==0" style="padding:16px 0;">
        <img style="width:128px;height:103px;" src="../../../static/images/wy/none.png" />
        <div style="color:#ADB7BA;font-size:15px;">暂无内容</div>
      </div>
      <img class="wy-ma-addicon" @click.stop="gotoPost" style="" src="../../../static/images/wy/adda.png" />
    </div>
  </div>
</template>
<script>
  import { Search,Cell,Toast,Indicator,Loadmore,Button,MessageBox  } from 'mint-ui';
  import * as utils from '../../utils';
export default {
  name: 'index',
  components: {
      [Search.name]: Search,
      [Cell.name]: Cell,
      [Toast.name]: Toast,
      [Indicator.name]: Indicator,
      [Loadmore.name]: Loadmore,
      [Button.name]: Button,
      [MessageBox.name]: MessageBox,
  },
  data () {
    return {
      ggNews:[],
      allLoaded:false,
      totalCount:0,
      currPage:1,
      newsHeight:(document.documentElement.clientHeight - 6)+'px',
    }
  },
  beforeCreate(){

  },
  created(){
    document.title = '公告管理';
    window.userInfo = JSON.parse(localStorage.getItem('_userInfo'));
    // this.getGgList();
  },
  watch:{
    // searchValue(value){
    //   // debugger;
    //   if (!value) {
    //     this.currPage = 1;
    //   }
    //   this.getGgList(value);
    // }
  },
  methods:{
    gotoPost(){
      this.$router.push({
          name:'maPost',
        });
    },
    editAnnounce(id){
      window.location.href = window.location.origin+window.location.pathname + '#/maPost?id='+id;
    },
    noticeAnnounce(id,propertyId){
      var tmpid = id;
      var that = this;
      var tmppropertyId = propertyId;
      MessageBox.confirm('确定通知全体业主?').then(action => {
        // console.log('action',action)
        if (action == 'confirm') {
          utils.Get('sendCmsNotify',{id:tmpid,propertyId:tmppropertyId}).then(function(res){
            if (res.data.code == 0) {
              Toast('通知成功！');
              that.currPage = 1;
              that.getGgList();
            } else {
              Toast('通知失败,'+res.data.msg+'！');
            }
          })
        }
      }).catch(err => {
        console.log('err',err)
      });
    },
    deleteAnnounce(id){
      var tmpid = id;
      var that = this;
      MessageBox.confirm('确定删除本公告?').then(action => {
        // console.log('action',action)
        if (action == 'confirm') {
          utils.Get('deleteGgitem',{id:tmpid}).then(function(res){
            if (res.data.code == 0) {
              Toast('删除成功！');
              that.currPage = 1;
              that.getGgList();
            } else {
              Toast('删除失败,'+res.data.msg+'！');
            }
          })
        }
      }).catch(err => {
        console.log('err',err)
      });
    },
    gotoDetail(item){
      if (item.cmsUrlUrl) {
        window.location.href = item.cmsUrlUrl;
      }else {
        window.location.href = window.location.origin+window.location.pathname + '#/detail?id='+item.id;
      }
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
        if (that.totalCount == that.ggNews.length) {
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
      });
    },

    htmlDecodeByRegEx(str){
         var temp = "";
         if(!str || str.length == 0) return "";
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
<style scoped>
.wy-news-item {
  position: relative;
      border-top: solid 1px #ddd;
}
</style>
<style>
  .wy-ma-buttons {
  position: absolute;
  right: 0px;
   bottom: 2px;
}
  .wy-ma-buttons button{
    /*display: block;*/
  }
  .wy-news-item-img img {
    width: 95px;
    height: 65px;
}
.wy-ma-addicon {
  width: 72px;
    height: 72px;
    position: fixed;
    bottom: 0%;
    right: 42%;
}
</style>

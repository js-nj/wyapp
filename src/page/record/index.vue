<template>
<div class="wy-rec">
  <mt-navbar v-model="selected">
    <mt-tab-item id="1">代缴账单</mt-tab-item>
    <mt-tab-item id="2">已缴账单</mt-tab-item>
  </mt-navbar>

  <!-- tab-container -->
  <mt-tab-container v-model="selected">
    <mt-tab-container-item id="1">
      <div class="wy-rec-item" v-for="item in options">
        <mt-checklist
          v-model="item.value"
          :options="item.options">
        </mt-checklist>
        <div class="wy-rec-item-des">
          <div class="wy-rec-item-time">
            <span>时间</span>
            <div style="padding-top:2px;">2019年 9月-10月</div>
          </div>
          <div class="wy-rec-item-money">
            <span>总金额</span>
            <div style="padding-top:2px;">2334</div>
          </div>
          <div class="wy-rec-icon" @click="gotoRecDetail(item)">></div>
        </div>
      </div>

    </mt-tab-container-item>
    <mt-tab-container-item id="2">
      <div class="wy-rec-item wy-rec-mt-8" v-for="item in options">
        <div class="wy-rec-item-title">物业费</div>
        <div class="wy-rec-item-des">
          <div class="wy-rec-item-time">
            <span>时间</span>
            <div style="padding-top:2px;">2019年 9月-10月</div>
          </div>
          <div class="wy-rec-item-money">
            <span>总金额</span>
            <div style="padding-top:2px;">2334</div>
          </div>
          <div class="wy-rec-icon">></div>
        </div>
      </div>
    </mt-tab-container-item>
  </mt-tab-container>
</div>

</template>

<script>
import { Navbar, TabItem,TabContainer,TabContainerItem,Cell,Checklist  } from 'mint-ui';
import * as utils from '../../utils';
export default {
  name: 'detail',
  components: {
      [Navbar.name]: Navbar,
      [TabItem.name]: TabItem,
      [TabContainer.name]: TabContainer,
      [TabContainerItem.name]: TabContainerItem,
      [Cell.name]: Cell,
      [Checklist.name]: Checklist,
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected:'1',
      chooseValue:[],
      options: [
        {
          time: '物业费2222',
          money: '1111',
          value:[],
          options:[{
            label: '物业费',
            value: '1',
          }]
          // disabled: true
        },
        {
          time: '物业费2222',
          money: '1111',
          value:[],
          options:[{
            label: '物业费',
            value: '1',
          }]
          // disabled: true
        },
      ]
    }
  },
  created(){
    // console.log(utils)
    // debugger;

  },
  methods:{
    gotoRecDetail(item){
      this.$router.push({
        name:'recDetail',
        params:{
          item:item
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.wy-rec-item-des{
      text-align: left;
   padding: 8px 32px 8px 0px;
   margin-left: 32px;
   border-top: solid 1px #EEEEEE;
}
.wy-rec-item {
  background-color: #fff;
  font-size: 12px;
}
.wy-rec-item .mint-checklist .mint-checklist-label {
  text-align: left;
}
.wy-rec-item .mint-checklist .mint-cell,.wy-rec-item .mint-checklist .mint-cell .mint-cell-wrapper{
background-image:none;
}
.wy-rec-item-des >div {
  display: inline-block;
  vertical-align: top;
}
.wy-rec-icon{
  float: right;
  position: relative;
    top: 8px;
}
.wy-rec-item-money {
  width: 50px;
}
.wy-rec-item-time {
  width: calc(100% - 100px);
}
.wy-rec-item-money span,.wy-rec-item-time span {
  color: #999;
}
.wy-rec-item-money div,.wy-rec-item-time div{
  color:#333333;
  font-weight: 500;
}
.wy-rec-item-title {
  height: 48px;
    line-height: 48px;
    text-align: left;
    font-size: 16px;
    padding: 0 32px;
}
.wy-rec-mt-8 {
  margin-top: 8px;
}
</style>

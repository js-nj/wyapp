import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
import detail from '@/page/detail'
import recIndex from '@/page/record/index'
import recDetail from '@/page/record/detail'
import recResult from '@/page/record/result'
import fixIndex from '@/page/fix/index'
import fixList from '@/page/fix/list'
import fixDetail from '@/page/fix/detail'
import fixRate from '@/page/fix/rate';
import fixerLogin from '@/page/fixer/login'
import fixerIndex from '@/page/fixer/index'
import fixerDetail from '@/page/fixer/detail'
import fixerDoneDetail from '@/page/fixer/donedetail'
import sugIndex from '@/page/suggest/index'
import sugList from '@/page/suggest/list'
import otherHouse from '@/page/other/house'
import otherZxlist from '@/page/other/zxlist'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: index
  }, {
    path: '/detail',
    name: 'detail',
    component: detail
  }, {
    path: '/recIndex',
    name: 'recIndex',
    component: recIndex
  }, {
    path: '/recDetail',
    name: 'recDetail',
    component: recDetail
  }, {
    path: '/recResult',
    name: 'recResult',
    component: recResult
  }, {
    path: '/fixIndex',
    name: 'fixIndex',
    component: fixIndex
  }, {
    path: '/fixList',
    name: 'fixList',
    component: fixList
  }, {
    path: '/fixDetail',
    name: 'fixDetail',
    component: fixDetail
  }, {
    path: '/fixRate',
    name: 'fixRate',
    component: fixRate
  }, {
    path: '/fixerLogin',
    name: 'fixerLogin',
    component: fixerLogin
  }, {
    path: '/fixerIndex',
    name: 'fixerIndex',
    component: fixerIndex
  }, {
    path: '/fixerDetail',
    name: 'fixerDetail',
    component: fixerDetail
  }, {
    path: '/fixerDoneDetail',
    name: 'fixerDoneDetail',
    component: fixerDoneDetail
  }, {
    path: '/sugIndex',
    name: 'sugIndex',
    component: sugIndex
  }, {
    path: '/sugList',
    name: 'sugList',
    component: sugList
  }, {
    path: '/otherHouse',
    name: 'otherHouse',
    component: otherHouse
  }, {
    path: '/otherZxlist',
    name: 'otherZxlist',
    component: otherZxlist
  }]
})

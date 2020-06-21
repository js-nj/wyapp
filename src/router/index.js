import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
import detail from '@/page/detail'
import recIndex from '@/page/record/index'
import recDetail from '@/page/record/detail'
import recSucList from '@/page/record/suclist'
import recResult from '@/page/record/result'
import fixIndex from '@/page/fix/index'
import fixList from '@/page/fix/list'
import fixDetail from '@/page/fix/detail'
import fixRate from '@/page/fix/rate';
// import fixerLogin from '@/page/fixer/login'
import fixerIndex from '@/page/fixer/index'
import fixerDetail from '@/page/fixer/detail'
import fixerDoneDetail from '@/page/fixer/donedetail'
import sugIndex from '@/page/suggest/index'
import sugList from '@/page/suggest/list'
import sugCancel from '@/page/suggest/cancel'
import otherHouse from '@/page/other/house'
import otherZxlist from '@/page/other/zxlist'
import repIndex from '@/page/reply/index'
import repDetail from '@/page/reply/detail'
import disIndex from '@/page/distribute/index'
import disDetail from '@/page/distribute/detail'

import maIndex from '@/page/magAnnounce/index'
import maDetail from '@/page/magAnnounce/detail'
import maPost from '@/page/magAnnounce/post'
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
      path: '/recSucList',
      name: 'recSucList',
      component: recSucList
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
    },
    //  {
    //   path: '/fixerLogin',
    //   name: 'fixerLogin',
    //   component: fixerLogin
    // },
    {
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
      path: '/sugCancel',
      name: 'sugCancel',
      component: sugCancel
    }, {
      path: '/otherHouse',
      name: 'otherHouse',
      component: otherHouse
    }, {
      path: '/otherZxlist',
      name: 'otherZxlist',
      component: otherZxlist
    }, {
      path: '/repIndex',
      name: 'repIndex',
      component: repIndex
    }, {
      path: '/repDetail',
      name: 'repDetail',
      component: repDetail
    }, {
      path: '/disIndex',
      name: 'disIndex',
      component: disIndex
    }, {
      path: '/disDetail',
      name: 'disDetail',
      component: disDetail
    }, {
      path: '/maIndex',
      name: 'maIndex',
      component: maIndex
    }, {
      path: '/maDetail',
      name: 'maDetail',
      component: maDetail
    }, {
      path: '/maPost',
      name: 'maPost',
      component: maPost
    }
  ]
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import Mint from 'bh-mint-ui2';
import {
  Toast
} from 'mint-ui';
import 'mint-ui/lib/style.css'
// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// Vue.use(vConsole)

Vue.config.productionTip = false;
console.log('process.env:', process.env)
// console.log('WEBPACK_CONFIG_HOST:', WEBPACK_CONFIG_HOST)

if (process.env.WEBPACK_CONFIG_HOST) {
  window.WEBPACK_CONFIG_HOST = process.env.WEBPACK_CONFIG_HOST
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
